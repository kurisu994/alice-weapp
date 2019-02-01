import http from '../../utils/http';
import host from '../../API/HOST';
import request from '../../utils/http/index_';

type P<T> = Promise<request.ParseResult<T>>;

export function auth(code: string): P<string> {
  return http.get(`${host.base}/wx/auth/authentication`, { 
    params: { code },
    auth: false
   });
}