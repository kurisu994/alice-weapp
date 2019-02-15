import http from '../../utils/http';
import host from '../../API/HOST';
import request from '../../utils/http/index_';

type P<T> = Promise<request.ParseResult<T>>;

export function list(): P<Array<Account.Account>> {
  return http.get(`${host.base}/account/list`);
}

export function detail(id: number): P<Account.Detail> {
  return http.get(`${host.base}/account/detail`, {
     params: { id },
     data: undefined
  });
}
export function save(param: Account.Detail): P<any> {
  return http.post(`${host.base}/account/save`, { ...param, }, { data: undefined });
}

export function generator(): P<string> {
  return http.get(`${host.base}/password/create`, {
    params: { length: 12 },
    data: undefined
  });
}