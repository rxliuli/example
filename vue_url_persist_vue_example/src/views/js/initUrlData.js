import { set, get, debounce } from './common'

/**
 * 将 URL 上的数据初始化到 data 上
 * 此处存在一个谬误
 * 1. 如果对象不使用合并而是赋值，则处理 [干净] 的 URL 就会很棘手，因为无法感知到初始值是什么
 * 2. 如果对象使用合并，则手动输入的相同路由不同参数的 URL 就无法处理
 *    注：该问题已经通过在 watch 中判断值是否变化而解决，但总感觉还有莫名其妙的坑在前面等着。。。
 * @param _this
 * @param expOrFn
 * @param urlData
 */
function initVueData(_this, expOrFn, urlData) {
  const oldVal = get(_this, expOrFn, null)
  const newVal = urlData[expOrFn]
  if (oldVal === undefined || oldVal === null) {
    set(_this, expOrFn, newVal)
  } else if (typeof oldVal === 'object' && newVal !== undefined) {
    Object.assign(get(_this, expOrFn), newVal)
  }
}

/**
 * 在组件被 vue-router 路由复用时，单独进行初始化数据
 * @param expOrFnList
 * @param route
 */
export function initNextUrlData(expOrFnList, route) {
  const urlData = JSON.parse(route.query[initUrlData.urlDataKey] || '{}')
  console.log('urlData: ', urlData)
  const _this = this
  expOrFnList.forEach(expOrFn => {
    initVueData(_this, expOrFn, urlData)
  })
}

/**
 * 在组件被 vue 创建后初始化数据并监听之，在发生变化时自动序列化到 URL 上
 * 注：需要序列化到 URL 上的数据必须能被 JSON.stringfy 序列化
 * @param expOrFnList
 */
export function initUrlData(expOrFnList) {
  const urlData = JSON.parse(this.$route.query[initUrlData.urlDataKey] || '{}')
  console.log('urlData: ', urlData)
  const _this = this
  expOrFnList.forEach(expOrFn => {
    initVueData(_this, expOrFn, urlData)

    _this.$watch(
      expOrFn,
      debounce(1000, function(val) {
        console.log('val 变化了: ', val)
        urlData[expOrFn] = val

        if (
          _this.$route.query[initUrlData.urlDataKey] === JSON.stringify(urlData)
        ) {
          return
        }

        _this.$router.replace({
          query: {
            ..._this.$route.query,
            [initUrlData.urlDataKey]: JSON.stringify(urlData),
          },
        })
      }),
      {
        deep: true,
      },
    )
  })
}

initUrlData.urlDataKey = 'qb'
