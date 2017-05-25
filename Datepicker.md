# 这个Datepicker怎么用？

很简单，首先HTML代码：
```
<input type="text" placeholder="select the date" id="datepicker" class="datepicker">
<div id="datepick"></div>
```
组件的入口元素为一个input元素，此外还有一个平行的div元素，id为datepick，这两个元素的相对结构就是这样，至于外部结构如何，要看布局来定。

然后是JS代码：
```
var data = DatePicker();
```
这样就将这个datepicker的数据对象绑定到这个data变量上去了，可以直接调用该对象的getYear， getMonth， getDate方法来获取选择好的日期数据，初始化数据都是0。
![主界面](1.jpg)
