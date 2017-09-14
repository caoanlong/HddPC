<template>
  	<div id="app">
  		<HeaderTop></HeaderTop>
    	<router-view></router-view>
    	<SiteBottom></SiteBottom>
    	<Message></Message>
  	</div>
</template>

<script>
import HeaderTop from './components/commonComponents/HeaderTop'
import SiteBottom from './components/commonComponents/Footer'
import Message from './components/commonComponents/Message'
export default {
  // data() {
  //   return {
  //     constList: []
  //   }
  // },
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
		SiteBottom,
		Message
	}
}
</script>

<style lang="stylus" scoped>
</style>
