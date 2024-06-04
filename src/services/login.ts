import type { LoginResult } from '@/types/menber'
import { http } from '@/utils/http'
type LoginParams = {
  code: string
  encryptedData: string
  iv: string
}
/**
 *小程序登录
 * @param data 请求参数
 * @returns
 */
export const postLoginWxMinAPI = (data: LoginParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}
//
/**
 *小程序登录——内测版
 * @param phoneNumber 模拟手机号码
 * @returns
 */
//POST/login/wxMin/simple
export const postLoginWxMinSimpleAPI = (phoneNumber: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}
