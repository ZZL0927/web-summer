
interface BaseRes {
  stat: string
}
async function request<T extends BaseRes>(method: string, url: string, data?: any) {
  let spin = document.querySelector('.spin') as HTMLElement
  spin.style.display = 'block'
  const option: RequestInit = {
    method,
    credentials: "include"
  }
  if (data) {
    option.headers = {
      'Content-Type': 'application/json; charset=utf-8'
    }
    option.body = JSON.stringify(data)
  }
  const res = await fetch(url, option)
  const json: T= await res.json()
  if (!window.location.pathname.includes('login') && json.stat === "ERR_USER_NOT_LOGIN") {
    window.location.replace('/login');
    return Promise.reject('Unauthorized.');
  }
  spin.style.display = 'none'
  return json
}
export function get<T extends BaseRes>(url: string) {
  return request<T>('GET', url)  
}
export function post<T extends BaseRes>(url: string, data?: any) {
  return request<T>('POST', url, data)
}