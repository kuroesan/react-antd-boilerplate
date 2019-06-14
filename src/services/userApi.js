import request from '@/utils/request';

// 用户登录.
export async function authLogin(params) {
  return request('/api/auth/login', {
    method: 'POST',
    authorization: 'false',
    body: {
      ...params
    },
  });
}