
#### **何时使用**

- 在一组可选项中进行多项选择时；
- 单独使用可以表示两种状态之间的切换，和 `switch` 类似。区别在于切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

##### **通用多选框**
```jsx
<Checkbox >
  多选框
</Checkbox>
```

##### **受控多选框**
```jsx
initialState = {
      checked: false,
      disabled: false
    }
  toggleChecked = (checked) => {
    setState({ checked: !state.checked });
  }
  toggleDisabled = (disabled) => {
    setState({ disabled: !state.disabled });
  }
  onChangeState = (e) => {
    setState({
      checked: !state.checked
    });
  }
  
<div>
	<Checkbox onChange={this.onChangeState} checked={state.checked} disabled={state.disabled}>{`${state.checked ? 'Checked' : 'Unchecked'}-${state.disabled ? 'Disabled' : 'Enabled'}`}</Checkbox>
	<Button onClick={this.toggleChecked}>选中切换</Button>
	
	<Button onClick={this.toggleDisabled}>禁用切换</Button>
</div>
```

##### **多选框全选**
```jsx
const CheckboxGroup = Checkbox.CheckboxGroup;
const plainOptions = ['苹果', '梨', '桔子'];
const defaultCheckedList = ['苹果', '桔子'];
const options = [
  { label: '苹果', value: '苹果' },
  { label: '梨', value: '梨' },
  { label: '桔子', value: '桔子' },
];
initialState = {
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
}
onChange = (checkedList) => {
    setState({
      checkedList,
      indeterminate: !!state.checkedList.length && (state.checkedList.length < plainOptions.length),
      checkAll: state.checkedList.length === plainOptions.length
    })
  }
 onCheckAllChange = (e) => {
    setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  }
<div>
          <Checkbox indeterminate={state.indeterminate} checked={state.checkAll} onChange={this.onCheckAllChange}>
            选择所有选项
          </Checkbox>
          <CheckboxGroup options={plainOptions} value={state.checkedList} onChange={this.onChange} />
</div>
```

##### **多选框组**
```jsx
const optionsWithDisabled = [
  { label: '苹果', value: '苹果' },
  { label: '梨', value: '梨' },
  { label: '桔子', value: '桔子', disabled: false },
];
const options = [
  { label: '苹果', value: '苹果' },
  { label: '梨', value: '梨' },
  { label: '桔子', value: '桔子' },
];
const plainOptions = ['苹果', '梨', '桔子'];
const CheckboxGroup = Checkbox.CheckboxGroup;
<div>
	<CheckboxGroup options={plainOptions} defaultValue={['苹果']} />
   <br />
   <CheckboxGroup options={options} defaultValue={['梨']} />
   <br />
   <CheckboxGroup options={optionsWithDisabled} disabled defaultValue={['梨']} />
</div>
```

##### **多选框不可用**
```jsx
<div>
	<Checkbox defaultChecked={false} disabled >不可操作</Checkbox>
   <Checkbox defaultChecked disabled >不允许操作</Checkbox>
</div>
```


## API

### Checkbox

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoFocus | 自动获取焦点 | boolean | false |
| checked | 指定当前是否选中 | boolean | false |
| defaultChecked | 初始是否选中 | boolean | false |
| disabled | 失效状态 | boolean | false |
| indeterminate | 设置 indeterminate 状态，只负责样式控制 | boolean | false |
| onChange | 变化时回调函数 | Function(e:Event) | - |
| onClick | 点击时回调函数 | Function(e:Event) | - |

### CheckboxGroup

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认选中的选项 | string\[] | \[] |
| options | 指定可选项 | string\[] | \[] |
| value | 指定选中的选项 | string\[] | \[] |
| disabled | 整组失效 | boolean | false |
| onChange | 变化时回调函数 | Function(checkedValue) | - |
## 方法

### Checkbox

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |


<style>.idoll-steps{margin-bottom: 10px}</style>
