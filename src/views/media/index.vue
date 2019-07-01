<template>
    <el-card>
        <div slot="header">
            <span>素材管理</span>
        </div>
        <div class="action">
            <el-radio-group v-model="active">
                <el-radio-button label="全部" @click.native="loadImages(false)"></el-radio-button>
                <el-radio-button label="收藏" @click.native="loadImages(true)"></el-radio-button>
            </el-radio-group>
            <!-- 上传图片:on-success="() => {this.loadImages(false)}" -->
            <el-upload
                class="upload-demo"
                action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                :headers="{Authorization: `Bearer ${$store.state.user.token}`}"
                name="image"
                :on-success="handleSuccess"
                :show-file-list="false">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </div>
        <el-row :gutter="20">
            <el-col :span="4" v-for="item in images" :key="item.id" style="margin-bottom: 15px">
                <el-card :body-style="{ padding: '0px' }">
                <img :src="item.url" class="image" style="width: 100%">
                <div style="padding: 10px;">
                    <div class="bottom clearfix">
                    <!-- 点击实现收藏功能 -->
                    <el-button
                    plain
                    type="primary"
                    @click="handleCollect(item)"
                    :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'" circle></el-button>
                    <el-button
                    plain
                    type="danger"
                    icon="el-icon-delete"
                    @click="handleDelete(item)"
                    circle></el-button>
                    </div>
                </div>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
export default {
  name: 'MediaList',
  data () {
    return {
      active: '全部',
      images: []
    }
  },

  created () {
    this.loadImages()
  },

  methods: {
    async loadImages (collect = false) {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/user/images',
          params: {
            collect
            //   page: 1,
            //   per_page: 10
          }
        })
        this.images = data.results
      } catch (err) {
        this.$message.error('获取图片失败')
      }
    },
    // 点击收藏按钮获得收藏页面
    async handleCollect (item) {
      const collect = !item.is_collected
      try {
        const data = await this.$http({
          method: 'PUT',
          url: `/user/images/${item.id}`,
          data: {
            collect
          }
        })
        item.is_collected = data.collect
        this.$message({
          type: 'success',
          message: `${collect ? '' : '取消'}收藏成功`
        })
      } catch (err) {
        this.$message.error('收藏图片失败')
      }
    },
    // 点击删除图标实现删除功能
    async handleDelete (item) {
      try {
        await this.$http({
          method: 'DELETE',
          url: `/user/images/${item.id}`
        })
        this.loadImages()
        this.$message({
          type: 'success',
          message: '图片删除成功'
        })
      } catch (err) {
        this.$message.error('删除失败,请重新操作')
      }
    },
    // 点击上传图片
    handleSuccess () {
      this.loadImages()
    }
  }
}
</script>

<style lang="less" scoped>
.action {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}
.bottom {
    display: flex;
    justify-content: center;
}
</style>
