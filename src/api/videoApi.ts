import HttpRequest from "@/libs/httpJava";

class videoModel extends HttpRequest {
  getVideoListForBackGround(params:object) {
    return this.commonAjaxJava(
      '/xtBackGround/getVideoListForBackGround',
      params,
      {method: 'GET', newGet: true}
    )
  }
}

export default new videoModel()