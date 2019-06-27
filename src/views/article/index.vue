<template>
    <div>
        <!-- 数据筛选模块 -->
        <el-card class="filter-card">
            <div slot="header" class="clearfix">
                <span>数据筛选</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div>
        </el-card>
        <!-- 文章列表模块 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>一共有xxx条数据</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
             </div>
            <el-table
                class="article-list"
                :data="articles"
                style="width: 100%"
                v-loading="articleLoading">
                    <el-table-column
                        label="封面"
                        width="180">
                        <template slot-scope="scope">
                            <img
                            width="20"
                            v-for="item in scope.row.cover.images"
                            :key="item"
                            :src="item">
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="title"
                        label="标题"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        label="状态"
                        width="180">
                        <template slot-scope="scope">
                            <!-- 创造一个数组 -->
                            <el-tag
                            :type="statTypes[scope.row.status].type">
                            {{ statTypes[scope.row.status].label }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="pubdate"
                        label="发布时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template>
                          <el-button size="mini" type="primary" plain>修改</el-button>
                          <el-button size="mini" type="danger" plain>删除</el-button>
                        </template>
                    </el-table-column>
            </el-table>
            <!-- 分页模块
              total 用来配置总的记录数
              page-size 用来配置每页大小 默认是10
              分页组件会根据每页大小和总的记录数进行自动处理
            -->
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="totalCount"
                :disabled="articleLoading"
                @current-change="handleCurrentChange">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>

// import {getUser} from '@/utils/auth'

export default {
  name: 'ArticleList',
  data () {
    return {
      articles: [],
      statTypes: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: '',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ],
      pageSize: 10, //
      totalCount: 0, // 总数据量
      // 当前页码
      page: 1,
      // loading加载效果
      articleLoading: false
    }
  },

  created () {
    this.loadArticles()
  },

  methods: {
    async loadArticles () {
      // 请求开始，加载 loading
      this.articleLoading = true
      // 除了登录的相关接口,其他接口必须在请求头中通过 Authorization 字段提供用户的 token 令牌
      // 当我们登录成功后,服务端会生成一个token令牌,放到用户的信息中
      const data = await this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          page: this.page, // 页码
          per_page: this.pageSize // 每页多少
        }
      })
      console.log(data)
      this.articles = data.results
      this.totalCount = data.total_count
      // 请求结束, 停止loading
      this.articleLoading = false
    },

    handleCurrentChange (page) {
      // console.log(page) 将数据中页码修改为当前最新的页码
      this.page = page
      // 改变之后重新加载页面
      this.loadArticles()
    }
  }
}
</script>

<style lang="less" scoped>
.filter-card {
    margin-bottom: 15px;
}
</style>
