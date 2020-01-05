/**
 * 解析字段字符串为数组
 * @param str 字段字符串
 * @returns 字符串数组，数组的 `[]` 取法会被解析为数组的一个元素
 */
function parseFieldStr(str) {
  return str
    .split(/[\\.\\[]/)
    .map(k => (/\]$/.test(k) ? k.slice(0, k.length - 1) : k))
}

/**
 * 安全的深度获取对象的字段
 * TODO 该函数尚处于早期测试阶段
 * 注: 只要获取字段的值为 {@type null|undefined}，就会直接返回 {@param defVal}
 * 类似于 ES2019 的可选调用链特性: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/%E5%8F%AF%E9%80%89%E9%93%BE
 * @param obj 获取的对象
 * @param fields 字段字符串或数组
 * @param [defVal] 取不到值时的默认值，默认为 null
 */
export function get(obj, fields, defVal = null) {
  if (typeof fields === 'string') {
    fields = parseFieldStr(fields)
  }
  let res = obj
  for (const field of fields) {
    try {
      res = Reflect.get(res, field)
      if (res === undefined || res === null) {
        return defVal
      }
    } catch (e) {
      return defVal
    }
  }
  return res
}

/**
 * 安全的深度设置对象的字段
 * TODO 该函数尚处于早期测试阶段
 * 注: 只要设置字段的值为 {@type null|undefined}，就会直接返回 {@param defVal}
 * 类似于 ES2019 的可选调用链特性: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/%E5%8F%AF%E9%80%89%E9%93%BE
 * @param obj 设置的对象
 * @param fields 字段字符串或数组
 * @param [val] 设置字段的值
 */
export function set(obj, fields, val) {
  if (typeof fields === 'string') {
    fields = parseFieldStr(fields)
  }
  let res = obj
  for (let i = 0, len = fields.length; i < len; i++) {
    const field = fields[i]
    if (i === len - 1) {
      res[field] = val
      return true
    }
    res = res[field]
    if (typeof res === 'object') {
      return false
    }
  }
  return false
}

/**
 * 函数去抖
 * 去抖 (debounce) 去抖就是对于一定时间段的连续的函数调用，只让其执行一次
 * 注: 包装后的函数如果两次操作间隔小于 delay 则不会被执行, 如果一直在操作就会一直不执行, 直到操作停止的时间大于 delay 最小间隔时间才会执行一次, 不管任何时间调用都需要停止操作等待最小延迟时间
 * 应用场景主要在那些连续的操作, 例如页面滚动监听, 包装后的函数只会执行最后一次
 * 注: 该函数第一次调用一定不会执行，第一次一定拿不到缓存值，后面的连续调用都会拿到上一次的缓存值。如果需要在第一次调用获取到的缓存值，则需要传入第三个参数 {@param init}，默认为 {@code undefined} 的可选参数
 * 注: 返回函数结果的高阶函数需要使用 {@see Proxy} 实现，以避免原函数原型链上的信息丢失
 *
 * @param delay 最小延迟时间，单位为 ms
 * @param action 真正需要执行的操作
 * @param init 初始的缓存值，不填默认为 {@see undefined}
 * @return 包装后有去抖功能的函数。该函数是异步的，与需要包装的函数 {@see action} 是否异步没有太大关联
 */
export function debounce(delay, action, init = null) {
  let flag
  let result = init
  return new Proxy(action, {
    apply(_, _this, args) {
      return new Promise(resolve => {
        if (flag) clearTimeout(flag)
        flag = setTimeout(
          () => resolve((result = Reflect.apply(_, _this, args))),
          delay,
        )
        setTimeout(() => resolve(result), delay)
      })
    },
  })
}
