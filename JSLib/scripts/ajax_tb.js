/*var xmlHttp; //ajax请求对象
if(window.XMLHttpRequest){
	xmlHttp = new XMLHttpRequest();
}else{ //兼容IE5，IE6
	xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
}*/

/* Create a new XMLHttpRequest object to talk to the Web server */
var xmlHttp = false;
/*@cc_on @*/
/*@if (@_jscript_version >= 5)
try {
  xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e) {
  try {
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  } catch (e2) {
    xmlHttp = false;
  }
}
@end @*/
if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
  xmlHttp = new XMLHttpRequest();
}

xmlHttp.open("GET", url, true); //最后一个参数是否异步
xmlHttp.onreadystatechange = updatePage;
xmlHttp.send(null);

function updatePage(){
	if(xmlHttp.readyState == 4){
		var response = xmlHttp.responseText();
	}
}