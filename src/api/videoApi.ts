import HttpRequest from "@/libs/httpJava";

class videoModel extends HttpRequest {
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
      {method: 'POST'}
    )
  }
}

export default new videoModel()