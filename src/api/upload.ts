import HttpUpload from "@/libs/httpUpload.ts";

class UploadModel extends HttpUpload {
  // 上传文件
  upload(formData: FormData) {
    return this.axiosUpload(
      '/oss/upload',
      formData
    )
  }
}

export default new UploadModel()