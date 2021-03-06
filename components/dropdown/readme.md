

## 何时使用

当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

##### **基本用法**
```jsx
const { Menu, MenuItem, DropdownNormal } = require('./index');const menu2 = (
      <Menu onClick={handleMenu1Click}>
        <MenuItem key='2.1'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
        <MenuItem key='2.2'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
        <MenuItem key='2.3'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
      </Menu>
    );
const menu1 = (
  <Menu onClick={handleMenu1Click}>
    <MenuItem key='1'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='2'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='3'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
  </Menu>
);
function handleButtonClick(e) {
  console.info('click left button', e);
};
function handleMenu1Click(e) {
  console.info('click', e);
};
<div>
	<DropdownNormal overlay={menu2} type='caret-down' trigger={['hover']} >
	  下拉菜单
	</DropdownNormal>
	<Dropdown overlay={menu1} trigger={['hover']} onClick={this.handleButtonClick}>
	  <Button>
	  默认菜单
	  </Button>
	</Dropdown>
</div>
```

##### **常用类型**
```jsx
const { Menu, MenuItem, DropdownButton, DropdownNormal } = require('./index');
const menu4 = (
  <Menu onClick={handleMenu1Click}>
    <MenuItem key='1'><a href='https://www.baidu.com' target='_blank'><Icon type='bars' />操作选项</a></MenuItem>
    <MenuItem key='2'><a href='https://www.baidu.com' target='_blank'><Icon type='bars' />操作选项</a></MenuItem>
    <MenuItem key='3'><a href='https://www.baidu.com' target='_blank'><Icon type='bars' />操作选项</a></MenuItem>
  </Menu>
);
const menu2 = (
  <Menu onClick={handleMenu1Click}>
    <MenuItem key='2.1'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='2.2'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='2.3'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
  </Menu>
);
const menu = (
  <Menu onClick={handleMenu1Click}>
    <MenuItem key='1'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='2'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='3'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
  </Menu>
);
function handleButtonClick(e) {
  console.info('click left button', e);
};
function handleMenu1Click(e) {
  console.info('click', e);
};
<div>
    <Dropdown overlay={menu4} trigger={['hover']} onClick={handleButtonClick}>
      <Button>
        默认菜单
      </Button>
    </Dropdown>
    <Dropdown overlay={menu4} trigger={['hover']} onClick={handleButtonClick}>
      <Button style={{marginLeft: '50px', marginRight: '50px' }} type='primary'>
        主要菜单
      </Button>
    </Dropdown>
    <Dropdown overlay={menu4} trigger={['hover']} onClick={handleButtonClick}>
      <Button type='secondary'>
        次要菜单
      </Button>
    </Dropdown>
    <DropdownButton  style={{marginLeft: '50px', marginRight: '50px' }} disabled overlay={menu4} trigger={['hover']} onClick={handleButtonClick}>
      禁用菜单
    </DropdownButton>
    <DropdownNormal overlay={menu2} type='caret-down' trigger={['hover']} >
      文本菜单
    </DropdownNormal>
</div>
```

##### **组合使用**
```jsx
const ButtonGroup = Button.Group;
const { Menu, MenuItem, DropdownButton } = require('./index');
const menu1 = (
  <Menu onClick={handleMenu1Click}>
    <MenuItem key='1'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='2'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='3'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
  </Menu>
);
function handleMenu1Click(e) {
  console.info('click', e);
};

<ButtonGroup className='buttonGroup'>  <DropdownButton overlay={menu1} trigger={['hover']}>
  操作三
  </DropdownButton>
  <Button>
    操作二
  </Button>
  <Button>
    操作一
  </Button>
</ButtonGroup>
```

##### **三种尺寸**
```jsx
const { Menu, MenuItem, DropdownButton } = require('./index');
const menu2 = (
  <Menu onClick={handleMenu1Click}>
    <MenuItem key='2.1'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='2.2'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='2.3'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
  </Menu>
);
function handleMenu1Click(e) {
  console.info('click', e);
};
<div>
	<DropdownButton size='small' overlay={menu2} trigger={['hover']}>
      默认菜单
    </DropdownButton>
    <DropdownButton style={{marginLeft: '50px', marginRight: '50px' }} overlay={menu2} trigger={['hover']}>
      默认菜单
    </DropdownButton>
    <DropdownButton size='large' overlay={menu2} trigger={['hover']}>
      默认菜单
    </DropdownButton>
</div>
```

