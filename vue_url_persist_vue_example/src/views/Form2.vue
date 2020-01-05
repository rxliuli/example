<template>
  <div class="form2">
    <header>
      <RouterLink to="/form2/1">第一个 Tab</RouterLink>
      <RouterLink to="/form2/2">第二个 Tab</RouterLink>
    </header>
    <!--如果有子路由则必须设置该属性-->
    <RouterView :key="$route.path" />
  </div>
</template>
<script>
export default {
  name: 'Form2',
}
</script>
