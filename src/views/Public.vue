<template>
    <el-container style="min-height: 100vh">
        <el-aside :width= " sideWidth + 'px' " style="box-shadow: 2px 0 6px rgb(0 21 41 / 35%)">
            <Aside :is-collapse="isCollapse" :logo-text-show="logoTextShow"/>
        </el-aside>
        <el-container>
            <el-header style="border-bottom: 1px solid #ccc ">
                <Header :collapse-btn-class=" collapseBtnClass" :collapse="collapse" />
            </el-header>
            <!--下面是主体部分-->
            <el-main>
                <!--当前页面的子路由会在<router-view/>中展示-->
                <router-view/>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
    import axios, {Axios as request} from "axios";
    import Aside from "../components/Aside";
    import Header from "../components/Header";

    export default {
        name: 'Public',
        components: {Header, Aside},
        data()
        {
            return {
                msg:"hello world",
                collapseBtnClass:'el-icon-s-fold',
                isCollapse:false,
                sideWidth: 200,
                logoTextShow:true,
                components:{
                    Aside,
                    Header,
                }
            }
        },
        methods:{
            collapse(){ //点击收缩按钮触发
                this.isCollapse = !this.isCollapse
                if(this.isCollapse)
                {
                    this.sideWidth = 64
                    this.collapseBtnClass = 'el-icon-s-unfold'
                    this.logoTextShow = false
                }else{
                    this.sideWidth = 200
                    this.collapseBtnClass = 'el-icon-s-fold'
                    this.logoTextShow = true
                }
            },
        }
    }
</script>
