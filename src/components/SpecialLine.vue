<template>
	<div>
	</div>
</template>
<script>
	export default {
		created() {
			this.$store.commit({type:'selectChange',selected:4});
		},
		components: {
		}
	}
</script>
<style lang="stylus" scoped>

</style>