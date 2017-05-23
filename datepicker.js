var main = document.getElementById("datepicker");
var btn = document.getElementsByTagName("button");
var yearPanel = document.getElementById("yearPanel");
var years = document.getElementById("js-year-toSelect");
var monthPanel = document.getElementById("monthPanel");
var months = document.getElementById("js-month-toSelect");
var datePanel = document.getElementById("datePanel");
var dates = document.getElementById("js-date-toSelect");
var buf = dates.innerHTML;

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
document.body.addEventListener("click", function(ev){
	if(yearPanel.style.display == "block" || monthPanel.style.display == "block" || datePanel.style.display == "block"){
		yearPanel.style.display = "none";
		monthPanel.style.display = "none";
		datePanel.style.display = "none";
	}
	years.innerHTML = '';
	months.innerHTML = '';
	dates.innerHTML = buf;
	ev.stopPropagation();
}, false)

document.getElementsByClassName("prev")[0].addEventListener("click", function(ev){
	year -= 12;
	years.innerHTML = '';
	yearRender();
	ev.stopPropagation();
});
document.getElementsByClassName("next")[0].addEventListener("click", function(ev){
	year += 12;
	years.innerHTML = '';
	yearRender();
	ev.stopPropagation();
});

main.addEventListener("click", function(event){
	if(yearPanel.style.display == "none" ){
		if(monthPanel.style.display !== "block" && datePanel.style.display !== "block"){
			yearPanel.style.display = "block";
			yearRender();
		}
	}
	else if(monthPanel.style.display == "block"){
		monthPanel.style.display = "block";
	}
	else if(datePanel.style.display == "block"){
		datePanel.style.display = "block";
	}
	else {
		years.innerHTML = '';
		yearRender();
	}
	event.stopPropagation();
	
}, false);

years.addEventListener("click", function(ev){
	var ev = ev || window.event;
	selected.year = parseInt(ev.target.innerText);
	monthRender();
	yearPanel.style.display = "none";
	monthPanel.style.display = "block";
	ev.stopPropagation();
	function monthRender(){
		for(let i = 1;i < 13;i ++){
			let oneSpan = document.createElement("span");
			oneSpan.setAttribute("class", "item");
			let textNode = document.createTextNode(i + "月");
			oneSpan.appendChild(textNode);
			months.appendChild(oneSpan);
		}
	}
}, false);

monthPanel.addEventListener("click", function(ev){
	var ev = ev || window.event;
	selected.month = parseInt(ev.target.innerText);
	monthPanel.style.display = "none";
	datePanel.style.display = "block";
	dateRender();
	ev.stopPropagation();
	function dateRender(){
		dateObj.setYear(selected.year);
		dateDelta.setYear(selected.year);
		dateObj.setMonth(selected.month - 1);
		dateDelta.setMonth(selected.month);
		dateObj.setDate(1);
		dateDelta.setDate(1);
		var dayDelta = Math.floor((dateDelta - dateObj) / (1000 * 60 * 60 * 24));
		var flag = dateObj.getDay();
		var rows = Array.from(document.getElementsByClassName("row"));
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
});

dates.addEventListener("click", function(ev){
	var ev = ev || window.event;
	selected.day = parseInt(ev.target.innerText);
	datePanel.style.display = "none";
	main.placeholder = String(selected.year) + '-' + selected.month + '-' + (selected.day < 10 ? ('0' + String(selected.day)) : String(selected.day));
	years.innerHTML = '';
	months.innerHTML = '';
	dates.innerHTML = buf;
	ev.stopPropagation();
});
function yearRender(){
		for(let i = year - 5;i < year + 7;i ++){
			let oneSpan = document.createElement("span");
			oneSpan.setAttribute("class", "item");
			let textNode = document.createTextNode(i);
			oneSpan.appendChild(textNode);
			years.appendChild(oneSpan);
		}
	}
