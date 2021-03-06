import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from 'components/tabs';
import Icon from 'components/icon';
import Radio from 'components/radio';
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.RadioGroup;
const RadioButton = Radio.RadioButton;


export default class TabsView extends React.Component {
  static defaultProps = {
    target() {
      return window;
    },
    onChange() {},
  }
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: '当前分页', content: '当前分页', key: '1' },
      { title: '可关闭分页', content: '可关闭分页', key: '2' }
    ];
    this.state = {
      mode: 'top',
      panes,
      activeKey: panes[0].key
    }
  }
  onChange = (activeKey) => {
    this.setState({activeKey});
  };
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };
  // 点击按钮增加分页
  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: '新增分页', content: '新增分页内容', key: activeKey });
    this.setState({panes, activeKey});
  };
  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({panes, activeKey});
  };
  callBack = (key) => {
    console.info(key);
  };
  handleModeChange = (e) => {
    const mode = e.target.value;
    this.setState({ mode });
  };
  componentDidMount () {
    const element = ReactDOM.findDOMNode(this.refs.box_table);
    const currentHeight = element.offsetTop - element.offsetHeight;
    window.addEventListener('scroll', this.onScroll = () => {
      if (window.scrollY >= currentHeight && window.scrollY < element.offsetTop) {
        element.style.position = 'fixed';
        element.style.top = '0';
        element.style.left = '0';
        element.style.width = '100%';
        element.style.padding = '0 170px 144px 64px';
        element.style.backgroundColor = '#fff';
      } else if (window.scrollY <= currentHeight || window.scrollY > currentHeight + element.offsetHeight) {
        element.style.position = 'relative';
        element.style.padding = '0';
      }
    });
  }

  componentWillUnmount () {
      window.removeEventListener('scroll', this.onScroll);
  }

  render() {
    const { mode } = this.state;
    return (
      <div id='main-container'>
        <h1 className='h1'>1.基本用法和禁用</h1>
        <Tabs defaultActiveKey='5' onChange={this.callBack}>
          <TabPane tab='当前选项' key='5'>当前选项</TabPane>
          <TabPane disabled tab='禁用选项' key='4'>禁用选项</TabPane>
          <TabPane tab='其他选项' key='3'>其他选项</TabPane>
        </Tabs>
        <h1 className='h1'>2.有图标的标签</h1>
        <Tabs defaultActiveKey='7'>
          <TabPane tab={<span><Icon type='bars' />当前选项</span>} key='7'>
          当前选项
          </TabPane>
          <TabPane disabled tab={<span><Icon type='appstore-o' />禁用选项</span>} key='8'>
          禁用选项
          </TabPane>
          <TabPane tab={<span><Icon type='detail' />其他选项</span>} key='9'>
          其他选项
          </TabPane>
        </Tabs>
        <h1 className='h1'>3.tab页上下，左右滑动</h1>
        <RadioGroup onChange={this.handleModeChange} value={mode} style={{marginBottom: 8}}>
          <RadioButton value='top'>水平</RadioButton>
          <RadioButton value='left'>垂直</RadioButton>
        </RadioGroup>
        <Tabs defaultActiveKey='11' tabPosition={mode} style={{height: 220}}>
          <TabPane tab='分页 1' key='11'>分页 1</TabPane>
          <TabPane tab='分页 2' key='12'>分页 2</TabPane>
          <TabPane tab='分页 3' key='13'>分页 3</TabPane>
          <TabPane tab='分页 4' key='14'>分页 4</TabPane>
          <TabPane tab='分页 5' key='15'>分页 5</TabPane>
          <TabPane tab='分页 6' key='16'>分页 6</TabPane>
          <TabPane tab='分页 7' key='17'>分页 7</TabPane>
          <TabPane tab='分页 8' key='18'>分页 8</TabPane>
          <TabPane tab='分页 9' key='19'>分页 9</TabPane>
          <TabPane tab='分页 10' key='20'>分页 10</TabPane>
          <TabPane tab='分页 11' key='21'>分页 11</TabPane>
          <TabPane tab='分页 12' key='22'>分页 12</TabPane>
          <TabPane tab='分页 13' key='23'>分页 13</TabPane>
          <TabPane tab='分页 14' key='24'>分页 14</TabPane>
        </Tabs>
        <h1 className='h1'>4.卡片式标签页容器</h1>
        <Tabs type='card'>
          <TabPane tab='当前分页' key='25'>
            <p>分页内容 1</p>
            <p>分页内容 1</p>
            <p>分页内容 1</p>
          </TabPane>
          <TabPane tab='其他分页' key='26'>
            <p>分页内容 2</p>
            <p>分页内容 2</p>
            <p>分页内容 2</p>
          </TabPane>
          <TabPane tab='其他分页' key='27'>
            <p>分页内容 3</p>
            <p>分页内容 3</p>
            <p>分页内容 3</p>
          </TabPane>
        </Tabs>
        <h1 className='h1'>5.新增和关闭</h1>
        <Tabs onChange={this.onChange} activeKey={this.state.activeKey} type='editable-card' onEdit={this.onEdit}>
          {this.state.panes.map(pane => <TabPane closable={pane.key === '1' ? false : 'true'} tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
        </Tabs>
        <h1 className='h1'>6.卡片式容器</h1>
        <Tabs type='cardTabs'>
          <TabPane tab='当前分页' key='28'>
            <p>当前分页内容 1</p>
            <p>当前分页内容 2</p>
            <p>当前分页内容 3</p>
          </TabPane>
          <TabPane tab='其他分页' key='29'>
            <p>其他分页内容 1</p>
            <p>其他分页内容 2</p>
            <p>其他分页内容 3</p>
          </TabPane>
          <TabPane tab='其他分页' key='30'>
            <p>其他分页内容 1</p>
            <p>其他分页内容 2</p>
            <p>其他分页内容 3</p></TabPane>
        </Tabs>
        <h1 className='h1'>7.吸顶效果</h1>
        <Tabs ref='box_table'>
          <TabPane tab='当前分页' key='31'>当前分页内容</TabPane>
          <TabPane tab='其他分页内容' key='32'>其他分页内容内容</TabPane>
          <TabPane tab='其他分页内容' key='33'>其他分页内容内容</TabPane>
        </Tabs>
      </div>
    )
  }
}
