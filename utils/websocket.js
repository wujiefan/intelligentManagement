// socket已经连接成功
var socketOpen = false;
// socket已经调用关闭
var socketClose = false;
// 判断心跳变量
var heart = 'HeartBeat';
// websocket路径
var socketUrl = 'wss://dubbo.51dingdian.com/MessageCenter/myHandler?appId=11111111&appToken=22222222&receiverType=1,0&receiver=1';
// 心跳
var heartBeatTimeOut = null;
// 重连心跳
var connectSocketTimeOut = null;

var webSocket  = {
  //连接websocket
  connectSocket: function (options) {
    wx.showLoading({
      title: '',
      mask: true,
    });
    socketOpen = false;
    socketClose = false;
    wx.connectSocket({
      url: socketUrl,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (options) {
          // 成功回调
          options.success && options.success(res);
        }
      },
      fail: function (res) {
        if (options) {
          // 失败回调
          options.fail && options.fail(res);
        }
      }
    })
  },
  //关闭 WebSocket
  closeSocket: function (options) {
    if (connectSocketTimeOut) {
      clearTimeout(connectSocketTimeOut);
      connectSocketTimeOut = null;
    }
    socketClose = true;
    var self = this;
    self.stopHeartBeat();
    wx.closeSocket({
      success: function (res) {
        console.log('已关闭 WebSocket');
        if (options) {
          options.success && options.success(res);
        }
      },
      fail: function (res) {
        if (options) {
          options.fail && options.fail(res);
        }
      }
    })
  },
  // 向服务器发送数据
  sendSocketMessage: function (options) {
    if (socketOpen) {
      wx.sendSocketMessage({
        data: options.msg,
        success: function (res) {
          if (options) {
            options.success && options.success(res);
          }
        },
        fail: function (res) {
          if (options) {
            options.fail && options.fail(res);
          }
        }
      })
    }
  },
  // 开始心跳
  startHeartBeat: function () {
    console.log('socket开始心跳')
    this.heartBeat();
  },
  // 结束心跳
  stopHeartBeat: function () {
    console.log('socket结束心跳')
    var self = this;
    if (heartBeatTimeOut) {
      clearTimeout(heartBeatTimeOut);
      heartBeatTimeOut = null;
    }
    if (connectSocketTimeOut) {
      clearTimeout(connectSocketTimeOut);
      connectSocketTimeOut = null;
    }
  },
  // 心跳
  heartBeat: function () {
    var self = this;
    self.sendSocketMessage({
      msg: JSON.stringify(heart),
      success: function (res) {
        console.log('socket心跳成功');
        heartBeatTimeOut = setTimeout(() => {
          self.heartBeat();
        }, 10000);
      },
      fail: function (res) {
        console.log('socket心跳失败');
        // 重连
        self.connectSocket();
        heartBeatTimeOut = setTimeout(() => {
          self.heartBeat();
        }, 10000);  
      }
    });
  }
}

wx.onSocketError(function (res) {
  console.log('WebSocket连接打开失败，请检查！', res);
})
wx.onSocketClose(function (res) {
  console.log('WebSocket 已关闭！');
  if (!socketClose) {
    clearTimeout(connectSocketTimeOut)
    connectSocketTimeOut = setTimeout(() => {
      webSocket.connectSocket();
    }, 5000);
  }
})
wx.onSocketOpen(function (res) {
  console.log('WebSocket连接已打开！');
  wx.hideLoading();
  if (socketClose) {
    webSocket.closeSocket();
  } else {
    socketOpen = true
    webSocket.startHeartBeat();
  }
});
wx.onSocketMessage(function (res) {
  console.log(res.data)
  webSocket.onSocketMessageCallback(res.data)
})

module.exports = webSocket;