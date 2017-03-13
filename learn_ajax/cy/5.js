/*
* @Author: Administrator
* @Date:   2015-10-27 09:54:43
* @Last Modified by:   Administrator
* @Last Modified time: 2015-10-27 10:19:48
*/


var entries=[
  {
    "text": "看！险峻萃英"
  }
];

var html="";
$.each(entries,function() {
  html += this.text;
});

$('#description').html(html);
