function DatePicker(){
	//这里套一层作用域是为了使选择年份的两个按钮可以记住上次渲染的年份范围;
	var datepick = document.getElementById("datepick");
	var a = 1;
	var today = new Date();
		dateObj = new Date();
		dateDelta = new Date();
		year = today.getFullYear();
		month = today.getMonth() + 1;
		date = today.getDate();
	var selected = {
		'year':0,
		'month':0,
		'day':0,
		'getYear':function(){
			return this.year;
		},
		'getMonth':function(){
			return this.month;
		},
		'getDate':function(){
			return this.day;
		}
	}
	function initializeRender(){
		var panel = eleRender("div", "");
		panel.id = "yearPanel";
		panel.style.display = "none";
		var title = eleRender("div", "");
		title.className = "datetitle";
		var ele = eleRender("button", "<");
		ele.className = "prev";
		title.appendChild(ele);
		ele = eleRender("p", "");
		ele.className = "range";
		title.appendChild(ele);
		ele = eleRender("button", ">");
		ele.className = "next";
		title.appendChild(ele);
		panel.appendChild(title);
		title = eleRender("div", "");
		title.className = "toSelect yearToSelect";
		title.id = "js-year-toSelect";
		panel.appendChild(title);
		datepick.appendChild(panel);
		panel = eleRender("div", "");
		panel.id = "monthPanel";
		panel.style.display = "none";
		title = eleRender("div", "");
		title.className = "toSelect monthToSelect";
		title.id = "js-month-toSelect";
		panel.appendChild(title);
		datepick.appendChild(panel);
		panel = dateInit();
		datepick.appendChild(panel);
	}
	function eleRender(eleName, text){
		var ele = document.createElement(eleName);
		var textNode = document.createTextNode(text);
		ele.appendChild(textNode);
		return ele;
	}
	function dateInit(){
		var dateHead = eleRender("div", "");
		var datePanel = eleRender("div", "");
		datePanel.id = "datePanel";
		datePanel.style.display = "none";
		dateHead.className =  "dateHead";
		for(let i of ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]){
			let oneSpan = eleRender("span", i);
			oneSpan.setAttribute("class", "dateHeader");
			dateHead.appendChild(oneSpan);
		}
		var date2Select = eleRender("div", "");
		date2Select.className = "dateToSelect toSelect";
		date2Select.id = "js-date-toSelect";
		for(let i = 0;i < 6;i ++){
			let oneSpan = eleRender("div", "");
			oneSpan.className = "Row";
			date2Select.appendChild(oneSpan);
		}
		datePanel.appendChild(dateHead);
		datePanel.appendChild(date2Select);
		return datePanel;
	} 
	function yearRender(){
		var yearPanel = document.getElementById("yearPanel");
		var years = document.getElementById("js-year-toSelect");
		years.innerHTML = '';
		for(let i = year - 5;i < year + 7;i ++){
			let oneSpan = document.createElement("span");
			oneSpan.setAttribute("class", "yearItem");
			let textNode = document.createTextNode(i);
			oneSpan.appendChild(textNode);
			years.appendChild(oneSpan);
		}
	}
	function monthRender(){
		var monthPanel = document.getElementById("monthPanel");
		var months = document.getElementById("js-month-toSelect");
		for(let i = 1;i < 13;i ++){
			let oneSpan = document.createElement("span");
			oneSpan.setAttribute("class", "monthItem");
			let textNode = document.createTextNode(i + "月");
			oneSpan.appendChild(textNode);
			months.appendChild(oneSpan);
		}
	}
	function dateRender(){
		var datePanel = document.getElementById("datePanel");
		var dates = document.getElementById("js-date-toSelect");
		dateObj.setYear(selected.year);
		dateDelta.setYear(selected.year);
		dateObj.setMonth(selected.month - 1);
		dateDelta.setMonth(selected.month);
		dateObj.setDate(1);
		dateDelta.setDate(1);
		var dayDelta = Math.floor((dateDelta - dateObj) / (1000 * 60 * 60 * 24));
		var flag = dateObj.getDay();
		var rows = Array.from(document.getElementsByClassName("Row"));
		var count = 1;
		for(let i = 0;i < rows.length;i ++){
			for(let j = 0;j < 7;j ++){
				let oneSpan = document.createElement("span");
				oneSpan.setAttribute("class", "dateItem");
				if(i == 0){
					var textNode = document.createTextNode(j < flag ? '' : String(count));
					j < flag ? count = count : count ++;
				}
				else {
					var textNode = document.createTextNode(count > dayDelta ? '' : String(count));
					count > dayDelta ? count = count : count ++;
				}
				oneSpan.appendChild(textNode);
				rows[i].appendChild(oneSpan);
			}
		}
	}
	document.body.addEventListener("click", function (ev){
		if(datepick.innerHTML != ''){
			var yearPanel = document.getElementById("yearPanel");
			var years = document.getElementById("js-year-toSelect");
			if(yearPanel.style.display == "block" || monthPanel.style.display == "block" || datePanel.style.display == "block"){
			yearPanel.style.display = "none";
			monthPanel.style.display = "none";
			datePanel.style.display = "none";
			datepick.innerHTML = '';
			ev.stopPropagation();
			}
		}		
	}, false);
	document.getElementById("datepicker").addEventListener("click", function (ev){
		if(datepick.innerHTML == ''){	
			initializeRender();
			ev.stopPropagation();
			}
		if(yearPanel.style.display == "none" ){
			if(monthPanel.style.display !== "block" && datePanel.style.display !== "block"){
				yearPanel.style.display = "block";
				year = today.getFullYear();
				yearRender();
				ev.stopPropagation();
				}
			}
			else if(monthPanel.style.display == "block"){
				monthPanel.style.display = "block";
				ev.stopPropagation();
			}
			else if(datePanel.style.display == "block"){
				datePanel.style.display = "block";
				ev.stopPropagation();
			}
			else {
				years.innerHTML = '';
				year = today.getFullYear();
				yearRender();
				ev.stopPropagation();
			}
		}, false);
	datepick.addEventListener("click", function(ev){
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;
		switch(target.className){
				case ("prev"):{
					year -= 12;
					yearRender();
					ev.stopPropagation();
					break;
				}
				case("next"):{
					year += 12;
					yearRender();
					ev.stopPropagation();
					break;
				}
				case("yearItem"):{
					selected.year = parseInt(target.innerText);
					monthRender();
					yearPanel.style.display = "none";
					monthPanel.style.display = "block";
					ev.stopPropagation();
					break;
				}
				case("monthItem"):{
					selected.month = parseInt(ev.target.innerText);
					dateRender();
					monthPanel.style.display = "none";
					datePanel.style.display = "block";
					ev.stopPropagation();
					break;
				}
				case("dateItem"):{
					selected.day = parseInt(ev.target.innerText);
					datePanel.style.display = "none";
					document.getElementById("datepicker").placeholder = String(selected.year) + '-' + selected.month + '-' + (selected.day < 10 ? ('0' + String(selected.day)) : String(selected.day));
					ev.stopPropagation();
					datepick.innerHTML = '';
					break;
				}
			}
	}, false);
	return selected;
}
var data = DatePicker();