import * as moment from 'moment';
import * as $ from 'jquery';
const mock = [
  {
    title: '隐藏无效行',
    funcStr: `var trs = document.querySelectorAll('#question-app tr');
    for (let tr of trs) {
      if (tr.innerHTML.indexOf('成为经典会员后解锁题目') >= 0) {
        console.log(tr);
        tr.style.display = 'none'
      }
    }
  `
  }
]
$(function () {
  const lis = mock.map(item => {
    return `<li>${item.title} <button data-method="execute">run</button></li>`
  }).join('\n');
  $('#list').html(lis);
  $('#list li button[data-method="execute"]').click((e) => {
    // console.log(this);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let $parent = $(e.target).parent();
      chrome.tabs.sendMessage(tabs[0].id, {
        funcStr: mock[$parent.index()].funcStr
      },
        function (msg) {
          console.log("result message:", msg);
        });
    });

  });
});
