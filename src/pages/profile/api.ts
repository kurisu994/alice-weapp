import http from '../../utils/http';
import host from '../../API/HOST';
import request from '../../utils/http/index_';

type P<T> = Promise<request.ParseResult<T>>;

export function temp(param: {}): P<string> {
  return http.post(`${host.base}/user/auth/login`,
  { ...param,}, 
  {
    auth: false,
    header: { "content-type": "application/x-www-form-urlencoded" } 
  });
}