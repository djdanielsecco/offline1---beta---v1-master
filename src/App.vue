<template>
  <div id="app">
    <div id="nav">
    
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}
#nav {
  padding: 30px;
    background-color: white;
  a {
    font-weight: bold;
    
    &.router-link-exact-active {
     
    }
  }
}
</style>
