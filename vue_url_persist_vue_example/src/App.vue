<template>
  <div id="app">
    <div id="nav">
      <RouterLink to="/form1/">第一个表单</RouterLink>|
      <RouterLink to="/form2/">第二个表单</RouterLink>
    </div>
    <hr />
    <RouterView :key="$route.path" />
  </div>
</template>
