import * as request from './request'
import {IForm, ILogin,IRegister,IResult,IFormResult,IGetForm,IStarProblem} from '../types'
interface BaseRes {
  stat: string
}
interface PwdRes extends BaseRes{
  msg?:string
}
interface LoginRes extends BaseRes {
  msg?:string
}
interface RegisterRes extends BaseRes {
  msg?:string
  data?: {
    id:string
  }
}
interface UserInfo extends BaseRes {
  data: {
    user: {
        id: string,
        account: string,
        pwd: string,
        status: number,
        ctime: number,
        utime: number,
        nickname: string,
        avatar: string
    }
}
}
interface ListType extends BaseRes{
  data:{
    problemTypes:{title:string,type:string}[]
  }
}
interface BasicType extends BaseRes{
  data:{
    basicProblems:{
      id:string,
      type:string,
      title:string,
      required:boolean,
      setting:null|{
        options:{
          id:string,
          title:string,
          status:string
        }[]
      }
    }[]
  }
}
interface CreateFormRes extends BaseRes{
  msg?:string, 
  data?:{
    id:string
  }
}
interface FormRListes extends BaseRes{
  data:{
    items:{
      id: string,
      ctime: number,
      utime: number,
      status: number,
      author: string,
      isStar: boolean,
      title: string,
      subTitle: string,
      problems?: {
        id:string,
        title:string,
        type: string,
        required: boolean,
        isNew: boolean
    }[]
    }[],
    total:number
  }
}
interface ListStar extends BaseRes{
  data:{
    items:IStarProblem[]
  }
}
interface FormResult {
  stat:string,
  data:IFormResult
}
interface IInfo {
  nickname:string,
  avatar:string
}
interface IPwd {
  oldPwd:string,
  pwd:string,
  confirmPwd:string
}
interface GetFormRes extends BaseRes{
  data:{
    item:IGetForm
  }
}
// 登录
export function login(data: ILogin) {
  return request.post<LoginRes>('/api/auth/login', data)
}
// 退出登录
export function logout() {
  return request.post<BaseRes>('/api/auth/logout')
}
// 设置用户信息
export function setInfo(data:IInfo) {
  return request.post<BaseRes>('/api/user/setInfo',data)
}
// 修改密码
export function changePwd(data:IPwd) {
  return request.post<PwdRes>('/api/user/changePwd',data)
}
// 注册
export function register(data: IRegister) {
  return request.post<RegisterRes>('/api/auth/register', data)
}
// 创建表单
export function createForm(data: IForm) {
  return request.post<CreateFormRes>('/api/form/create', data)
}
// 收藏题目
export function collectProblem(data: {problem:{}}) {
  return request.post<CreateFormRes>('/api/problem/star', data)
}
// 获取常用题
export function getListStar() {
  return request.post<ListStar>('/api/problem/listStar')
}
// 删除常用题
export function deleteStar(data:{id:string}) {
  return request.post<BaseRes>('/api/problem/cancelStar',data)
}
// 获取表单列表
export function getFormList(data: {
  offset?: number
  limit?: number
  isStar?: boolean}) {
  return request.post<FormRListes>('/api/form/list', data)
}
// 标星
export function starForm(data: {id:string}) {
  return request.post<BaseRes>('/api/form/star', data)
}
// 取消标星
export function cancelStarForm(data: {id:string}) {
  return request.post<BaseRes>('/api/form/cancelStar', data)
}
// 删除表单
export function deleteForm(data: {id:string}) {
  return request.post<BaseRes>('/api/form/delete', data)
}
// 开始收集表单
export function startForm(data: {id:string}) {
  return request.post<BaseRes>('/api/form/start', data)
}
// 结束收集表单
export function endForm(data: {id:string}) {
  return request.post<BaseRes>('/api/form/end', data)
}
// 获取表单详情
export function getForm(data: {id:string}) {
  return request.post<GetFormRes>('/api/form/get', data)
}
// 提交填写表单
export function postInput(data: {formId:string,problems:IResult[]}) {
  return request.post<BaseRes>('/api/form/input', data)
}
// 获取表单填写数量
export function getInputForm(id:string) {
  return request.get<FormResult>(`/api/form/formResult/${id}`)
}
// 获取用户信息
export function getUserInfo() {
  return request.get<UserInfo>('/api/user/getInfo')
}
// 获取题型列表
export function getListType() {
  return request.get<ListType>('/api/problem/listType')
}
// 获取用户的常用题
export function getBasicList() {
  return request.get<BasicType>('/api/problem/listBasic')
}
