# learn-react

React是Facebook开发的前端框架。

### 组件化

在互联网时代，Web应用不再是简单的信息呈现载体，其丰富的交互和逻辑使得Web应用的复杂度提高了不止一个当量级。这对于Web开发人员来说，Web开发不再是简单的页面呈现与动画效果的实现，其业务逻辑与模块的串联依赖变得十分重要，可以想到，大型的电子商务网站，视频网站，我们常用的社交网站由于其业务逻辑的复杂度，以及大规模的用户访问带来的性能问题，意味着开发和维护的难度也日益提升，这也是Web前端开发人员甚至全栈开发越来越重要的原因。

而React组件化的思路，其实在今天的前端工程化的时代，让人耳目一新。组件化让业务逻辑更清晰，维护更便捷。

基本的React组件通过React提供的createClass方法来创建，通过render()方法进行组件UI以及其中数据属性等的传递，当然关于数据、属性、状态等的处理，React有自己的办法，值得注意的是，React的开发中用到了一种可选的JSX语法。下面是创建一个组件的简单示例：

``` javascript
        var Square = React.createClass({
            //render()方法负责页面UI
            render: function () {
                //在组建内定义的CSS样式
                var squareStyle = {
                    height: 150,
                    backgroundColor: this.props.color
                };
                //return出去的就是UI的最终结构
                return (
                    <div style={squareStyle}></div>
                );
            }
        });
```


