const charOrNumberSet = new Set(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
)
/**
 * 判断按下的键是否为数字或英文字符
 * @param key 按键的值
 */
export function isCharOrNumber(key: string) {
  return charOrNumberSet.has(key)
}
