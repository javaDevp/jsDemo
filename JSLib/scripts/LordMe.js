/**
 * 自定义js库
 *
 * @author tang.bo
 * 
 */

//节点类型
var NodeType = {
	ELEMENT_NO: 1,
	TEXT_NO: 3
};
 
//判断n是否为为数值形式
function isNumeric(n){
	return !isNaN(parseFloat(n)) && isFinite(n);
}

//指定精度的四舍五入
function roundWithPrecision(n, precision){
	var divided = Math.pow(10, precision);
	return Math.round(n * divided) / divided;
}

//在min与max之间去浮点随机数
function getRandomFloat(min, max){
	return min + Math.random() * (max - min);
}

//在min与max之间去整型随机数
function getRandomInt(min, max){
	// return Math.round(Math.random(min - 0.5, max + 0.5));
	return Math.floor(min + Math.random() * (max + 1 - min));
}

//判断obj中是否存在key属性
function hasProperty(obj, key){
	return obj[key] !== undefined;
}

function findInArray(arr, value){
	if(Array.indexOf) return Array.indexOf(value);
	for(var i = 0, len = arr.length; i < len; i++){
		if(arr[i] === value){
			return i;
		}
	}
	return -1;
}

function camelize(str, separator){
	var strArr = str.split(separator);
	for(var i = 1, len = strArr.length; i < len; i++){
		strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
	}
	return strArr.join("");
}

function html2text(html){
	var ele = document.createElement("div");
	var text = document.createTextNode(html);
	ele.appendChild(text);
	return ele.innerHTML;
}

function remove(ele){
	return ele.parentNode.removeChild(ele);
}

function insertAfter(ele, refElem){
	return ele.parentNode.insertBefore(ele, refElem.nextSibling);
}

function removeChildren(ele){
	while(ele.lastChild){
		ele.removeChild(ele.lastChild);
	}
}

function createScript(url, cache){
	var script = document.createElement("script");
	script.src = url + "?param=" + (cache ? Math.random() : "");
	document.documentElement.children[0].appendChild(script);
}

function checkInside(ele, context){
	while(ele != content && ele){
		ele = ele.parentNode;
	}
	
	return !!ele;
}

function getStyle(ele, prop){
	if(window.getComputedStyle){
		var computedStyle = getComputedStyle(ele, null);
	} else {
		computedStyle = ele.currentStyle;
	}
	return computedStyle[prop];
}

function getOffset(ele){
	if(ele.getBoundingClientRect){
		return getOffsetRect(ele);
	} else {
		return getOffsetSum(ele);
	}
}

function getOffsetRect(elem) {
    // (1)
    var box = elem.getBoundingClientRect();
    
    var body = document.body;
    var docElem = document.documentElement;
    
    // (2)
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    
    // (3)
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;
    
    // (4)
    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
    
    return { top: Math.round(top), left: Math.round(left) };
}

function getOffsetSum(elem) {
  var top=0, left=0

  while(elem) {
    top = top + parseInt(elem.offsetTop)
    left = left + parseInt(elem.offsetLeft)
    elem = elem.offsetParent        
  }
   
  return {top: top, left: left}
}

function fixPageXY(e) {
  if (e.pageX == null && e.clientX != null ) { 
    var html = document.documentElement
    var body = document.body

    e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0)
    e.pageX -= html.clientLeft || 0
    
    e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0)
    e.pageY -= html.clientTop || 0
  }
}

function addEvent(ele, type, func){
	if(ele.addEventListener){
		ele.addEventListener(type, func, false);
	} else {
		ele.attachEvent("on" + type, func);
	}
}

function getEvent(event){
	return event || window.event;
}

function getTarget(event){
	return event.target || event.srcElement;
}

function stopPropagationM(event){
	event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
}

function preventDefaultM(event){
	event.preventDefault ? event.preventDefault() : (event.returnValue = false);
}

function fixWhich(e) {
  if (!e.which && e.button) {
    if (e.button & 1) e.which = 1      // Left
    else if (e.button & 4) e.which = 2 // Middle
    else if (e.button & 2) e.which = 3 // Right
  }
}

function getChar(event){
	if(event.which == null){
		return String.fromCharCode(event.keyCode);//IE
	} else if(event.which != 0 && event.charCode != 0){
		return String.fromCharCode(event.which);//other
	} else {
		return null;//special
	}
}

function inherit(proto){
	function F(){
	};
	F.prototype = proto;
	return new F();
}

function extend(child, parent){
	child.prototype = inherit(parent);
	child.prototype.constructor = child;
	child.parent = parent.prototype;
}

function bind(func, fixThis){
	return function(){
		return func.apply(fixThis, arguments);
	}
}

Function.prototype.bind = Function.prototype.bind || function(fixThis) {
  var func = this  
  return function() {
    return func.apply(fixThis, arguments)
  }
}

function Calendar(id, year, month) { 
  var elem = document.getElementById(id);
  var mon = month - 1;  // (1)
  var d = new Date(year, mon);
  var table = ['<table><tr>'];
  // (2) fill first row 
  //  0  1  2  3  4  5  6
  // 29 30 31| 1  2  3  4  
  for (var i=0; i<d.getDay(); i++) {
    table.push('<td></td>');
  } 
  // main body (3)
  while(d.getMonth() == mon) {
    table.push('<td>'+d.getDate()+'</td>');
    if (d.getDay() % 7 == 6) {   // (4)
      table.push('</tr><tr>');
    }  
    d.setDate(d.getDate()+1) ; 
  } 
  // (5) table tail
  for (var i=d.getDay(); i<7; i++) {
    table.push('<td></td>');
  } 
  table.push('</tr></table>');
  elem.innerHTML = table.join('\n');
}

function showMatch(str, reg){
	var res = [], matchs;
	while(true){
		matchs = reg.exec(str);
		if(matchs === null) break;
		res.push(matchs[0]);
		if(!reg.global) break;
	}
	alert(res);
}
