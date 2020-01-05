import { debounce, get, set } from './common'

class VueUrlPersist {
  /**
   * 一些选项
   */
  constructor({ key = 'qb' } = {}) {
    this.key = key
  }

  /**
   * 为 vue 实例上的字段进行深度赋值
   */
  setInitData(vm, exp, urlData) {
    const oldVal = get(vm, exp, null)
    const newVal = urlData[exp]
    //如果原值是对象且新值也是对象，则进行浅合并
    if (
      oldVal === undefined ||
      oldVal === null ||
      typeof oldVal === 'string' ||
      typeof oldVal === 'number'
    ) {
      set(vm, exp, newVal)
    } else if (typeof oldVal === 'object' && typeof newVal === 'object') {
      Object.assign(get(vm, exp), newVal)
    }
  }
  /**
   * 初始化一些数据需要序列化/反序列化到 url data 上
   * @param vm vue 实例
   * @param exps 监视的数据的表达式数组
   */
  initUrlDataByCreated(vm, exps) {
    const key = this.key
    const urlData = JSON.parse(vm.$route.query[key] || '{}')
    exps.forEach(exp => {
      this.setInitData(vm, exp, urlData)
      vm.$watch(
        exp,
        debounce(function(val) {
          urlData[exp] = val
          if (vm.$route.query[key] === JSON.stringify(urlData)) {
            return
          }
          vm.$router.replace({
            query: {
              ...vm.$route.query,
              [key]: JSON.stringify(urlData),
            },
          })
        }, 1000),
        {
          deep: true,
        },
      )
    })
  }

  /**
   * 在组件被 vue-router 路由复用时，单独进行初始化数据
   * @param vm vue 实例
   * @param exps 监视的数据的表达式数组
   * @param route 将要改变的路由对象
   */
  initUrlDataByRouteUpdate(vm, exps, route) {
    const urlData = JSON.parse(route.query[this.key] || '{}')
    exps.forEach(exp => this.setInitData(vm, exp, urlData))
  }

  /**
   * 生成可以 mixin 到 vue 实例的对象
   * @param exps 监视的数据的表达式数组
   * @returns {{created(): void, beforeRouteEnter(*=, *, *): void, beforeRouteUpdate(*=, *, *): void}}
   */
  generateInitUrlData(...exps) {
    const _this = this
    return {
      created() {
        _this.initUrlDataByCreated(this, exps)
      },
      beforeRouteUpdate(to, from, next) {
        _this.initUrlDataByRouteUpdate(this, exps, to)
        next()
      },
      beforeRouteEnter(to, from, next) {
        console.log('beforeRouteEnter')
        next(vm => _this.initUrlDataByRouteUpdate(vm, exps, to))
      },
    }
  }

  /**
   * 修改一些配置
   * @param options 配置项
   */
  config(options) {
    Object.assign(this, options)
  }
}
const vueUrlPersist = new VueUrlPersist()
const generateInitUrlData = vueUrlPersist.generateInitUrlData.bind(
  vueUrlPersist,
)

export { vueUrlPersist, generateInitUrlData, VueUrlPersist }

export default vueUrlPersist
