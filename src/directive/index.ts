export default {
  install(Vue:any, _Options:any) {
    Vue.directive('debounce', {
      mounted: function (el:any, binding:any, _vNode:any) {
        let {arg:event='click', value:fn} = binding, time=500,immediate=true, timer:any;
        el.addEventListener(event, () => {
          timer && clearTimeout(timer)
          if(immediate) {
            if(!timer) fn()
            timer = setTimeout(() => timer = null, time)
          }else {
            timer = setTimeout(() => fn(), time)
          }
        })
      }
    })
  }
}