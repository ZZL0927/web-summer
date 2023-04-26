import * as request from './request'
import { IListRes , IMsg } from '../types'

export function list() {
  return request.post<IListRes>('/api/list')
}
export function create(content:string) {
  return request.post<IMsg>('/api/create',{content})
}
export function cancel(id:string) {
  return request.post<IMsg>('/api/cancel',{id})
}
export function done(id:string) {
  return request.post<IMsg>('/api/done',{id})
}
export function deleteTodo(id:string) {
  return request.post<IMsg>('/api/delete',{id})
}
