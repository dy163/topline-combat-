<template>
    <div>
        <!-- 数据筛选模块 -->
        <el-card class="filter-card">
            <div slot="header" class="clearfix">
                <span>数据筛选</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>

            <el-form ref="form" :model="filterParams" label-width="80px">

              <el-form-item label="状态">
                <el-radio-group v-model="filterParams.status">
                  <el-radio label="">全部</el-radio>
                  <el-radio
                  v-for="(item, index) in statTypes"
                  :key="item.label"
                  :label="index"
                  >{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="频道">
                <article-channel v-model="filterParams.channel_id"></article-channel>
              </el-form-item>

              <el-form-item label="时间">
                 <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="range_date"
                    @change="handleDateChange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button
                type="primary"
                @click="handleFilter"
                :loading="articleLoading">查询</el-button>
              </el-form-item>
          </el-form>

        </el-card>
        <!-- 文章列表模块 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>一共有<strong>{{ totalCount }}</strong>条数据</span>
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
                        <template slot-scope="scope">
                          <el-button
                          size="mini"
                          type="primary"
                          plain
                          @click="$router.push(`/publish/${scope.row.id}`)">修改</el-button>
                          <el-button size="mini" type="danger" plain @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
            </el-table>
            <!-- 分页模块
              total 用来配置总的记录数
              page-size 用来配置每页大小 默认是10
              分页组件会根据每页大小和总的记录数进行自动处理
              current-page 当前高亮的页码,需要和数据保持同步,否则会出现数据页码的改变 页码不会变
            -->
            <el-pagination
                :current-page="page"
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

import ArticleChannel from '@/components/article-channel'

export default {
  name: 'ArticleList',
  components: {
    ArticleChannel
  },
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
      articleLoading: false,
      filterParams: {
        status: '', // 文章状态
        channel_id: '', // 频道id
        begin_pubdate: '', // 开始时间
        end_pubdate: '' // 结束时间
      },
      range_date: '' // 时间范围绑定值
      // channels: [] // 所有的频道,默认是空  自定义组件的使用后的结果去掉
    }
  },

  created () {
    this.loadArticles()
    // this.loadChannels()   组件中已经加载不用在一次加载了
  },

  methods: {
    // 查询函数
    handleFilter () {
      this.page = 1 // 查询从第一页开始查询
      // 点击查询按钮,根据表单中的数据查询查询文章列表
      this.loadArticles()
    },
    // 日期选择函数
    handleDateChange (value) {
      this.filterParams.begin_pubdate = value[0]
      this.filterParams.end_pubdate = value[1]
    },

    // // 获取频道函数
    // async loadChannels () {
    //   try {
    //     const data = await this.$http({
    //       method: 'GET',
    //       url: '/channels'

    //     })
    //     this.channels = data.channels
    //   } catch (error) {
    //     this.$message.error('获取频道数据失败')
    //   }
    // },

    // 页面获取函数
    async loadArticles () {
      // 请求开始，加载 loading
      this.articleLoading = true
      // 除了登录的相关接口,其他接口必须在请求头中通过 Authorization 字段提供用户的 token 令牌
      // 当我们登录成功后,服务端会生成一个token令牌,放到用户的信息中
      const filterData = {}
      for (let key in this.filterParams) {
        const item = this.filterParams[key]
        // 数据中有0 参与查询运算后就是 false
        if (item !== null && item !== undefined && item !== '') {
          filterData[key] = item
        }
      }
      const data = await this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          page: this.page, // 页码
          per_page: this.pageSize, // 每页多少
          ...filterData // 将 filterData 混入到当前对象中
        }
      })
      // console.log(data)
      this.articles = data.results
      this.totalCount = data.total_count
      // 请求结束, 停止loading
      this.articleLoading = false
    },
    // 页面改变加载函数
    handleCurrentChange (page) {
      // console.log(page) 将数据中页码修改为当前最新的页码
      this.page = page
      // 改变之后重新加载页面
      this.loadArticles()
    },
    async handleDelete (item) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await this.$http({
          method: 'DELETE',
          url: `/articles/${item.id}`
        })

        this.$message({
          type: 'success',
          message: '删除成功'
        })
        // 删除成功重新加载数据列表
        this.loadArticles()
      } catch (err) {
        if (err === 'cancel') {
          return this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
        this.$message.error('删除失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.filter-card {
    margin-bottom: 15px;
}
</style>
