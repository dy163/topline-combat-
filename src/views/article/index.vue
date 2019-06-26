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
                :data="tableData"
                style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
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
export default {
  data () {
    return {
      tableData: [
        {
          date: '2019-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2019-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2019-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2019-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.filter-card {
    margin-bottom: 15px;
}
</style>
