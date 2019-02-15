import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Form, Input, Text, ScrollView, Picker, Image } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { AccountStore } from '../store';
import { CSSProperties } from 'react';
import { toJS } from 'mobx';
import { Type } from '../entity';

interface Props {
}

const _showPassword = require('../../../assets/images/password-view.png');
const _hidePassword = require('../../../assets/images/password-not-view.png');
const _copy = require('../../../assets/images/copy.png');
const _url = require('../../../assets/images/arrow.png');

interface InjectedProps extends Props, NavigationPreloadManager {
  AccountStore: AccountStore
}

@inject('AccountStore')
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
    navigationBarTitleText: '详情',
  };

  componentWillMount() { }

  componentDidMount() { 
  }

  componentWillUnmount() {
    const { AccountStore } = this.injected;
    const { reset } = AccountStore;
    reset();
  }

  componentDidShow() { }

  componentDidHide() { }

  public state = {
    hidePassword: true,
    selector: [
      {
        label: "登录信息",
        vaule: 1
      },
      {
        label: "密码信息",
        vaule: 2
      },
      {
        label: "电子邮箱",
        vaule: 3
      },
      {
        label: "服务器",
        vaule: 4
      },
      {
        label: "无线路由器",
        vaule: 5
      },
      {
        label: "身份信息",
        vaule: 6
      },
      {
        label: "软件许可",
        vaule: 7
      },
    ]
  }

  public submit = (e) => {
    const { AccountStore } = this.injected;
    const { edit, save } = AccountStore;
    edit(e.detail.value);
    console.log(e.detail.value)
    save(() => {
      Taro.navigateBack();
    });
  };

  public onChange = (e) => {
    const { AccountStore } = this.injected;
    const { edit } = AccountStore;
    edit({ accountType: e.detail.value });
  }

  public passwordHander = () => {
    let show = this.state.hidePassword;
    this.setState({ hidePassword: !show });
  }

  public copy = (data: string) => {
   if (data) {
     Taro.setClipboardData({ data }).then(() => {
       Taro.showToast({ title: `已复制^_^!`, icon: 'none' });
     });
   }
  }

  render() {
    const { AccountStore } = this.injected;
    const { accountDetail, loadding } = AccountStore;
    const { hidePassword } = this.state;
    const data = toJS(accountDetail);
    return (
      <ScrollView style={st.mainSt as CSSProperties}>
        <Form className="formContainer"
          onSubmit={this.submit}>
          <View style={st.rowView as CSSProperties}>
            <Text style={st.text}>名称:</Text>
            <Input
              name="name"
              style={st.input}
              placeholderStyle="font-size:12px;margin-left:10px;color:#858585"
              value={data.name}
              className="inputItem"
              type='text'
              confirmType="next"
              placeholder='请输入记录名称'
            />
          </View>
          <View style={st.rowView as CSSProperties}>
            <Text style={st.text}>账号:</Text>
            <View style={st.pass as CSSProperties}>
              <Input
                style={st.accountInput}
                placeholderStyle="font-size:12px;margin-left:10px;color:#858585"
                name="account"
                value={data.account}
                confirmType="next"
                type='text'
                placeholder='请输入记录账号'
              />
              <Image style={st.img} src={_copy} onClick={() => this.copy(data.account)} />
            </View>
          </View>
          <View style={st.rowView as CSSProperties}>
            <Text style={st.text}>口令:</Text>
            <View style={st.pass as CSSProperties}>
              <Input
                style={st.password}
                placeholderStyle="font-size:12px;margin-left:10px;color:#858585"
                name="cipherCode"
                value={data.cipherCode}
                type='text'
                password={hidePassword}
                confirmType="next"
                placeholder='请输入安全口令'
              />
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image style={st.img} src={_copy} onClick={() => this.copy(data.cipherCode)} />
                <Image style={st.img} src={hidePassword ? _showPassword : _hidePassword} onClick={this.passwordHander} />
              </View>
            </View>
          </View>
          <View style={st.rowView as CSSProperties}>
            <Text style={st.text}>类型:</Text>
            <Picker style={{ width: '75%', marginRight: '10px' }} mode='selector' rangeKey="label" range={this.state.selector} onChange={this.onChange}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} className='picker'>
                <Text style={st.accountInput}>{Type[data.accountType || 1]}</Text>
                <Image src={_url} style={{ width: '10px', height: '10px' }}/>
              </View>
            </Picker>
          </View>
          <View style={st.rowView as CSSProperties}>
            <Text style={st.text}>备注:</Text>
            <Input
              style={st.input}
              placeholderStyle="font-size:12px;margin-left:10px;color:#858585"
              name="remark"
              value={data.remark}
              confirmType="done"
              type="text"
              placeholder='请输入备注'
            />
          </View>
          <View style={st.rowView as CSSProperties}>
            <Text style={st.text}>创建时间:</Text>
            <Input
              style={st.input}
              value={data.createTime}
              type='text'
              disabled
            />
          </View>
          <View style={st.rowView as CSSProperties}>
            <Text style={st.text}>最后修改时间:</Text>
            <Input
              style={st.input}
              value={data.updateTime}
              type='text'
              disabled
            />
          </View>
          <Button disabled={loadding} loading={loadding} style={st.btn as CSSProperties}  type='primary' formType="submit" sendMessageTitle='点击保存'>保存</Button>
        </Form>
      </ScrollView>
    )
  }
}

export default HomePage;

const st = {
  mainSt: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  rowView: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '15px',
  },
  text: {
    fontSize: '12px',
    marginLeft: '10px',
    color: '#858585'
  },
  input: {
    fontSize: '15px',
    marginRight: '10px',
    color: '#333',
    width: '75%'
  },
  accountInput: {
    fontSize: '15px',
    color: '#333',
    flex: 1
  },
  pass: { 
    width: '75%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: '10px',
  },
  password: {
    fontSize: '15px',
    color: '#333',
    flex: 1
  },
  btn: {
    marginTop: '15px',
    width: '40%',
    height: '33px',
    backgroundColor: '#80A7F0',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '33px',
  },
  img: {
    width: '18px',
    height: '18px',
    marginLeft: '10px'
  }
};
