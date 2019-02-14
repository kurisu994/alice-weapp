import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Form, Input, Text, ScrollView, Picker } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { AccountStore } from '../store';
import { CSSProperties } from 'react';
import { toJS } from 'mobx';
import { Type } from '../entity';

interface Props {
}

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

  public submitLogin = () => {

  }

  public onChange = (e) => {
    console.log(e.detail)
  }

  render() {
    const { AccountStore } = this.injected;
    const { accountDetail } = AccountStore;
    const data = toJS(accountDetail);
    return (
      <ScrollView style={st.mainSt as CSSProperties}>
        <Form className="formContainer"
          onSubmit={this.submitLogin}>
          <View style={st.rowView as CSSProperties}>
            <Text style={st.text}>名称:</Text>
            <Input
              name="name"
              style={st.input}
              value={data.name}
              className="inputItem"
              type='text'
              placeholder='请输入记录名称'
            />
          </View>
          <View style={st.rowView as CSSProperties}>
            <Text style={st.text}>账号:</Text>
            <Input
              style={st.input}
              name="account"
              value={data.account}
              type='text'
              placeholder='请输入记录账号'
            />
          </View>
          <View style={st.rowView as CSSProperties}>
            <Text style={st.text}>口令:</Text>
            <Input
              style={st.input}
              name="cipherCode"
              value={data.cipherCode}
              type='text'
              password={this.state.hidePassword}
              placeholder='请输入安全口令'
            />
          </View>
          <View style={st.rowView as CSSProperties}>
            <Text style={st.text}>类型:</Text>
            <Picker mode='selector' rangeKey="label" range={this.state.selector} onChange={this.onChange}>
              <View style={st.input} className='picker'>
                {Type[data.accountType || 1]}
              </View>
            </Picker>
          </View>
          <View style={st.rowView as CSSProperties}>
            <Text style={st.text}>备注:</Text>
            <Input
              style={st.input}
              name="remark"
              value={data.remark}
              type='text'
              placeholder='请输入备注'
            />
          </View>
          <View style={st.rowView as CSSProperties}>
            <Text style={st.text}>创建时间:</Text>
            <Input
              style={st.input}
              name="createTime"
              value={data.createTime}
              type='text'
              disabled
            />
          </View>
          <View style={st.rowView as CSSProperties}>
            <Text style={st.text}>最后修改时间:</Text>
            <Input
              style={st.input}
              name="updateTime"
              value={data.updateTime}
              type='text'
              disabled
            />
          </View>
          <Button className="button" type='primary' formType="submit" sendMessageTitle=''>保存</Button>
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
    marginVertical: '5px'
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
};
