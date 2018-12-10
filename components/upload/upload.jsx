import React from 'react';
import RcUpload from 'rc-upload';
import UploadList from './uploadList';
import uniqBy from 'lodash/uniqBy';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/zh_CN';
import { T, fileToObject, genPercentAdd, getFileItem } from './utils';
import { runInThisContext } from 'vm';

function UploadDragger(props) {
  return <Upload {...props} type='drag' style={{ height: props.height }} />;
}

 class Upload extends React.Component {
  static Dragger = UploadDragger;

  static defaultProps = {
    prefixCls: 'idoll-upload',
    type: 'select',
    multiple: false,
    action: '',
    data: {},
    accept: '',
    beforeUpload: T,
    showUploadList: true,
    listType: 'text',
    className: '',
    disabled: false,
  }

  static propTypes = {
    accept: PropTypes.string,
    action: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    directory: PropTypes.bool,
    onChange: PropTypes.func,
    onPreview: PropTypes.func,
    onRemove: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      fileList: this.props.fileList || this.props.defaultFileList || [],
      dragState: 'drop',
    };
  }

  onStart = (file) => {
    let targetItem = fileToObject(file);
    targetItem.status = 'uploading';
    const nextFileList = this.state.fileList.concat();

    const fileIndex = nextFileList.findIndex(({ uid }) => uid === targetItem.uid);
    if (fileIndex === -1) {
      nextFileList.push(targetItem);
    } else {
      nextFileList[fileIndex] = targetItem;
    }

    this.onChange({
      file: targetItem,
      fileList: nextFileList,
    });
    // fix ie progress
    if (!window.FormData) {
      this.autoUpdateProgress(0, targetItem);
    }
  }

  autoUpdateProgress(file) {
    const getPercent = genPercentAdd();
    let curPercent = 0;
    this.progressTimer = setInterval(() => {
      curPercent = getPercent(curPercent);
      this.onProgress({
        percent: curPercent * 100,
      }, file);
    }, 200);
  }

  onSuccess = (response, file) => {
    this.clearProgressTimer();
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }
    } catch (e) { /* do nothing */ }
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.status = 'done';
    targetItem.response = response;
    this.onChange({
      file: {...targetItem},
      fileList,
    });
  }

  onProgress = (e, file) => {
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.percent = e.percent;
    this.onChange({
      event: e,
      file: targetItem,
      fileList: this.state.fileList,
    });
  }

  onError = (error, response, file) => {
    this.clearProgressTimer();
    let fileList = this.state.fileList;
    let targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = 'error';
    this.onChange({
      file: {...targetItem},
      fileList,
    })
  }

  handleRemove(file) {
    let fileList = this.removeFile(file);
    if (fileList) {
      this.onChange({
        file,
        fileList,
      });
    }
  }

  handleManualRemove = (file) => {
    this.refs.upload.abort(file);
    /* eslint-disable */
    file.status = 'removed';
    /* eslint-enable */
    if ('onRemove' in this.props) {
      this.props.onRemove(file);
    } else {
      this.handleRemove(file);
    }
  }

  onChange = (info) => {
    if (!('fileList' in this.props)) {
      this.setState({ fileList: info.fileList });
    }
    this.props.onChange(info);
  }

  componentWillReceiveProps(nextProps) {
    if ('fileList' in nextProps) {
      this.setState({
        fileList: nextProps.fileList || [],
      });
    }
  }

  onFileDrop = (e) => {
    this.setState({
      dragState: e.type,
    });
  }

  beforeUpload = (file, fileList) => {
    if (!this.props.beforeUpload) {
      return true;
    }
    const result = this.props.beforeUpload(file, fileList);
    if (result === false) {
      this.onChange({
        file,
        fileList: uniqBy(
          this.state.fileList.concat(fileList.map(fileToObject)),
          (item) => item.uid,
        )
      });
      return false
    } else if (result && result.then) {
      return result;
    }
    return true
  }

  clearProgressTimer() {
    clearInterval(this.progressTimer);
  }

  saveUpload = (node) => {
    runInThisContext.upload = node
  }

  renderUploadList = (locale) => {
    const {showUploadList, listType} = this.props;
    const {showRemoveIcon, showPreviewIcon} = showUploadList;
    return (
      <UploadList
        listType={listType}
        items={this.state.fileList}
        onPreview={showRemoveIcon}
        onRemove={this.handleManualRemove}
        showRemoveIcon={showRemoveIcon}
        showPreviewIcon={showPreviewIcon}
        locale={{...locale, ...this.props.locale}}
      />
    );
  }

  render() {
    const {prefixCls = '', className, showUploadList, listType, type, disabled, children} = this.props;
    const rcUploadProps = {
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
      ...this.props,
      beforeUpload: this.beforeUpload,
    };

    delete rcUploadProps.className;

    const uploadList = showUploadList ? (
      <LocaleReceiver
        componentName='Upload'
        defaultLocale={defaultLocale.Upload}
      >
        {this.renderUploadList}
      </LocaleReceiver>
    ) : null;

    if (type === 'drag') {
    const dragCls = classNames({
      [prefixCls]: true,
      [`${prefixCls}-drag`]: true,
      [`${prefixCls}-drag-uploading`]: this.state.fileList.some(file => file.status === 'uploading'),
      [`${prefixCls}-drag-hover`]: this.state.dragState === 'dragover',
      [`${prefixCls}-disabled`]: disabled,
    });
    return (
      <span className={className}>
        <div className={dragCls}
          onDrop={this.onFileDrop}
          onDragOver={this.onFileDrop}
          onDragLeave={this.onFileDrop}
        >
          <RcUpload {...rcUploadProps} ref='upload'>
            <div className={`${prefixCls}-drag-container`}>
              {children}
            </div>
          </RcUpload>
        </div>
        {uploadList}
      </span>
      );
    }

    const uploadButtonCls = classNames({
      [prefixCls]: true,
      [`${prefixCls}-select`]: true,
      [`${prefixCls}-select-${listType}`]: true,
      [`${prefixCls}-disabled`]: disabled,
    });

    const uploadButton = this.props.children
      ? <div className={uploadButtonCls}><RcUpload {...rcUploadProps} ref='upload' /></div>
      : null;

    if (this.props.listType === 'picture-card') {
      return (
        <span className={this.props.className}>
          {uploadList}
          {uploadButton}
        </span>
      );
    }

    return (
      <span className={className}>
        {uploadButton}
        {uploadList}
      </span>
    );
  }
}

export default Upload;
