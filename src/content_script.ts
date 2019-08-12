
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.funcStr) {
    debugger;
    try {
      eval(msg.funcStr);
    } catch (error) {
      console.log(error);
    }
    sendResponse('执行成功');
  } else {
    sendResponse('未知执行函数');
  }

});

