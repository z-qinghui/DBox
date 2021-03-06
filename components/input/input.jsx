// object.omit github.com/jonschlinkert/object.omit
import React, { Component } from 'react'
import classNames from 'classnames'
import { PropTypes } from 'prop-types';
import omit from 'object.omit';

import './style'

function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

export default class Input extends Component {
  static defaultProps = {
    // intialValue: '',
    disabled: false,
    prefixCls: 'idoll-input',
    type: 'text',
    onPressEnter() {},
    onKeyDown() {},
    onChange() {}
  };

  static propTypes = {
    type: PropTypes.string,
    // placeholder: PropTypes.string,
    // name: PropTypes.string,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    // autosize: PropTypes.oneOfType([
    //   PropTypes.bool,
    //   PropTypes.object
    // ]),
    size: PropTypes.oneOf(['small', 'default', 'large']),
    // maxLength: PropTypes.string,
    // readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    // intialValue: PropTypes.any,
    className: PropTypes.string,
    addonBefore: PropTypes.node,
    addonAfter: PropTypes.node,
    prefixCls: PropTypes.string,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    // autoFocus: PropTypes.bool,
    onPressEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onChange: PropTypes.func,
    beforelength: PropTypes.string, // 前置的宽度
    afterlength: PropTypes.string, // 后置的宽度
    // onClick: PropTypes.func,
    // onFocus: PropTypes.func,
    // onBlur: PropTypes.func
  };

  handleKeyDown = (e) => {
    const { onPressEnter, onKeyDown } = this.props;
    if (e.keyCode === 13) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e)
    }
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  getInputClassName() {
    const { prefixCls, size, disabled, readOnly } = this.props;
    return classNames(prefixCls, {
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-readOnly`]: readOnly
    }, {
      [`${prefixCls}-enter-button`]: true,
      [`${prefixCls}-${size}`]: true
    });
  }

  saveInput = (node) => {
    this.input = node;
  }

  renderLabelInput(children) {
    const props = this.props;

    if (!props.addonBefore && !props.addonAfter) {
        return children;
    }

    const wrapperClassName = `${props.prefixCls}-group`;
    const addonClassName = `${wrapperClassName}-addon`;

    const addonBefore = props.addonBefore ? (
      props.beforelength ? (
        <span className={addonClassName} style={{width: props.beforelength}}>
          {props.addonBefore}
        </span>
      )
      : (
        <span className={addonClassName}>
          {props.addonBefore}
        </span>
        )
    ) : null;

    const addonAfter = props.addonAfter ? (
      props.afterlength ? (
        <span className={addonClassName} style={{width: props.afterlength}}>
          {props.addonAfter}
        </span>
      )
      : (
        <span className={addonClassName}>
          {props.addonAfter}
        </span>
        )
    ) : null;

    // const className = classNames({
    //   [`${props.prefixCls}-wrap`]: true,
    //   [wrapperClassName]: (addonBefore || addonAfter)
    // });
    const className = classNames(`${props.prefixCls}-wrapper`, {
      [wrapperClassName]: (addonBefore || addonAfter),
    });

    const groupClassName = classNames({
      [`${props.prefixCls}-group-wrapper-sm`]: props.size === 'small',
      [`${props.prefixCls}-group-wrapper-lg`]: props.size === 'large'
    });

    if (addonBefore || addonAfter) {
      return (
        <span
          className={groupClassName}
          style={props.style}
        >
          <span className={className}>
            {addonBefore}
            {React.cloneElement(children, { style: null })}
            {addonAfter}
          </span>
        </span>
      )
    }

    return (
      <span className={className}>
        {addonBefore}
        {children}
        {addonAfter}
      </span>
    );
  }

  renderLaybeldIcon = (children) => {
    const { props } = this;

    if (!('prefix' in props || 'suffix' in props)) {
      return children;
    }
    const prefix = props.prefix ? (
      <span className={`${props.prefixCls}-prefix`}>
        {props.prefix}
      </span>
    ) : null;

    const suffix =
      <span style={{display: props.suffix ? 'block' : 'none'}} className={`${props.prefixCls}-suffix`}>
        {props.suffix}
      </span>
    const affixWrapperCls = classNames(props.className, `${props.prefixCls}-affix-wrapper`, {
      [`${props.prefixCls}-affix-wrapper-sm`]: props.size === 'small',
      [`${props.prefixCls}-affix-wrapper-lg`]: props.size === 'large',
    });

    return (
      <span
        // className={classNames(props.className, `${props.prefixCls}-affix-wrapper`)}
        className={affixWrapperCls}
        style={props.style}
      >
        {prefix}
        {React.cloneElement(children, { style: null, className: this.getInputClassName() })}
        {suffix}
      </span>
    );
  }

  renderInput() {
    const { value, className } = this.props;

    // Fix https://fb.me/react-unknown-prop
    const otherProps = omit(this.props, [
      'prefixCls',
      'onPressEnter',
      'addonBefore',
      'addonAfter',
      'prefix',
      'suffix'
    ]);


    // const node = <Icon className={`${prefixCls}-icon`} type='close' />;
    // const clearSuffix = React.cloneElement(node, {
    //   onClick: this.onClear,
    //   className: 'icon-hover',
    // });

    if ('value' in this.props) {
      otherProps.value = fixControlledValue(value);
      // Input elements must be either controlled or uncontrolled,
      // specify either the value prop, or the defaultValue props, but no both
      delete otherProps.defaultValue;
    }
    return this.renderLaybeldIcon(
      <input
        {...otherProps}
        className={classNames(this.getInputClassName(), className)}
        onKeyDown={this.handleKeyDown}
        ref={this.saveInput}
      />
    );
  }

  render() {
    return this.renderLabelInput(this.renderInput());
  }
}
