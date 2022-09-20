export const setStorage = (key, value) => { // 存储
  localStorage.setItem(key, value)
}
export const getStorage = (key) => {
  localStorage.getItem(key)
}
export const removeStorage = (key) => {
  localStorage.removeItem(key)
}
