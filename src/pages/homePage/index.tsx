import Taro, { Component, Config } from '@tarojs/taro';
import {View, Button, Text, ScrollView, Image} from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import './index.less';
import { AccountStore } from './store';
import { Type } from './entity';
import { CSSProperties } from 'react';

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
    enablePullDownRefresh: true
  };

  componentWillMount () { }

  componentDidMount () {
    Taro.startPullDownRefresh();
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  // 下拉刷新
  onPullDownRefresh = async () => {
    Taro.showNavigationBarLoading();
    const { AccountStore } = this.injected;
    const { getList } = AccountStore;
    await getList();
    Taro.hideNavigationBarLoading();
    Taro.stopPullDownRefresh();
  };

  public _click = (item: Account.Account) => {
    const { getDetail } = this.injected.AccountStore;
    const url = `/pages/homePage/components/Detail`;
    getDetail(item.id);
    Taro.navigateTo({
      url
    });
  };

  public _add = () => {
    const url = `/pages/homePage/components/Detail`;
    Taro.navigateTo({
      url
    });
  };

  render () {
    const { AccountStore } = this.injected;
    const { accountList } = AccountStore;
    const  _url = require('../../assets/images/arrow.png');
    const list = accountList.map((item) =>
      <View onClick={() => this._click(item)} key={item.id} style={st.card as CSSProperties}>
        <View style={st.warpper as CSSProperties}>
          <View style={st.rowSt as CSSProperties}>
            <Text style={st.titleText}>{item.name}</Text>
            <Text style={st.typeText}>类型: {Type[item.accountType]}</Text>
          </View>
          <View style={st.rowSt as CSSProperties}>
            <Text style={st.text}>创建时间: {item.createTime}</Text>
            <Text style={st.text}>修改时间: {item.updateTime}</Text>
          </View>
        </View>
        <View style={{ marginLeft: '10px', marginRight: '10px' }}>
          <Image style={st.img} src={_url}/>
        </View>
      </View>
    );
    return (
      <View style={st.mainSt as CSSProperties}>
        <View style={st.add as CSSProperties}>
          <Text style={st.title}>新增数据</Text>
          <Button onClick={this._add} style={st.btn as CSSProperties}>新增</Button>
        </View>
        <View style={st.view as CSSProperties}>
          <Text style={st.title}>我的记录</Text>
          <ScrollView style={{ display: 'flex', flex: 1 }}>
            {list}
          </ScrollView>
        </View>
      </View>
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
  add: { 
    height: '100px',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column'
  },
  title: { 
    fontSize: '18px',
    marginLeft: '15px'
  },
  btn: { 
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '35px',
    border: 'none',
    height: '36px',
    width: '95%',
    margin: '5px',
    fontSize: '18px',
    color: '#FFF',
    background: '#77BEEB',
 },
  view: { 
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column'
  },
  card: { 
    backgroundColor: '#ffffff',
    borderWidth: '0.5px',
    border: 'solid',
    borderRadius: '5px',
    borderColor: '#EEE',
    margin: '8px',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '120px' 
  },
  warpper: { 
    flex: 1,
    height: '95%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    marginLeft: '10px',
    marginRight: '10px' 
  },
  rowSt: { 
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleText: { 
    fontSize: '15px',
    marginLeft: '10px',
    color: '#333'
  },
  typeText: { 
    fontSize: '12px',
    marginRight: '10px',
    color: '#999'
  },
  text: { 
    fontSize: '10px',
    marginLeft: '10px',
    color: '#999'
  },
  img: { 
    width: '16px',
    height: '25px',
    backgroundColor: '#FFF'
  },
};
