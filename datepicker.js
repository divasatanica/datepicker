function DatePicker(){
	//这里套一层作用域是为了使选择年份的两个按钮可以记住上次渲染的年份范围;
	var datepick = document.getElementById("container");
	var today = new Date();
		dateObj = new Date();
		dateDelta = new Date();
		year = today.getFullYear();
		month = today.getMonth() + 1;
		date = today.getDate();
	var selected = {
		'year':0,
		'month':0,
		'day':0
	} 
	datepick.addEventListener("click", function dateFunc(ev){
		var btn = document.getElementsByTagName("button");
		var yearPanel = document.getElementById("yearPanel");
		var years = document.getElementById("js-year-toSelect");
		var monthPanel = document.getElementById("monthPanel");
		var months = document.getElementById("js-month-toSelect");
		var datePanel = document.getElementById("datePanel");
		var dates = document.getElementById("js-date-toSelect");
		var ev = ev || window.event;

		years.innerHTML = '';
		months.innerHTML = '';
		dates.innerHTML = '';
		initialize();

		document.body.addEventListener("click", function (ev){
			if(yearPanel.style.display == "block" || monthPanel.style.display == "block" || datePanel.style.display == "block"){
				yearPanel.style.display = "none";
				monthPanel.style.display = "none";
				datePanel.style.display = "none";
			}
			initialize();
			ev.stopPropagation();
		}, false);
		var target = ev.target || ev.srcElement;
		switch(target.className){
				case ("datepicker"):{
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
						break;	
				}
				case ("prev"):{
					year -= 12;
					years.innerHTML = '';
					yearRender();
					ev.stopPropagation();
					break;
				}
				case("next"):{
					year += 12;
					years.innerHTML = '';
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
					//console.log(selected.day);
					document.getElementById("datepicker").placeholder = String(selected.year) + '-' + selected.month + '-' + (selected.day < 10 ? ('0' + String(selected.day)) : String(selected.day));
					ev.stopPropagation();
					break;
				}
			}
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
			function yearRender(){
				for(let i = year - 5;i < year + 7;i ++){
					let oneSpan = document.createElement("span");
					oneSpan.setAttribute("class", "yearItem");
					let textNode = document.createTextNode(i);
					oneSpan.appendChild(textNode);
					years.appendChild(oneSpan);
				}
			}
			function monthRender(){
				for(let i = 1;i < 13;i ++){
					let oneSpan = document.createElement("span");
					oneSpan.setAttribute("class", "monthItem");
					let textNode = document.createTextNode(i + "月");
					oneSpan.appendChild(textNode);
					months.appendChild(oneSpan);
				}
			}
			function dateRender(){
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
	}, false);
}
DatePicker();