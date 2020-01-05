<template>
  <div class="form2-tab">
    <div>
      <label for="keyword">搜索名:</label>
      <input type="text" v-model="form.keyword" id="keyword" />
    </div>
    <div>
      <input type="radio" v-model="form.sex" name="sex" id="woman" :value="0" />
      <label for="woman">女</label>
      <input type="radio" v-model="form.sex" name="sex" id="man" :value="1" />
      <label for="man">男</label>
    </div>
    <p>
      {{ form }}
    </p>
  </div>
</template>

<script>
import { initUrlData, initNextUrlData } from './js/initUrlData'

export default {
  name: 'Form2Tab',
  data() {
    return {
      form: {
        keyword: '',
        sex: 0,
      },
    }
  },
  created() {
    initUrlData.call(this, ['form'])
  },
  //回车/路由更新时强制更新
  beforeRouteEnter(to, from, next) {
    next(vm => {
      initNextUrlData.call(vm, ['form'], to)
    })
  },
  beforeRouteUpdate(to, from, next) {
    initNextUrlData.call(this, ['form'], to)
    next()
  },
}
</script>
