<template>
    <div style= " line-height: 60px;display: flex">
        <div style= " flex :1 ;font-size: 20px">
            <span :class = "collapseBtnClass" style="cursor: pointer ; font-size:18px " @click="collapse"></span>
            <el-breadcrumb separator="/" style="display: inline-block ; margin-left: 10px">
                <el-breadcrumb-item :to="'/'" >首页</el-breadcrumb-item>
                <el-breadcrumb-item >{{pathName}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div></div>
        <div>
            <el-dropdown style="width: 150px; cursor: pointer; text-align: right">
                <div style="display: inline-block">
                    <img :src="this.form.avatarurl" alt="   "
                         style="width: 50px; border-radius: 70%; position: relative; top: 10px; right: 5px">
                    <span>{{ user.username }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
                </div>
                <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
                    <el-dropdown-item>
                        <!--                            <router-link to="person">个人信息</router-link>-->
                        <span  style="text-decoration: none" @click="$router.push('/person')">个人信息</span>

                    </el-dropdown-item>
                    <el-dropdown-item>
                        <span  style="text-decoration: none" @click="logout">退出登录</span>
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="backToFront">回到前台</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>

</template>

<script>
    import {resetRouter} from "../router";

    export default {
        name: "Header",
        props:{
            collapseBtnClass :String,
            collapse:Function,
        },
        watch:{
            '$route':function () {
                this.pathName = localStorage.getItem("currentPathName")
            }
        },

        data() {
            return {
                paths: [],
                pathName: "",
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},  //从登录信息中取username

                form:{}

            }
        },
        created() {
            // console.log("这里是header的信息")
            // console.log(this.user.username)

            this.request.get("/user/username/" + this.user.username).then(res => {
                if(res.code === '200'){

                    this.form = res.data
                    // console.log(this.form)
                }
            })
        },

        methods:{
            logout(){
                // this.$store.commit("logout")
                this.$router.push("/login")
                localStorage.removeItem("user")
                this.$message.success("退出成功")

                //重置路由
                resetRouter()

            }
        }
    }
</script>

<style scoped>

</style>