##### **弹出位置**
```jsx
const { Menu, MenuItem } = require('./index');
const menu = (
  <Menu onClick={handleMenu1Click}>
    <MenuItem key='1'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='2'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='3'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
  </Menu>
);
function handleMenu1Click(e) {
  console.info('click', e);
};
<div>
	<Dropdown overlay={menu} placement='topLeft'>
      <Button>上左</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement='topCenter'>
      <Button>上中</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement='topRight'>
      <Button>上右</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement='bottomLeft'>
      <Button>下左</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement='bottomCenter'>
      <Button>下中</Button>
    </Dropdown>
    <Dropdown overlay={menu} placement='bottomRight'>
      <Button>下右</Button>
    </Dropdown>
</div>
```

##### **触发方式**
```jsx
const { Menu, MenuItem, DropdownNormal } = require('./index');
const menu = (
  <Menu onClick={handleMenu1Click}>
    <MenuItem key='1'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='2'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='3'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
  </Menu>
);
const menu2 = (
  <Menu onClick={handleMenu1Click}>
    <MenuItem key='2.1'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='2.2'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='2.3'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
  </Menu>
);
function handleMenu1Click(e) {
  console.info('click', e);
};
function handleButtonClick(e) {
  console.info('click left button', e);
};
<div>
	<DropdownNormal overlay={menu2} type='caret-down' trigger={['click']} >
      点击下拉菜单
    </DropdownNormal>
    <Dropdown overlay={menu} trigger={['hover']} onClick={handleButtonClick}>
      <Button>
      hover默认菜单
      </Button>
    </Dropdown>
</div>
```

##### **触发事件**
```jsx
const { Menu, MenuItem } = require('./index');
const menu = (
  <Menu onClick={handleMenu1Click}>
    <MenuItem key='2.1'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='2.2'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='2.3'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
  </Menu>
);
function handleMenu1Click(e) {
  console.info('click', e);
};
onVisibleChangeBtn = (visible) => {
console.log(`按钮菜单发生了变化====>${visible}`)
};
function handleButtonClick(e) {
  console.info('click left button', e);
};
<Dropdown overlay={menu} trigger={['hover']} onVisibleChange={this.onVisibleChangeBtn} onClick={handleButtonClick}>
  <Button>
  hover默认菜单
  </Button>
</Dropdown>
```

##### **多级菜单**
```jsx
const { Menu, MenuItem, SubMenu  } = require('./index');
const menu1 = (
  <Menu onClick={handleMenu1Click}>
    <MenuItem key='1.1'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <MenuItem key='1.2'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    <SubMenu title='子菜单'>
      <MenuItem key='2.3'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
      <MenuItem key='2.4'><a href='https://www.baidu.com' target='_blank'>操作选项</a></MenuItem>
    </SubMenu>
  </Menu>
)
function handleMenu1Click(e) {
  console.info('click', e);
};const DropdownButton = Dropdown.DropdownButton;
<DropdownButton placement='bottomLeft' overlay={menu1} trigger={['hover']}>
  默认菜单
</DropdownButton>
```



## API

属性如下

| 成员        | 说明             | 类型               | 默认值       |
|-------------|------------------|--------------------|--------------|
| trigger     | 触发下拉的行为   | ['click'] or ['hover'] | ['hover']        |
| placement     | 菜单弹出位置   | string`bottomLeft``bottomCenter``bottomRight``topLeft``topCenter``topRight` | `bottomLeft`        |
| overlay     | 菜单         | [Menu](/components/menu) | -     |
| disabled     | 菜单是否禁用搭配按钮一起使用并放置于按钮身上         | `boolean` | false    |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](http://codepen.io/anon/pen/xVBOVQ?editors=001) | Function(triggerNode) | () => document.body |
| visible     | 菜单是否显示 | Bool   | 无           |
| onVisibleChange  | 菜单显示状态改变时调用，参数为 { visible } | Function | - |

菜单可由 `antd.Menu` 取得，可设置 `onSelect` 回调，菜单还包括菜单项 `antd.Menu.Item`，分割线 `antd.Menu.Divider`。

> 注意： Menu.Item 必须设置唯一的 key 属性。

### DropdownButton

| 成员        | 说明             | 类型               | 默认值       |
|-------------|------------------|--------------------|--------------|
| type        | 按钮类型，和 [Button](/components/button/) 一致 | String | - |
| onClick     | 点击左侧按钮的回调，和 [Button](/components/button/) 一致 | Function   | - |
| trigger     | 触发下拉的行为   | ['click'] or ['hover'] | ['hover']        |
| overlay     | 菜单         | [Menu](/components/menu/) | -     |
| disabled     | 菜单是否禁用         | `boolean` | false    |
| visible     | 菜单是否显示 | Bool   | 无           |
| placement     | 菜单弹出位置   | string`bottomLeft``bottomCenter``bottomRight``topLeft``topCenter``topRight` | `bottomLeft`        |
| size     | 按钮菜单大小和Button一致 | string`large``small`默认   | 默认           |
