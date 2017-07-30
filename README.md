# JS-Datepicker
原生JS编写的datepicker小插件

## 过程中遇到的问题
- 绝对定位元素包裹的子元素无法点击。解决方法是为绝对定位元素添加css样式：
```csss
{
	pointer-events:auto;
}
```


- 事件冒泡对父元素和子元素的事件监听器会有影响，会产生不想要的结果，使用``ev.stopPropagation()``来阻止事件冒泡传播。

- 作为一个插件使用时，外层input元素绑定事件监听函数func1， func1内部给浮动层元素也就是日历主体元素添加了事件监听函数func2，func3等等，如果在外部多次点击input函数，会多次执行func1，会重复添加事件监听func2，func3，对日历主体的点击事件会执行多次func2，func3函数，目前尚未解决。

## 学习到的东西
- 事件监听器的添加，事件委托，阻止冒泡，DOM节点的创建、插入和修改。
- 三元运算符的使用，Date对象的API。
- JavaScript的style API只能操作HTML元素的内联样式。

## May 24, 2017 11:23 PM
改进了事件绑定的方法，修改了上述第三个问题。
只对input元素所在的容器进行添加事件监听器，通过判断点击的元素的类名进行switch流控制，其余渲染过程不变，增加一个初始化函数：
```javascript
function initialize() {
	years.innerHTML = '';
	months.innerHTML = '';
	datePanel.innerHTML = '';
	var dateHead = document.createElement("div");
	dateHead.setAttribute("class", "dateHead");
	for(let i of ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]){
		let oneSpan = document.createElement("span");
		oneSpan.setAttribute("class", "dateHeader");
		let textNode = document.createTextNode(i);
		oneSpan.appendChild(textNode);
		dateHead.appendChild(oneSpan);
	}
	var date2Select = document.createElement("div");
	date2Select.setAttribute("class", "dateToSelect toSelect");
	date2Select.setAttribute("id", "js-date-toSelect");
	for(let i = 0;i < 6;i ++){
		let oneSpan = document.createElement("div");
		oneSpan.setAttribute("class", "Row");
		date2Select.appendChild(oneSpan);
	}
	datePanel.appendChild(dateHead);
	datePanel.appendChild(date2Select);
}
```
解决了重复渲染的问题。通过在整体外层再套一层函数作用域来记忆前一次年份渲染的范围。计划明天写一下完全组件化，即实现使用时只插入一个input函数，通过一个API渲染所需要的所有DOM元素，并添加数据API以获取选择的日期数据。

## May 25, 2017 10:03 AM
以上的问题都已经解决，实现了完全的组件化。使用说明会在另外一个markdown文件给出。
该日期组件的主体除input元素作为入口元素外，其余均使用JavaScriptDOM渲染插入现有页面，并且封装成一个DatePicker工厂函数(是为了添加数据API)，添加了数据API可以方便地取出选择好的日期数据。

这次的造轮子活动应该已经结束。
好像360浏览器非严格模式下不支持es6的语法。
