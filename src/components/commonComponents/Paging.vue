<template>
    <!--Created by caoanlong on 2017/2/25-->
    <div>
        <div class="listFoot">
            <ul class="pagination">
                <li class="firstPage" :class="{'disabled': pageindex == 1 || pagecount == 0}" @click.stop="getpaging(1,pageindex === 1 || pagecount == 0)">
                    首页
                </li>
                <li class="prev" :class="{'disabled':pageindex==1 || pagecount==0}"
                    @click.stop="getpaging(pageindex-1,pageindex==1 || pagecount==0)">上一页
                </li>
                <li v-for="page in pagecountList" :class="{'active': page == pageindex,'disabled': page == pageindex}" @click.stop="getpaging(page,page === pageindex)">
                    {{page}}
                </li>
                <li class="next" :class="{'disabled': (pageindex == pagecount || pagecount == 0)}"
                    @click.stop="getpaging(pageindex+1, (pageindex == pagecount || pagecount == 0))">
                    下一页
                </li>
                <li class="lastPage" :class="{'disabled':(pageindex==pagecount || pagecount==0)}" @click.stop="getpaging(pagecount,(pageindex===pagecount || pagecount==0))">
                    尾页
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                predisabled: '',
                lastdisabled: ''
            }
        },
        props: {
            pagecount: {
                type: Number,
                default: 1
            },
            pageindex: {
                type: Number,
                default: 1
            }
        },
        computed: {
            pagecountList() {
                var arry=[];
                for (var i = this.startpages; i <= this.endpages;i++){
                    arry.push(i)
                }
                return arry;
            },
            startpages(){
                if (this.pagecount <= 10) {
                    return 1
                } else {
                    if (this.pageindex <= 6) {
                        return 1
                    }else if (this.pageindex > 6 && this.pagecount - this.pageindex >= 4) {
                        return this.pageindex - 5
                    }else if (this.pageindex > 6 && this.pagecount - this.pageindex < 4) {
                        return this.pagecount - 9
                    }
                }
            },
            endpages(){
                //总共显示10页，点击第一页的时候才跳
                if (this.pagecount <= 10) {
                    return this.pagecount
                }else {
                    if (this.pageindex <= 6) {
                        return 10
                    }else if (this.pageindex > 6 && this.pagecount - this.pageindex >= 4) {
                        return this.pageindex + 4
                    }else if (this.pageindex > 6 && this.pagecount - this.pageindex < 4) {
                        return this.pagecount
                    }
                }
            }
        },
        methods:{
            getpaging(i,bool) {
                this.$emit('getpaging',i,bool);
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .listFoot
        padding:20px 0
        background #fff;
        border-radius 0 0 4px 4px
        .pagination
            text-align center
            li
                display inline-block
                margin 0 1px
                width 28px
                line-height 28px
                height 28px
                color #585757
                border 1px solid #f0f0f0
                background  #fff
                text-align  center
                cursor  pointer
                &.active 
                    color #fff
                    border-color #6cc
                    background-color #6cc
                &.firstPage
                &.lastPage
                    width 40px
                &.prev
                &.next
                    width 60px
                &.disabled
                    pointer-events none
    </style>
