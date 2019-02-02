import Taro, { Component, Config } from '@tarojs/taro';
import {View, Button, Text, ScrollView, Image} from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import './index.less';
import { AccountStore } from './store';

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
    navigationBarTitleText: '主页',
  };

  componentWillMount () { }

  componentDidMount () {
    const { AccountStore } = this.injected;
    const { getList } = AccountStore;
    getList();
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  public _click = (item: Account.Account) => {
    Taro.showToast({ title: `点击${item.name}`, icon: 'none' });
  };

  public _add = () => {
    Taro.showToast({ title: '点击新增按钮', icon: 'none' });
  };


  render () {
    const { AccountStore } = this.injected;
    const { accountList } = AccountStore;
    const  _url = require('../../assets/images/arrow.png');
    const list = accountList.map((item) =>
      <View onClick={() => this._click(item)} key={item.id} style={{ backgroundColor: '#ffffff', borderWidth: 'thin',border: 'solid', borderRadius: '5px',borderColor: '#EEE',margin: '8px', display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '120px' }}>
        <View style={{ flex: 1, height: '95%', display: 'flex', justifyContent: 'space-around',flexDirection: 'column' ,marginLeft: '10px', marginRight: '10px' }}>
          <View style={{ display: 'flex', justifyContent: 'space-between',flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: '15px', marginLeft: '10px', color: '#333' }}>{item.name}</Text>
            <Text style={{ fontSize: '12px', marginRight: '10px', color: '#999' }}>类型:{item.accountType}</Text>
          </View>
          <View style={{ display: 'flex', justifyContent: 'space-between',flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: '10px', marginLeft: '10px', color: '#999' }}>创建时间: {item.createTime}</Text>
            <Text style={{ fontSize: '10px', marginRight: '10px', color: '#999' }}>修改时间: {item.updateTime}</Text>
          </View>
        </View>
        <View style={{ marginLeft: '10px', marginRight: '10px' }}>
          <Image style={{ width: '16px', height: '25px', backgroundColor: '#FFF' }} src={_url}/>
        </View>
      </View>
    );
    return (
      <View style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
        <View style={{ height: '100px', display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
          <Text style={{ fontSize: '18px', marginLeft: '15px' }}>新增数据</Text>
          <Button onClick={this._add} style={{ textAlign: 'center', verticalAlign: 'middle',lineHeight: '35px', border: 'none',height: '36px', width: '95%', margin: '5px', backgroundColor: '#7cbcff',fontSize: '18px', color: '#3a77ff'}}>新增</Button>
        </View>
        <View style={{ flex: 1,display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
          <Text style={{ fontSize: '18px', marginLeft: '15px' }}>我的记录</Text>
          <ScrollView style={{ display: 'flex', flex: 1 }}>
            {list}
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default HomePage;
