# Dubstep

### Example
``` javascript
songDecoder("WUBWEWUBAREWUBWUBTHEWUBCHAMPIONSWUBMYWUBFRIENDWUB")
  // =>  WE ARE THE CHAMPIONS MY FRIEND

```

我的解法
``` javascript
function songDecoder(song){
  return song.replace(/(WUB)+/g,' ').replace(/\s$|^\s/g, '');
}
```

在后面我发现很多解法用到了String.prototype.trim()方法，我完全不知其意，查完之后才知道这个方法直接会去掉首尾的空白字符，真的是长见识！所以上面的方法可以更简单：

``` javascript
function songDecoder(song){
  return song.replace(/(WUB)+/g,' ').trim();
}
```

还有一种比较有趣的解法，借助字符串与数组的分割，先将空字符串过滤掉，然后再用空白字符连接在一起（而不是像我一开始那样，连在一起再删就麻烦了）。
``` javascript
function songDecoder(song){
  return song.split('WUB').filter(ele => ele).join(' ');
}
```