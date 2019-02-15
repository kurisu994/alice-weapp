import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import '@tarojs/async-await'
import * as store from '../src/store';
import { View } from '@tarojs/components';
import { GlobalEvent } from './utils';


class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/homePage/index',
      'pages/homePage/components/Detail',
      'pages/profile/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      backgroundColor: '#ebebeb'
    },
    tabBar: {
      color: '#999999',
      selectedColor: '#333333',
      backgroundColor: '#fcfcfc',
      borderStyle: 'white',
      position: 'bottom',
      list: [
        {
          text: '首页',
          pagePath: 'pages/homePage/index',
          iconPath: 'assets/images/01.png',
          selectedIconPath: 'assets/images/01_HL.png'
        },
        {
          text: '我的',
          pagePath: 'pages/profile/index',
          iconPath: 'assets/images/02.png',
          selectedIconPath: 'assets/images/02_HL.png'
        }
      ]
    }
  };

  static stacks: Array<String> = [];

  handleUpdate() {
    // 更新新版本
    const updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate(function () {
      // 请求完新版本信息的回调
    });
    updateManager.onUpdateReady(function () {
      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate();
    });
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    });
  }

  componentDidMount () {
  }

  componentWillMount() {
    this.handleUpdate();
    // 请求失败事件
    Taro.eventCenter.on(GlobalEvent.REQUEST_FAIL, error => {
      if (error instanceof Error) {
        Taro.showToast({ title: error.message || '获取失败', icon: 'none' });
      }
    });
    // Token失效事件
    Taro.eventCenter.on(GlobalEvent.TOKEN_INVALID, this.handleTokenInvalid);
  }
  componentWillUnmount() {
    Taro.eventCenter.off();
  }
  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  public handleTokenInvalid = async () => {
    Taro.showToast({ title: `登录已过期`, icon: 'none' });
    Taro.removeStorage({ key: "token" });
    const url = `/pages/index/index`;
    await Taro.reLaunch({ url });
  };
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <View />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
