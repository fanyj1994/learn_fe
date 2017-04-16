# 什么是Ajax
Ajax是一门可以不用刷新整个页面，就可以动态修改页面内容的Web技术。其全名叫做Asynchronous JavaScript and XML，异步的JavaScript和XML技术。

# 它是干什么用的
在传统的Web应用中，用户向服务器进行资源请求后，其必须要等到服务器返回整个页面才能进行下一步操作。大多数情况下，为了更新局部网页内容，却需要请求整个网页全部发送，这样很耗费带宽的同时，也大大损害页面性能，用户往往需要等待好长时间，而网页中也许只改变小小的一个图片。这样可真的是用户十分不友好啊！

而Ajax的出现则解决了这个痛点。它并不是一个单一的技术，而是一系列技术的结合，它通过JS的XMLHttpRequest对象发送一个异步的请求，这个请求可以只获取我们需要的部分内容，而不需要更新整个页面。当然，Ajax的数据交换格式不只是XML，现在更流行的乃是JSON。

# 一次Ajax请求过程
**创建请求对象（XMLHttpRequest）** → **配置请求对象的属性（连接的URL、.open()方法）** → **告诉请求对象当服务器响应时应该做什么（onreadystatechange，可以给这个属性指定一个回调函数（callback））** → **发出请求（send()方法）** → **服务器按要求返回内容**

下面对其中的一些常见属性进行分析：

1. 创建请求对象：可以这么理解，我们以往常见的与服务器交互的时候，都是通过表单提交来实现的，但是在Ajax中，我们将借助这个对象完成这个过程，这个对象由JavaScript控制，和服务器并没有直接的关联，通过这个对象，可以向服务器发送请求，而不用刷新整个页面。

值得注意的是，各大浏览器对这个对象的支持并不一样，所以它就拥有了几个不同的名字，所以我们通过以下方式进行兼容性问题解决，如下：
``` javascript
function createRequest(){
    try{
      request = new XMLHTTPRequest();
    } catch(tryMS) {
      try{
        request = new ActiveXObject("Msxm12.XMLHTTP");
        }catch(otherMS){
          try{
            request = new ActiveXObject("Microsoft.XMLHTTP");
          }catch(failed){
            request = null;
          }
       }
    }
    return request;
}
```
2. 配置请求对象的属性：光有这个请求对象还不能达到我们的目的，我们要让它做事，于是要通过对这个请求对象设置相关的属性，例如告诉它连接哪个服务器页面的链接，可以用请求对象的open()方法初始化连接方式，下面对open()方法进行分解：

   `request.open("GET", url, true);`

方法中的第一个参数是指定获取数据的方法，有get/post两种，第二个参数是要连接服务器端的URL，第三个参数为true表示的是采用异步的方式请求。

3. 设置响应回调：这一步借助对象的onreadystatechange属性来完成，这个属性可以给其指定一个回调函数，来告诉当服务器准备好了之后要做什么工作，所以说，我们常见的完成的工作基本都在这个回调函数中完成，值得注意的是，这个地方最好只是一个回调函数的引用，而不是调用（加括号）。通常通过以下几个参数来判断请求的状态进而触发和设置回调函数：
- readyState：XMLHttpRequest的状态，从0到4
 - 0: 请求未初始化
 - 1: 服务器连接已建立
 - 2: 请求已接收
 - 3: 请求处理中
 - 4: 请求已完成，且响应已就绪
- status：服务器返回的请求状态码信息，例如404，200等；
- responseXML：获得的XML格式信息；
- statusText：包含服务器设置的响应信息，什么页面走丢之类的；
- responseText：获得的字符串形式的数据
4. 发出请求：当一切就绪之后，就可以向服务器发出请求了，这个过程通过对象的send()方法来完成。一般给这个方法指定一个null的参数，表示我们只是发送一个请求，并没有发送多于的信息过去。
5. 服务器返回响应内容：这也是一个Ajax请求的最后一步，也就是服务器按照前面指定的回调函数的要求来返回响应的内容，然后触发回调，进行数据渲染。

Done！至此，任务完成！综上过程，我们可以出现一个基本的Ajax应用过程：

``` javascript
//创建请求对象
function createRequest(){
    try{
        request = new XMLHTTPRequest();
    } catch(tryMS) {
        try {
            request = new ActiveXObject("Msxm12.XMLHTTP");
        } catch (otherMS) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(failed) {
                request = null;
            }
        }
    }
    return request;
}

  //设置对象属性
function setDetails(itemName){
    request = createRequest();
    if(request=null){
        alert("Unable to create request");
        return;
    }

    var url = "getDetails.php?ImageID="+escape(itemName);
    request.open("GET",url,true);
    request.onreadystatechange = displayDetails;    //指定回调函数
    request.send(null);
}

//回调函数的内容，也就是服务器的响应内容
function displayDetails(){
    if(request.readyState == 4){
        if (request.status == 200) {
            detailDiv = document.getElementById('description');
            detailDiv.innerHTML = request.responseText;
        };
    }
}
```
