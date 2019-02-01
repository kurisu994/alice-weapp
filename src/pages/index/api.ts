import http from '../../utils/http';
import host from '../../API/HOST';
import request from '../../utils/http/index_';

type P<T> = Promise<request.ParseResult<T>>;

export function auth(code: string): P<string> {
  return http.get(`${host.base}/user/auth/wx`, { 
    params: { code },
    auth: false
   });
}

export function login(param: Login.LoginInfo): P<string> {
  return http.post(`${host.base}/user/auth/login`,
  { ...param,}, 
  {
    auth: false,
    header: { "content-type": "application/x-www-form-urlencoded" } 
  });
}