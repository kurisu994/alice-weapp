export import Taro from '@tarojs/taro'

export async function login() {
  const _auth = await Taro.login();
}
