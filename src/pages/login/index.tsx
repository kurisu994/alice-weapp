import Taro, { Component } from '@tarojs/taro';
import { Button, Form, Input } from '@tarojs/components';

import './style.less';

interface Props {
}

export default class Login extends Component<Props, Object> {
  config = {
    navigationBarTitleText: '帐号登录',
    backgroundColor: '#FFFFFF'
  };

  state = { account: undefined, password: undefined };

  componentDidMount() {
  }

  submitLogin = (e) => {
    const data = e.detail.value;
    console.log(e)
    const account = data.account.trim();
    const password = data.password.trim();
    if (!account.length) {
      Taro.showToast({ icon: 'none', title: '帐号未输入' });
      this.setState({ account: null });
      return;
    }
    if (!password.length) {
      Taro.showToast({ icon: 'none', title: '密码未输入' });
      this.setState({ password: null });
      return;
    }
  };

  render() {
    const { account, password } = this.state;
    return (
      <Form className="formContainer"
            onSubmit={this.submitLogin}>
        <Input
          name="account"
          value={account}
          className="inputItem"
          type='text'
          placeholder='请输入帐号'
        />
        <Input
          name="password"
          value={password}
          className="inputItem"
          type='text'
          password
          placeholder='请输入密码'
        />
        <Button className="button" type='primary' formType="submit" sendMessageTitle=''>登录</Button>
      </Form>
    );
  }
}

