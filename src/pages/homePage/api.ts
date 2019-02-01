import http from '../../utils/http';
import host from '../../API/HOST';
import request from '../../utils/http/index_';

type P<T> = Promise<request.ParseResult<T>>;

export function list(): P<Array<Account.Account>> {
  return http.get(`${host.base}/account/list`);
}
