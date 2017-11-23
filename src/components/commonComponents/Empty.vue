<template>
    <div>
        <!-- 暂无匹配车源 -->
        <div class="empty text-center" v-if="type == 'noTruck'">
            <img src="../../../static/img/empty_icon1.png" class="icon">
            <p class="tips">暂无匹配车源</p>
             <p class="sub_tips">没要您要找的车源哦，换个条件试试</p>
        </div>
        <!-- 暂无匹配车源 -->
        <!-- 未发布货源 -->
        <div class="empty text-center" v-else-if="type == 'noPublishGoods'">
            <img src="../../../static/img/empty_icon2.png" class="icon">
            <p class="tips">您还没发布过货源哟</p>
             <p class="sub_tips">点击发布按钮，把你的货物发出来吧~</p>
        </div>  
        <!-- 未发布货源 -->
        <!-- 无匹配货源 -->
        <div class="empty text-center" v-else-if="type == 'noGoods'">
            <img src="../../../static/img/empty_icon3.png" class="icon">
            <p class="tips">暂无匹配货源</p>
            <p class="sub_tips">没要您要找的货源哦，换个条件试试</p>
        </div>
        <!-- 无匹配货源 -->
        <!-- 没有消息 -->
        <div class="empty text-center" v-else-if="type == 'noMsg'">
            <img src="../../../static/img/empty_icon4.png" class="icon">
            <p class="tips">您还没有消息</p>
             <p class="sub_tips">暂时还没有消息哦</p>
        </div>  
        <!-- 没有消息 -->
        <!-- 暂无数据 -->
        <div class="empty text-center" v-else-if="type == 'noData'">
            <img src="../../../static/img/empty_icon5.png" class="icon">
            <p class="tips">暂无数据</p>
        </div> 
        <!-- 暂无数据 -->
        <!-- 认证信息正在审核中 -->
        <div class="empty text-center" v-else-if="type == 'Authing'">
            <img src="../../../static/img/empty_icon6.png" class="icon">
            <p class="tips">认证信息正在审核中</p>
            <p class="sub_tips">我们的客服人员正在加紧审核中 请稍等片刻</p>
        </div>
        <!-- 认证信息正在审核中 -->
        <!-- 认证信息失败 -->
        <div class="empty text-center" v-else-if="type == 'authFailed'">
            <img src="../../../static/img/empty_icon7.png" class="icon">
            <p class="tips">认证信息失败</p>
            <p class="sub_tips">看看哪里出了问题?</p>
            <p><button class="authenticationBtn">重新认证</button></p>
        </div>
        <!-- 认证信息失败 -->
        <!-- 无认证 -->
        <div class="empty text-center" v-else-if="type == 'noAuth'">
            <img src="../../../static/img/empty_icon8.png" class="icon">
            <p class="tips">你竟然没有认证信息?</p>
            <p class="sub_tips">马上认证,多多资源在等你</p>
            <p><button class="authenticationBtn">提交认证</button></p>
        </div>
        <!-- 无认证 -->
    </div>
</template>
<script>
    export default{
        props: {
            type: {
                type: String,
                default: 'noData'
            }
        },
        data() {
            return {

            }
        }
    }
</script>
<style lang="stylus" scoped>
.empty
    padding 40px 0 80px
    .tips
        padding: 10px 0 15px
        font-weight bold
        font-size 16px
        color #666
    .sub_tips
        color #999
    .authenticationBtn
        height 28px
        line-height 28px
        border-radius 4px
        color #fff
        background #6cc
        padding 0 20px
        margin-top 10px
        cursor pointer
</style>
