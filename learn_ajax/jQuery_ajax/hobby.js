
var hobby=[
  {"name":"篮球"},
  {"name":"书法"},
  {"name":"阅读"}
]

$.each(hobby,function(index,el){
  $('.getscript .des').append("<ul><li>"+el["name"]+"</li></ul>");
})
