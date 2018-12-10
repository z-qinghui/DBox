import React from 'react';
import Upload from './upload';
export default class Dragger extends React.Component {
  render() {
    return <Upload {...this.props} type='drag' style={{...this.props.style, height: this.props.height}} />;
  }
}
