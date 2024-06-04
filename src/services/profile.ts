import type { ProfileDetail, ProfileParams } from '@/types/menber'
import { http } from '@/utils/http'

//获取个人信息

export const getMemberProfileAPI = () => {
  return http<ProfileDetail>({
    method: 'GET',
    url: '/member/profile',
  })
}
/**
 *
 * @param data 请求体参数
 * @returns
 */
export const putMemberProfileAPI = (data: ProfileParams) => {
  return http<ProfileDetail>({
    method: 'PUT',
    url: '/member/profile',
    data,
  })
}
