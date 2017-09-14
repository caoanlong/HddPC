<template>
	<div>
		<div class="content">
			<div class="page-w">
    			<div class="clearfix">
                    <div class="lside">
                        <div class="title">用户中心</div>
                        <ul class="sideNav">
                            <li name="1">
                                <div>我的车队</div>
                                <ul class="subMenu">
                                    <router-link :to="{name: 'OwnTruck',query:{active:11}}" tag="li" name="1-MyFleet" :class="{'active':$route.query.active==11}">自有车</router-link>
                                    <router-link :to="{name: 'AffiliatedTruck',query:{active:12}}" tag="li" name="2-MyFleet" :class="{'active':$route.query.active==12}">挂靠车</router-link>
                                    <router-link :to="{name: 'FamiliarTruck',query:{active:13}}" tag="li" name="3-MyFleet" :class="{'active':$route.query.active==13}">熟车</router-link>
                                </ul>
                            </li>
                            <li name="2">
                                <div>货源管理</div>
                                <ul class="subMenu">
                                    <router-link :to="{name: 'PublishInfo',query:{active:21}}" tag="li" name="2-PublishInfo" :class="{'active':$route.query.active==21}">发布货源</router-link>
                                    <router-link :to="{name: 'OftenPublish',query:{active:22}}" tag="li" name="2-OftenPublish" :class="{'active':$route.query.active==22}">常发货源</router-link>
                                </ul>
                            </li>
                            <li name="3">
                                <div>用户资料</div>
                                <ul class="subMenu">
                                    <router-link :to="{name: 'UserInfo',query:{active:31}}" tag="li" name="3-UserInfo" :class="{'active':$route.query.active==31}" v-if="isAuthed">用户信息</router-link>
                                    <router-link :to="{name: 'CompleteInfo',query:{active:32}}" tag="li" name="3-CompleteInfo" :class="{'active':$route.query.active==32}" v-else-if="!isAuthed">完善信息</router-link>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="rside">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeName: '3-CompleteInfo',
                openNames: ['3'],
            }
        },
        created() {
            this.$store.commit({type:'selectChange',selected:-1});
        },
        computed: {
            isAuthed() {
                return this.$store.state.memberInfo.certifyStatus == 'Y'
            }
        },
        methods: {
            selectMenu(name) {
                var a = name.split('-');
                var b = [];
                b.push(a[0])
                this.activeName = name;
                this.openNames = b;
                this.$router.push({name:a[1]});
            }
        },
        components: {
        }
    }
</script>
<style lang="stylus" scoped>
   .content
        background #f6f6f6
        padding 10px 0 30px
        .lside
            width 240px
            float left
            .title
                height 40px
                line-height 40px
                border-bottom 1px solid #f0f0f0
                background #fff
                border-radius 4px 4px 0 0
                padding 0 20px
                font-size 14px
                font-weight bold
                color #878787
            .sideNav
                background #fff
                border-radius 0 0 4px 4px
                padding  10px 20px
                li
                    line-height 40px
                    cursor pointer
                    color #878787
                    div
                        font-weight bold
                        padding 0 15px 0 10px
                        position relative
                        &:before
                            content ''
                            width 4px
                            height 12px
                            background #6cc
                            display block
                            position absolute
                            left 0
                            top 14px
                    ul
                        li
                            padding-left 20px
                            line-height 30px
                            &:hover
                            &.active
                                color #6cc
                        
        .rside
            width 1030px
            float right
            background #fff
</style>