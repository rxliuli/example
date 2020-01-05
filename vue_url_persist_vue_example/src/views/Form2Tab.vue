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
import { generateInitUrlData } from './js/VueUrlPersist'

export default {
  name: 'Form2Tab',
  mixins: [generateInitUrlData('form')],
  data() {
    return {
      form: {
        keyword: '',
        sex: 0,
      },
    }
  },
}
</script>
