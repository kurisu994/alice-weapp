import Taro, { Component, Config } from '@tarojs/taro';
import { View, Image} from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { ProfileStore } from './store';

interface Props {
}

const _wait = require('../../assets/images/wait.png');

interface InjectedProps extends Props, NavigationPreloadManager {
  ProfileStore: ProfileStore
}

@inject('ProfileStore')
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
    navigationBarTitleText: '我的',
  };

  componentWillMount () {}

  componentWillReact () {
  }

  componentDidMount () { 
  }

  componentWillUnmount () {}

  componentDidShow () {}

  componentDidHide () {}

  render () {
    const { windowWidth, windowHeight } = Taro.getSystemInfoSync();
    
    return (
      <View>
        <Image style={{ width: `${windowWidth}px`, height: `${windowHeight}px` }} src={_wait} />
      </View>
    )
  }
}

export default Index;

const st = {
}
