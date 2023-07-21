import HttpRequest from "@/libs/httpJava";

class UserModel extends HttpRequest {
  login(params:object) {
    return this.commonAjaxJava(
      '/login/loginByPhonePassword',
      params,
      {method: 'POST', queryString: true}
    )
  }
}

export default new UserModel()