import { globalState } from '../store';
import { Dispatch } from 'redux';
import Taro from '@tarojs/taro';
import { setToken } from '../store/actions/user';


interface Params {
  [key: string]: any;

  /**
   * 门店ID
   */
  shopId?: number;
  /**
   * 分享token
   */
  shareToken?: string;
}

type SceneCallback = ((data: Params) => void);

export default class Handler {

  static handleShop(dispatch: Dispatch, params: Params): void {
    Handler.handleToken(dispatch);
    let shopId;
    if (params && (shopId = params.shopId)) {
      dispatch(globalState().shop.setShopId(shopId));
    }
  }

  static handleCollectUser(params?: Params): void {
    let shopId, userId;
    if (params && (shopId = params.shopId) && (userId = params.userId)) {
      // @ts-ignore
      globalState().share.collectUser({
        shopId,
        recommendUserId: userId
      });
    }
  }

  static async handleScene(dispatch: Dispatch, params: Params, callback?: SceneCallback, needCollect: boolean = true): Promise<void> {
    let scene;
    if (params && (scene = params.scene)) {
      const data: Params | null = await globalState().share.getSceneData(dispatch, decodeURIComponent(scene));
      if (!data) {
        return;
      }
      if (data.shareToken) {
        globalState().share.setShareToken(await globalState().share.combineShareToken(data.shareToken));
      }
      Handler.handleShop(dispatch, data);
      if (needCollect) {
        Handler.handleCollectUser(data);
      }
      callback && callback(data);
    }
  }

  static async handleToken(dispatch: Dispatch): Promise<void> {
    const token = await Taro.getStorage({ key: 'token' });
    if (token) {
      dispatch(setToken(token.data));
    }
  }

}