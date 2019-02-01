import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import './index.less';
import { CounterStore } from './store';

interface Props {
}

interface InjectedProps extends Props, NavigationPreloadManager {
  CounterStore: CounterStore
}

@inject('CounterStore')
@observer
class HomePage extends Component<Props, any> {
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
    navigationBarTitleText: '主页'
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  public _click = () => {
   console.log("点了一下")
  }

  render () {
    return (
      <View className='index'>
        <Text>Hello</Text>
        <Button onClick={this._click}>主页</Button>
      </View>
    )
  }
}

export default HomePage;
