<template>
    <el-card class="publish-card">
    <div slot="header" class="header">
      <span>发布文章</span>
      <div>
        <el-button type="success"  @click="handlePublish(false)">发布</el-button>
        <el-button type="primary"  @click="handlePublish(true)">存入草稿</el-button>
      </div>
    </div>
    <el-row>
      <el-col :span="21">
        <el-form ref="form" :model="articleForm" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="articleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <!-- bidirectional data binding（双向数据绑定） -->
            <quill-editor v-model="articleForm.content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)">
            </quill-editor>
          </el-form-item>
          <el-form-item label="封面">
          </el-form-item>
          <el-form-item label="频道">
            <!-- 组件通信
              v-model是:value和@input的简写
             -->
            <atricle-channel v-model="articleForm.channel_id"></atricle-channel>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import AtricleChannel from '@/components/article-channel'
// 富文本的三哥组件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'AppPublish',
  components: {
    AtricleChannel,
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: '', // 标题
        content: '', // 内容
        channel_id: '', // 频道
        cover: { // 封面
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        }
      },
      editorOption: {}// 富文本编剧器配置选项
    }
  },
  /**
   * 监视
   * 可以监视实例中的数据成员,当监视的数据发生变化的时候就会处理函数
   */
  watch: {
    '$route' (to, from) {
      /**
       * 对路由变化做出响应
       */
      if (from.name === 'publish-edit') {
        this.articleForm = {
          title: '', // 标题
          content: '', // 内容
          channel_id: '', // 频道
          cover: { // 封面
            type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
            images: []
          }
        }
      }
    }
  },
  created () {
    if (this.$route.name === 'publish-edit') {
      this.loadArticle()
    }
  },

  methods: {
    async onEditorBlur () {},
    async onEditorFocus () {},
    async onEditorReady () {},

    async loadArticle () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: `/articles/${this.$route.params.id}`
        })
        this.articleForm = data
      } catch (err) {
        this.$message.error('获取文章修改失败')
      }
    },

    async handlePublish (draft) {
      try {
        if (this.$route.name === 'publish') {
          await this.$http({
            method: 'POST',
            url: '/articles',
            params: {
              draft
            },
            data: this.articleForm
          })
          this.$message({
            type: 'success',
            message: '发布成功'
          })
        } else {
          await this.$http({
            method: 'PUT',
            url: `/articles/${this.$route.params.id}`,
            params: {
              draft
            },
            data: this.articleForm
          })
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          // router.replace('/article')
        }
      } catch (err) {
        this.$message.error('操作有误,返回重新操作', err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.publish-card {
  min-height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
