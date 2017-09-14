<template>
	<span class="star">
		<span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
	</span>
</template>
<script>
	export default {
		props: {
			score: {
				type: Number
			}
		},
		computed: {
			itemClasses(){
				if (this.score > 5) {
					this.score = this.score/2;
				};
        		let result = [];
        		let integer = Math.floor(this.score);
        		for(let i=0;i<integer;i++){
        			result.push("on");
        		}
        		if(this.score % 1 !== 0){
        			result.push("half");
        		}
        		while(result.length < 5){
        			result.push("off");
        		}
        		return result;
        	}
		},
		components: {
		}
	}
</script>
<style lang="stylus" scoped>
	.star
		display inline-block
		vertical-align middle
		.star-item
			display inline-block
			background-repeat no-repeat
			width 14px
			height 14px
			margin-right 2px
			background-size 100%
			&.on
				background-image url('../../assets/img/star_on.svg')
			&.half
				background-image url('../../assets/img/star_half.svg')
			&.off
				background-image url('../../assets/img/star_off.svg')
</style>