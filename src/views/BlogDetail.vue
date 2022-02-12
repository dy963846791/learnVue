<template>
  <div>
    <Header></Header>
    <div class="mblog">
      <h2>{{ blog.title }}</h2>
      <el-link icon="el-icon-edit" v-if="ownBlog">
        <router-link :to="{ name: 'BlogEdit', params: { blogId: blog.id } }"
          >编辑</router-link
        >
      </el-link>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import "github-markdown-css/github-markdown.css";

export default {
  name: "BlogBlogdetail",
  components: {
    Header,
  },
  data() {
    return {
      blog: {
        title: "moren",
        content: "neirong",
      },
      ownBlog: false
    };
  },

  created() {
    const blogId = this.$route.params.blogId;
    if (blogId) {
      this.$axios.get("/blog/" + blogId).then((res) => {
        const blog = res.data.data;
        const _this = this;
        _this.blog.id = blog.id;
        _this.blog.title = blog.title;
        // 利用markdown-it 渲染markdown格式的内容
        let MardownIt = require("markdown-it");
        let md = new MardownIt();

        let result = md.render(blog.content);

        _this.blog.content = result;

        _this.ownBlog = (blog.userId === _this.$store.getters.getUser.id)
      });
    }
  },

  methods: {},
};
</script>

<style scoped>
.mblog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;
  padding: 20px 15px;
}
</style>