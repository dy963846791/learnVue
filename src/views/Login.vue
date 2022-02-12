<template>
  <div>
    <el-container>
      <el-header>
        <img
          class="mlogo"
          src="http://img4.yun300.cn/img/logo_qwxin.png?tenantId=139828&viewType=1&k=1612507715000"
          alt=""
        />
      </el-header>
      <el-main>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用戶名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密碼" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "BlogLogin",

  data() {
    return {
      ruleForm: {
        username: "qs002",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, message: "请输入用戶名", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密碼", trigger: "change" },
        ],
      },
    };
  },

  mounted() {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          this.$axios
            .post(
              "/login",
              this.$qs.stringify(this.ruleForm)
            )
            .then((res) => {
              const jwt = res.headers["authorization"];
              const userInfo = res.data.data;
              
              // 把数据共享出去
              _this.$store.commit("SET_TOKEN", jwt);
              _this.$store.commit("SET_USERINFO", userInfo);
            
            //   // 获取数据
            //   console.log(_this.$store.getters.getUser)

            // 密码正确跳转到页面
              _this.$router.push("/blogs")
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.demo-ruleForm {
  max-width: 500px;
  margin: 0 auto;
}
</style>