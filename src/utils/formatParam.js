
// 格式化请求参数
export default function formatParam(params) {
  let parameter = ''
  for (var key in params) {
    parameter += `${key}=${params[key]}&`
  }
  parameter = parameter.substr(0, parameter.length - 1)
  return parameter
}
