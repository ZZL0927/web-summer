import * as request from './request'
import { ICapsule, ICapsuleRes } from '../scripts/types'

export function getCapsule (id: string) {
  return request.get<ICapsuleRes>('/api/get?id=' + id)
}
export function putCapsule (data: ICapsule) {
  return request.post<ICapsuleRes>('/api/add', { ...data })
}
