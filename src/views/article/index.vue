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
                style="width: 100%">
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
                        prop="address"
                        label="地址">
                    </el-table-column>
            </el-table>
            <!-- 分页模块 -->
            <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
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
      ]
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
        url: '/articles'
      })
      console.log(data)
      this.articles = data.results
    }
  }
}
</script>

<style lang="less" scoped>
.filter-card {
    margin-bottom: 15px;
}
</style>
