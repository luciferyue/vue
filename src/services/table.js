import request from '../utils/request';

export async function getTablelData(params) {
  console.log(params);
  return request('/api/getTableData', {
    data: params,
    method: 'post',
  });
}
