// export const getUser = () => {

// }
/**
 * export 也是用来导出,他支持导出多个成员
 * 它的好处就是,支持按需加载,需要谁加载谁,打包的时候(npm run build) 对于没有使用不会处理有利于优化处理
 */
const localStorage = window.localStorage
const USER_KEY = 'user_info'

export function getUser () {
  return JSON.parse(localStorage.getItem(USER_KEY))
}

export function saveUser (data) {
  localStorage.setItem(USER_KEY, JSON.stringify(data))
}

export function removeUser () {
  localStorage.removeItem(USER_KEY)
}
