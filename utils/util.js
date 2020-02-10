const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatTime2 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('/')
}

const formatTime3 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const deepCopy = (o, c)=> {
  var c = c || {}
  for (var i in o) {
    if (typeof o[i] === 'object') {
      //要考虑深复制问题了
      if (o[i].constructor === Array) {
        //这是数组
        c[i] = []
      } else {
        //这是对象
        c[i] = {}
      }
      deepCopy(o[i], c[i])
    } else {
      c[i] = o[i]
    }
  }
  return c
}
const debounce = (func, wait)=> {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    let later = () => {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
}
module.exports = {
  formatTime: formatTime,
  formatTime2: formatTime2,
  formatTime3:formatTime3,
  deepCopy: deepCopy,
  debounce: debounce
}
