<template>
  <div class="mcontaner">
    <Header></Header>
    <div class="block">
      <el-timeline>
        <el-timeline-item
          :timestamp="blog.created"
          placement="top"
          v-for="(blog, index) in blogs"
          :key="index"
        >
          <el-card>
            <h4>
              <router-link
                :to="{ name: 'BlogDetail', params: { blogId: blog.id } }"
              >
                {{ blog.title }}
              </router-link>
            </h4>
            <p>{{ blog.description }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <el-pagination
        class="mpage"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change=page
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: "BlogBlogs",
  components: {
    Header,
  },
  data() {
    return {
      blogs: {},
      currentPage: 1,
      total: 0,
      pageSize: 5,
    };
  },

  created() {
    this.page(1);
  },

  methods: {
    page(currentPage) {
      const _this = this;
      _this.$axios.get("/blogs?currentPage=" + currentPage).then((res) => {
        console.log(res);
        let data = res.data.data;
        _this.blogs = data.records;
        _this.currentPage = data.current;
        _this.total = data.total;
        _this.pageSize = data.size;
      });
    },
  },
};
</script>

<style scoped>
.mpage {
  margin: 0 auto;
  text-align: center;
}
</style>