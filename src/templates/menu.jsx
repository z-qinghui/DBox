import React from 'react'
import Menu from 'components/menu'
import Icon from 'components/icon'
import Switch from 'components/switch';


const SubMenu = Menu.SubMenu;

export default class MenuDemo extends React.Component {
  state = {
    current: 'home',
    theme: 'light',
    mode: 'inline',
    mode2: 'inline'
  }
  handleClick = (e) => {
    this.setState({
      current: e.indexkey,
    });
  }
  changeTheme = (value) => {
    this.setState({
      theme: value ? 'light' : 'dark',
    })
  }
  changeMode = (value) => {
    this.setState({
      mode: value ? 'vertical' : 'inline',
    });
  }
  changeMode2 = (value) => {
    this.setState({
      mode2: value ? 'vertical' : 'inline',
    });
  }
  render() {
    return (
      <div id='main-container'>
        <h1 className='h1'>顶部导航</h1>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode='horizontal'
          theme='dark'
        >
          <Menu.Item indexkey='home'><div><Icon type='home' /><span>首页</span></div></Menu.Item>
          <Menu.Item indexkey='platform' disabled><div><Icon type='platform' /><span>工作台</span></div></Menu.Item>
          <SubMenu indexkey='bars' title={<div><Icon type='bars' /><span>订单中心</span></div>}>
            <Menu.Item indexkey='1'>子菜单一</Menu.Item>
            <Menu.Item indexkey='2'>子菜单二</Menu.Item>
            <Menu.Item indexkey='3'>子菜单三</Menu.Item>
            <Menu.Item indexkey='4'>子菜单四</Menu.Item>
          </SubMenu>
          <Menu.Item indexkey='tool'>
            <a href='https://www.baidu.com' target='_blank'><div><Icon type='tool' /><span>配置管理</span></div></a>
          </Menu.Item>
        </Menu>
        <h1 className='h1'>内嵌菜单</h1>
        <Switch
          onChange={this.changeMode}
          type='primary'
          checkedChildren='折叠'
          unCheckedChildren='展开'
        />
        <br />
        <Menu
          onClick={this.handleClick}
          defaultSelectedKeys={['5']}
          defaultOpenKeys={['sub1']}
          mode={this.state.mode}
        >
          <Menu.Item indexkey='5'><div><Icon type='home' /><span>首页</span></div></Menu.Item>
          <SubMenu indexkey='sub1' title={<div><Icon type='platform' /><span>工作台</span></div>}>
            <Menu.Item indexkey='6'>子菜单一</Menu.Item>
            <Menu.Item indexkey='7'>子菜单二</Menu.Item>
            <Menu.Item indexkey='8'>子菜单三</Menu.Item>
            <Menu.Item indexkey='9'>子菜单四</Menu.Item>
          </SubMenu>
          <SubMenu indexkey='sub2' title={<div><Icon type='bars' /><span>订单中心</span></div>}>
            <Menu.Item indexkey='10'>子菜单五</Menu.Item>
            <Menu.Item indexkey='11'>子菜单六</Menu.Item>
            <Menu.Item indexkey='12'>子菜单七</Menu.Item>
            <Menu.Item indexkey='13'>子菜单八</Menu.Item>
          </SubMenu>
          <SubMenu indexkey='sub3' title={<div><Icon type='tool' /><span>配置管理</span></div>}>
            <Menu.Item indexkey='14'>子菜单九</Menu.Item>
            <Menu.Item indexkey='15'>子菜单十</Menu.Item>
            <Menu.Item indexkey='16'>子菜单十一</Menu.Item>
            <Menu.Item indexkey='17'>子菜单十二</Menu.Item>
          </SubMenu>
        </Menu>
        <h1 className='h1'>动态侧栏导航</h1>
        <div>
          <br />
          <br />
          <Switch
            checked={this.state.theme === 'light'}
            onChange={this.changeTheme}
            checkedChildren='浅色'
            unCheckedChildren='深色'
          />
          <Switch
            onChange={this.changeMode2}
            type='primary'
            checkedChildren='折叠'
            unCheckedChildren='展开'
          />
          <Menu
            theme={this.state.theme}
            onClick={this.handleClick}
            mode={this.state.mode2}
            defaultSelectedKeys={['25']}
          >
            <Menu.Item indexkey='21'><div><Icon type='home' /><span>首页</span></div></Menu.Item>
            <SubMenu indexkey='sub4' title={<div><Icon type='platform' /><span>工作台</span></div>}>
              <Menu.Item indexkey='22'>子菜单五</Menu.Item>
              <Menu.Item indexkey='23'>子菜单六</Menu.Item>
              <Menu.Item indexkey='24'>子菜单七</Menu.Item>
              <Menu.Item indexkey='25'>子菜单八</Menu.Item>
            </SubMenu>
            <SubMenu indexkey='sub5' title={<div><Icon type='bars' /><span>订单中心</span></div>}>
              <Menu.Item indexkey='26'>子菜单九</Menu.Item>
              <Menu.Item indexkey='27'>子菜单十</Menu.Item>
              <Menu.Item indexkey='28'>子菜单十一</Menu.Item>
              <Menu.Item indexkey='29'>子菜单十二</Menu.Item>
            </SubMenu>
            <SubMenu indexkey='sub6' title={<div><Icon type='tool' /><span>配置管理</span></div>}>
              <Menu.Item indexkey='30'>子菜单九</Menu.Item>
              <Menu.Item indexkey='31'>子菜单十</Menu.Item>
              <Menu.Item indexkey='32'>子菜单十一</Menu.Item>
              <Menu.Item indexkey='33'>子菜单十二</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>
    )
  };
}
