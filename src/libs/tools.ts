interface Config {
  wait: number | undefined
  immediate: boolean | undefined
}
export const debounce = (func:Function, config: Config | undefined):Function => {
  let timer:any;
  const {wait=500,immediate=false} = config || {}
  return function (this:any) {
    let context = this;
    let args = arguments;

    if (timer) clearTimeout(timer);
    if (immediate) {
      var callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timer = setTimeout(function () {
        func.apply(context, args)
      }, wait);
    }
  }
}

export const getVideoBase64 = (url:string, callback:Function, s?:number) => { //封面
	let dataURL = '';
	let video: HTMLVideoElement = document.createElement("video");
	video.setAttribute('crossOrigin', 'anonymous'); //处理跨域
	video.setAttribute('src', url);
	video.setAttribute('width', '400');
	video.setAttribute('height', '240');
	video.currentTime = s || 0.01; // 这里是截取第几帧
	video.addEventListener('loadeddata', function() { //创建虚拟视频组件拿第一帧
		let canvas: HTMLCanvasElement = document.createElement("canvas")
		// document.querySelector('#index').append(canvas)
		let width = video.width //canvas的尺寸和图片一样
		let height = video.height
		canvas.width = width;
		canvas.height = height;
		canvas.getContext("2d")?.drawImage(video, 0, 0, width, height); //绘制canvas
		dataURL = canvas.toDataURL('image/jpeg'); //转换为base64
		callback && callback(dataURL)
	});
}
export const base64ToFile = (urlData:string, fileName:string) => {
  const arr: string[] = urlData.split(',')
  const mime = (arr[0] as any).match(/:(.*?);/)[1];
  const bytes = atob(arr[1])
  let n = bytes.length
  const ia = new Uint8Array(n)
  while (n--) {
    ia[n] = bytes.charCodeAt(n)
  }
  return new File([ia], fileName, { type: mime })
}