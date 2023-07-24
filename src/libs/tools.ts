interface Config {
  wait: number | undefined
  immediate: boolean | undefined
}
export const debounce = (func:Function, config: Config | undefined):Function => {
  let timer:any;
  const {wait=500,immediate=false} = config || {}
  return function () {
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