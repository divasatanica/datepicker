# JS-Datepicker
原生JS编写的datepicker小插件

##过程中遇到的问题

- 绝对定位元素包裹的子元素无法点击。解决方法是为绝对定位元素添加css样式：
```
{
	pointer-events:auto;
}
```，可以恢复指针事件，这是通过SVG来实现的。


- 事件冒泡对父元素和子元素的事件监听器会有影响，会产生不想要的结果，使用``ev.stopPropagation()``来阻止事件冒泡传播。

- 作为一个插件使用时，外层input元素绑定事件监听函数func1， func1内部给浮动层元素也就是日历主体元素添加了事件监听函数func2，func3等等，如果在外部多次点击input函数，会多次执行func1，会重复添加事件监听func2，func3，对日历主体的点击事件会执行多次func2，func3函数，目前尚未解决。

##学习到的东西
- 事件监听器的添加，事件委托，阻止冒泡，DOM节点的创建、插入和修改。
- 三元运算符的使用，Date对象的API。
- JavaScript的style API只能操作HTML元素的内联样式。
