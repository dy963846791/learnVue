<template>
  <div>
    <Header></Header>

    <div class="m-content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <mavon-editor
            ref="md"
            v-model="ruleForm.content"
            @imgAdd="imgAdd"
          ></mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "BlogBlogedit",
  components: {
    Header,
  },
  data() {
    return {
      ruleForm: {
        id: "",
        title: "",
        description: "",
        content: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 3,
            max: 25,
            message: "长度在 3 到 25 个字符",
            trigger: "blur",
          },
        ],
        description: [
          { required: true, message: "请填写摘要", trigger: "blur" },
        ],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },

  created() {
    const blogId = this.$route.params.blogId;
    if (blogId) {
      this.$axios.get("/blog/" + blogId).then((res) => {
        const blog = res.data.data;
        const _this = this;
        _this.ruleForm.id = blog.id;
        _this.ruleForm.title = blog.title;
        _this.ruleForm.description = blog.description;
        _this.ruleForm.content = blog.content;
      });
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/blog/edit", this.ruleForm, {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            })
            .then((res) => {
              this.$alert("操作成功", "提示", {
                confirmButtonText: "确定",
                callback: (action) => {
                  this.$router.push("/blogs");
                },
              });
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
    imgAdd(pos, $file) {
      // 图片上传并返回上传后的路径
      // 上传图片
      let _this = this;
      let formData = new FormData();
      formData.append("file", $file);
      this.$axios
        .post("/upload", formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          this.$refs.md.$img2Url(pos, res.data.data);
        });
    },
  },
};
</script>

<style scoped>
.m-content {
  text-align: center;
}
</style>