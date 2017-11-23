<template>
  	<div id="app">
  		<HeaderTop></HeaderTop>
    	<router-view></router-view>
    	<SiteBottom></SiteBottom>
  	</div>
</template>

<script>
import HeaderTop from './components/commonComponents/HeaderTop'
import SiteBottom from './components/commonComponents/Footer'
export default {
  data() {
    return {
      constList: []
    }
  },
  // watch: {
  //   constList(newVal) {
  //     sessionStorage.setItem('constList',JSON.stringify(newVal));
  //     console.log('---系统常量已获取---');
  //   }
  // },
  // created() {
  //   if (!sessionStorage.getItem('constList')) {
  //     this.getConst();
  //   }
  // },
	components: {
		HeaderTop,
		SiteBottom
	}
}
</script>

<style lang="stylus" scoped>
</style>
