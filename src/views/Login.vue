<template>
    <div >
        <div class="bodySize">
            <div style="margin: 200px auto; background-color: rgba(142,142,142,0.6); width: 350px; height: 300px; padding: 20px; border-radius: 10px">
                <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>登 录</b></div>
                <el-form :model="user" :rules="rules" ref="userForm">
                    <el-form-item prop="uName">
                        <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
                    </el-form-item>
                    <el-form-item style="margin: 10px 0; text-align: right">
                        <el-button type="primary" size="small"  autocomplete="off" @click="login">登录</el-button>
                        <el-button type="warning" size="small"  autocomplete="off" @click="$router.push('/register')">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                user: {},
                rules: {
                    uName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                        /*{ min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }*/
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                        /*{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }*/
                    ],
                }
            }
        },
        methods: {
            login: function () {
                this.$refs['userForm'].validate((valid) => {
                    console.log(this.user)
                    if (valid) {  // 表单校验合法
                        this.request.post("/user/login", this.user).then(res => {
                            console.log(this.user)
                            console.log("这里是用户")
                            if (res.code === '200') {
                                localStorage.setItem("user", JSON.stringify(res.data))  //存储用户信息到浏览器
                                localStorage.setItem("menus", JSON.stringify(res.data.menus))  //存储用户信息到浏览器
                                //动态设置当前用户的路由
                                setRoutes()
                                console.log(res.data.role)
                                this.$router.push("/home")
                                // if(res.data.role ==="USER"){
                                //     this.$router.push("/front/RuralCulturalActivitiesExhibitionRoom")
                                // }
                                // else {
                                //     this.$router.push("/home")
                                // }

                                this.$message.success("登陆成功")
                            } else {
                                this.$message.error(res.msg)
                            }
                        })
                    }
                });
            }
        },
    }
</script>

<style scoped>

</style>