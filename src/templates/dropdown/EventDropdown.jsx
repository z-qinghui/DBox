import React from 'react';
import {Button, Dropdown, Menu} from 'components';
const MenuItem = Menu.MenuItem;
const menu = (
  <Menu theme='light' onClick={handleMenu1Click}>
    <MenuItem key='2.1'><a href='javascript:;' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='2.2'><a href='javascript:;' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='2.3'><a href='javascript:;' target='_blank'>操作选项</a></MenuItem>
  </Menu>
);
function handleMenu1Click(e) {
  console.info('click', e);
};
function onVisibleChangeBtn (visible) {
console.log(`按钮菜单发生了变化====>${visible}`)
};
function handleButtonClick(e) {
  console.info('click left button', e);
};
export default class EventDropdown extends React.Component {
  render () {
    return (
      <Dropdown overlay={menu} trigger={['hover']} onVisibleChange={onVisibleChangeBtn} onClick={handleButtonClick}>
        <Button>
      hover默认菜单
        </Button>
      </Dropdown>
    )
  }
}