import React from 'react';
import Animate from 'rc-animate';
import Icon from '../icon';
import Progress from '../progress';
import Tooltip from '../tooltip';
import classNames from 'classnames';


const imageTypes = ['image', 'webp', 'png', 'svg', 'gif', 'jpg', 'jpeg', 'bmp'];

const previewFile = (file, callback) => {
  if (file.type && !imageTypes.includes(file.type)) {
    callback();
  }
  const reader = new FileReader();
  reader.onloadend = () => callback(reader.result);
  reader.readAsDataURL(file);
};

const extname = (url) => {
  if (!url) {
    return '';
  }
  const temp = url.split('/');
  const filename = temp[temp.length - 1];
  const filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};

const isImageUrl = (file) => {
  if (imageTypes.includes(file.type)) {
    return true;
  }
  const url = file.thumbUrl || file.url;
  const extension = extname(url);
  if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|bmp)$/i.test(extension)) {
    return true;
  } else if (/^data:/.test(url)) {
    return false;
  } else if (extension) {
    return false;
  }
  return true;
}

export default class UploadList extends React.Component {
  static defaultProps = {
    listType: 'text', // or picture
    items: [],
    progressAttr: {
      strokeWidth: 3,
      showInfo: true,
    },
    showRemoveIcon: true,
    showPreviewIcon: true
  };

  handleClose = (file) => {
    const { onRemove } = this.props;
    if (onRemove) {
      onRemove(file);
    }
  }

  handlePreview = (file, e) => {
    const { onPreview } = this.props;
    if (onPreview) {
      e.preventDefault();
      return onPreview(file);
    }
  }

  componentDidUpdate() {
    if (this.props.listType !== 'picture' && this.props.listType !== 'picture-card') {
      return;
    }
    this.props.items.forEach(file => {
      if (typeof document === 'undefined' ||
          typeof window === 'undefined' ||
          !window.FileReader || !window.File ||
          !(file.originFileObj instanceof File) ||
          file.thumbUrl !== undefined) {
        return;
      }
      /* eslint-disable */
      file.thumbUrl = '';
      /* eslint-enable */
      previewFile(file.originFileObj, (previewDataUrl) => {
        /*eslint-disable */
        file.thumbUrl = previewDataUrl;
        /* eslint-enable */
        this.forceUpdate();
      });
    });
  }

  render() {
    const {prefixCls, listType, showPreviewIcon, showRemoveIcon, locale} = this.props;
    let list = this.props.items.map(file => {
      let progress;
      let icon = <Icon type={file.status === 'uploading' ? 'loading' : 'paper-clip'} />;

      if (listType === 'picture' || listType === 'picture-card') {
        if (listType === 'picture-card' && file.status === 'uploading') {
          icon = <div className={`${prefixCls}-list-item-uploading-text`} >{locale.uploading}</div>
        } else if (!file.thumbUrl && !file.url) {
          icon = <Icon className={`${prefixCls}-list-item-thumbnail`} type='picture' theme='twoTone' />
        } else {
          const thumbnail = isImageUrl(file)
            ? <img src={file.thumbUrl || file.url} alt={file.name} />
            : <Icon type='file' className={`${prefixCls}-list-item-icon`} theme='twoTone' />;
          icon = (
            <a
              className={`${prefixCls}-list-item-thumbnail`}
              onClick={e => this.handlePreview(file, e)}
              href={file.url || file.thumbUrl}
              target='_blank'
            >
              {thumbnail}
            </a>
          );
        }
      }

      if (file.status === 'uploading') {
        const loadingProgress = ('percent' in file) ? (
          <Progress type='line' {...this.props.progressAttr} percent={file.percent} />
        ) : null;
        progress = (
          <div className={`${prefixCls}-list-item-progress`} key='progress'>
            {loadingProgress}
          </div>
        );
      }

      const infoUploadingClass = classNames({
        [`${prefixCls}-list-item`]: true,
        [`${prefixCls}-list-item-${file.status}`]: true,
      });

      const linkProps = typeof file.linkProps === 'string'
        ? JSON.parse(file.linkProps) : file.linkProps;

      const preview = file.url ? (
        <a
          target='_black'
          className={`${prefixCls}-list-item-name`}
          title={file.name}
          href={file.url}
          onClick={e => this.handlePreview(file, e)}
          {...linkProps}
        >
          {file.name}
        </a>
      ) : (
        <span
          className={`${prefixCls}-list-item-name`}
          onClick={e => this.handlePreview(file, e)}
          title={file.name}
        >
          {file.name}
        </span>
      )
      const style = {
        pointerEvents: 'none',
        opacity: 0.5,
      }
      const previewIcon = showPreviewIcon ? (
        <a
          href={file.url || file.thumbUrl}
          target='_black'
          style={(file.url || file.thumbUrl) ? undefined : style}
          onClick={e => this.handlePreview(file, e)}
          title={locale.previewFile}
        >
          <Icon type='eye-o' />
        </a>
      ) : null;

      const removeIcon = showRemoveIcon ? (
        <Icon type='delete' title={locale.removeFile} onClick={() => this.handleClose(file)} />
      ) : null;

      const removeIconClose = showRemoveIcon ? (
        <Icon type='close' title={locale.removeFile} onClick={() => this.handleClose(file)} />
      ) : null;
      const actions = (listType === 'picture-card' && file.status !== 'uploading')
        ? <span className={`${prefixCls}-list-item-actions`}>{previewIcon}{removeIcon}</span>
        : removeIconClose;

      let message;
      if (file.response && typeof file.response === 'string') {
        message = file.response;
      } else {
        message = (file.error && file.error.statusText) || locale.uploadError;
      }
      const iconAndPreview = (file.status === 'error')
        ? <Tooltip title={message}>{icon}{preview}</Tooltip>
        : <span>{icon}{preview}</span>;

      return (
        <div className={infoUploadingClass} key={file.uid}>
          <div className={`${prefixCls}-list-item-info`}>
            {iconAndPreview}
          </div>
          {actions}
          <Animate transitionName='fade' component=''>{progress}</Animate>
        </div>
      );
    });
    const listClassNames = classNames({
      [`${prefixCls}-list`]: true,
      [`${prefixCls}-list-${listType}`]: true,
    });
    return (
      <Animate
        transitionName={`${prefixCls}-margin-top`}
        component='div'
        className={listClassNames}
        >
        {list}
      </Animate>
    );
  }
}
