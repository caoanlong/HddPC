<template>
    <div class="recommend">
        <div class="tit">推荐车辆</div>
            <router-link :to="{name:'TruckDetail'}" title="11111" ref="TruckFleet" class="recommendItem" v-for="i in 5" key="i">
                <div class="pic fl"><img src="../../../static/img/pic2.jpg" /></div>
                <div class="vehicleInfo fl">
                <p>贾坤 云A·12345</p>
                <p>高低平板全挂 17.5米 35吨</p>
                </div>
            </router-link>
    </div>
</template>
<script>
    export default {
        props: {
            truckStatus:{
                type: Number,
                default:3
            }
        },
        components: {
        }
    }
</script>
<style lang="stylus" scoped>
    .recommend
        background #fff
        border 1px solid #f0f0f0
        border-radius 4px
        padding:20px 20px 15px
        .tit
            background url('../../../static/img/recommend_tit_icon.png') no-repeat left center
            padding-left 30px
            height 34px
            line-height 34px
            display block
            color #6cc
            font-size 14px
            font-weight bold
        .recommendItem
            padding 10px 0 10px 60px
            height 70px
            border-bottom 1px solid #f0f0f0
            position relative
            display block
            background url('../../../static/img/viewBtn_icon.png') no-repeat right center
            &.last,&:last-child
                border-bottom none                      
            p
                line-height 24px
                color #666
            .pic
                width 50px
                height 50px
                position absolute
                left 0
                top 10px
                img
                    width 50px
                    height 50px
                    border-radius 8px
</style>