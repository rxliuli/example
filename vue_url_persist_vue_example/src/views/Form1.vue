<template>
  <div class="form1">
    <div>
      <label for="keyword">搜索名:</label>
      <input type="text" v-model="form.keyword" id="keyword" />
    </div>
    <div>
      <input
        type="checkbox"
        v-model="form.hobbyList"
        id="anime"
        value="anime"
      />
      <label for="anime">动画</label>
      <input type="checkbox" v-model="form.hobbyList" id="game" value="game" />
      <label for="game">游戏</label>
      <input
        type="checkbox"
        v-model="form.hobbyList"
        id="movie"
        value="movie"
      />
      <label for="movie">电影</label>
    </div>
    <p>
      {{ form }}
    </p>
  </div>
</template>

<script>
import { initUrlData, initNextUrlData } from './js/initUrlData'

export default {
  name: 'Form1',
  data() {
    return {
      form: {
        keyword: '',
        hobbyList: [],
      },
    }
  },
  created() {
    //TODO vue router 在 hash 模式下不会处理 # 之前正常的 query param
    initUrlData.call(this, ['form'])
  },
  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate URL 变化了')
    initNextUrlData.call(this, ['form'], to)
    next()
  },
}
</script>
