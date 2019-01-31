import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text, Form, Input } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import './index.less';
import { CounterStore } from 'src/store/counter';

interface Props {
}

interface InjectedProps extends Props, NavigationPreloadManager {
  CounterStore: CounterStore
}

@inject('CounterStore')
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
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  formSubmit = e => {
    console.log(e)
  }

  formReset = e => {
    console.log(e)
  }

  render () {
    return (
      <View className='index'>
        <Form onSubmit={this.formSubmit} onReset={this.formReset} >
          <View className='form-body'>
            <Input name='userName' className='form-input'>用户名</Input>
            <Input name='password' className='form-input' password>用户名</Input>
          </View>
        </Form>
      </View>
    )
  }
}

export default Index;
