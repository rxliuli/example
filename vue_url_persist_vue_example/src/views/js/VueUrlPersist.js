import { debounce, get, set } from './common'

/**
 * 插件的类型
 */
export class VueUrlPersist {
  /**
   * 一些选项
   */
  constructor() {
    this.expListName = 'exps'
    this.urlPersistName = 'qb'
  }

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
  initVueData(vm, expOrFn, urlData) {
    const oldVal = get(vm, expOrFn, null)
    const newVal = urlData[expOrFn]
    if (oldVal === undefined || oldVal === null) {
      set(vm, expOrFn, newVal)
    } else if (typeof oldVal === 'object' && newVal !== undefined) {
      Object.assign(get(vm, expOrFn), newVal)
    }
  }
  /**
   * 在组件被 vue-router 路由复用时，单独进行初始化数据
   * @param vm
   * @param expOrFnList
   * @param route
   */
  initNextUrlData(vm, expOrFnList, route) {
    const urlData = JSON.parse(route.query[this.urlPersistName] || '{}')
    console.log('urlData: ', urlData)
    expOrFnList.forEach(expOrFn => {
      this.initVueData(vm, expOrFn, urlData)
    })
  }

  /**
   * 在组件被 vue 创建后初始化数据并监听之，在发生变化时自动序列化到 URL 上
   * 注：需要序列化到 URL 上的数据必须能被 JSON.stringfy 序列化
   * @param vm
   * @param expOrFnList
   */
  initUrlData(vm, expOrFnList) {
    const urlData = JSON.parse(vm.$route.query[this.urlPersistName] || '{}')
    expOrFnList.forEach(expOrFn => {
      this.initVueData(vm, expOrFn, urlData)

      vm.$watch(
        expOrFn,
        debounce(1000, async val => {
          console.log('val 变化了: ', val)
          urlData[expOrFn] = val

          if (
            vm.$route.query[this.urlPersistName] === JSON.stringify(urlData)
          ) {
            return
          }

          await vm.$router.replace({
            query: {
              ...vm.$route.query,
              [this.urlPersistName]: JSON.stringify(urlData),
            },
          })
        }),
        {
          deep: true,
        },
      )
    })
  }
  install(Vue, options = {}) {
    const _this = this
    if (options.expListName) {
      this.expListName = options.expListName
    }
    if (options.urlPersistName) {
      this.urlPersistName = options.urlPersistName
    }
    Vue.prototype.$urlPersist = this

    function initDataByRouteUpdate(to) {
      const expList = this[_this.expListName]
      if (Array.isArray(expList)) {
        this.$urlPersist.initNextUrlData(this, expList, to)
      }
    }

    Vue.mixin({
      created() {
        const expList = this[_this.expListName]
        if (Array.isArray(expList)) {
          this.$urlPersist.initUrlData(this, expList)
        }
      },
      beforeRouteUpdate(to, from, next) {
        initDataByRouteUpdate.call(this, to)
        next()
      },
      beforeRouteEnter(to, from, next) {
        next(vm => initDataByRouteUpdate.call(vm, to))
      },
    })
  }
}

export default VueUrlPersist
