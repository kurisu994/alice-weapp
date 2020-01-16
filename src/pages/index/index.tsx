import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Form, Input } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import './index.less';
import { LoginStore } from './store';

interface Props {
}

interface InjectedProps extends Props, NavigationPreloadManager {
  LoginStore: LoginStore
}

@inject('LoginStore')
@observer
class Index extends Component<Props, any> {
  get injected() {
    return this.props as InjectedProps;
  }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '登录',
  };

  componentWillMount () {}

  componentWillReact () {
  }

  componentDidMount () { 
    Taro.getStorage({
      key: 'token',
      success: (res) => {
        if (res && res.data) {
          Taro.switchTab({ url: '/pages/homePage/index' });
        }
      },
      fail: () => {
        Taro.removeStorageSync('token');
      }
   })
  }

  componentWillUnmount () {}

  componentDidShow () {}

  componentDidHide () {}

  public _wxLogin = () => {
    const { LoginStore } = this.injected;
    Taro.login().then((data) => {
      if (data.code) {
        LoginStore.authentication(data.code, this.loginedcb);
        return;
      }
      this.Taost(`错误:授权码获取失败`);
    }).catch(e => {
      this.Taost(`错误:${e.message}`);
    });
  };

  public _qqLogin = () => {
    Taro.showToast({ title: '开发中...', icon: 'none',  });
  };

  public loginedcb = (data: string) => {
    Taro.setStorage({ key: "token", data });
    Taro.switchTab({
      url: '/pages/homePage/index'
    });
  };

  public Taost = (str: string) => {
    Taro.showToast({
      title: str,
      icon: 'none',
      duration: 2000
    })
  };

  public submitLogin = (e) => {
    const { LoginStore } = this.injected;
    const { changeParam, login } = LoginStore;
    changeParam(e.detail.value);
    login(this.loginedcb);
  };

  render () {
    const { LoginStore } = this.injected;
    const { loginInfo } = LoginStore;
    return (
      <View className='index'>
        <Form className="formContainer"
          onSubmit={this.submitLogin}>
          <Input
            name="userName"
            value={loginInfo.userName}
            className="inputItem"
            type='text'
            placeholder='请输入帐号'
          />
          <Input
            name="password"
            value={loginInfo.password}
            className="inputItem"
            type='text'
            password
            placeholder='请输入密码'
          />
          <Button className="button" type='primary' formType="submit" sendMessageTitle=''>登录</Button>
        </Form>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', marginBottom: '20px' }}>
          <Button size="mini" style={{ borderColor: '#FFF' }} className="btn" plain={true} onClick={this._wxLogin}>使用微信登录</Button>
          <Button size="mini" style={{ borderColor: '#FFF' }} className="btn" plain={true} onClick={this._qqLogin}>使用QQ登录</Button>
        </View>
      </View>
    )
  }
}

export default Index;
