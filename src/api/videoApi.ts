import HttpRequest from "@/libs/httpJava";

class VideoModel extends HttpRequest {
  // 获取后台要审核的视频
  getVideoListForBackGround(params:object) {
    return this.commonAjaxJava(
      '/xtBackGround/getVideoListForBackGround',
      params,
      {method: 'GET', newGet: true}
    )
  }
  // 审核视频
  checkVideo(params:object) {
    return this.commonAjaxJava(
      '/xtBackGround/checkVideo',
      params,
      {method: 'POST', queryString: true}
    )
  }
  // 我的作品
  getMyVideoList(params:object) {
    return this.commonAjaxJava(
      '/xtVideo/getMyVideoList',
      params,
      {method: 'GET', newGet: true}
    )
  }
  // 我的草稿
  getMyDraftVideoList(params:object) {
    return this.commonAjaxJava(
      '/xtVideo/getMyDraftVideoList',
      params,
      {method: 'GET', newGet: true}
    )
  }
  // 我的私密
  getMySecretVideoList(params:object) {
    return this.commonAjaxJava(
      '/xtVideo/getMySecretVideoList',
      params,
      {method: 'GET', newGet: true}
    )
  }
  // 我的点赞
  getMyLikeVideoList(params:object) {
    return this.commonAjaxJava(
      '/xtVideoLike/getMyLikeVideoList',
      params,
      {method: 'GET', newGet: true}
    )
  }
  // 我的收藏
  getMyCollectVideoList(params:object) {
    return this.commonAjaxJava(
      '/xtVideoCollect/getMyCollectVideoList',
      params,
      {method: 'GET', newGet: true}
    )
  }
  // 发布视频
  insertXtVideo(params:object) {
    return this.commonAjaxJava(
      '/xtVideo/insertXtVideo',
      params,
      {method: 'POST'}
    )
  }
  // 编辑
  updateXtVideo(params:object) {
    return this.commonAjaxJava(
      '/xtVideo/updateXtVideo',
      params,
      {method: 'POST'}
    )
  }
  // 删除
  deleteXtVideo(ids:number[]) {
    return this.commonAjaxJava(
      '/xtVideo/deleteXtVideo',
      ids,
      {method: 'POST'}
    )
  }
  // 视频主题查询
  getThemeSearchList(params:object) {
    return this.commonAjaxJava(
      '/xtTheme/getThemeSearchList',
      params,
      {method: 'GET', newGet: true}
    )
  }
}

export default new VideoModel()