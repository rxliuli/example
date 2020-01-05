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
import { generateInitUrlData } from './js/VueUrlPersist'

export default {
  name: 'Form1',
  mixins: [generateInitUrlData('form')],
  data() {
    return {
      form: {
        keyword: '',
        hobbyList: [],
      },
    }
  },
}
</script>
