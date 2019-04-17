import request from '@/utils/request';
import formatParam from '@/utils/formatParam'

// get
export async function getMethod(params) {
  return request(`/api/v1/getmethod?${formatParam(params)}`)
}

// post
export async function postMethod(params) {
  return request('/api/v1/postmethod', {
    method: 'POST',
    body: {
      ...params
    },
  });
}
