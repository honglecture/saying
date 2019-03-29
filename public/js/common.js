window.addEventListener("load", function(){
    var header = document.querySelector("#header");
    var headerButtons = document.querySelector("#header-buttons");
    header.onclick = function(e){
        var el = e.target;
        if(el.nodeName =="HEADER")
            header.classList.remove("menu-show");
        else 
            return;
    }; 
    headerButtons.onclick = function(e){
        header.classList.add("menu-show"); 
        e.stopPropagation();
    };
});


let sendPostRequest = (url, params, asyn, callback)=>{
	let request = new XMLHttpRequest();
	request.onload = function(e){ 
		if (request.status === 200) {
			let result = JSON.parse(request.responseText);
			callback(result);
		} else{  
			alert('request에 뭔가 문제가 있어요.');
		}  
	}
	request.open("post", url, asyn);
	request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	request.send(JSON.stringify(params));
}

let sendGetRequest = (url, params, asyn, callback)=>{
	let request = new XMLHttpRequest();
	request.onload = function(e){ 
		if (request.status === 200) {
			let result = JSON.parse(request.responseText);
			callback(result);
		} else{  
			alert('request에 뭔가 문제가 있어요.');
		}  
	}
	request.open("get", url+"?"+createQuerystring(params), asyn);
	request.send();
}

let blankToZero = (num)=>{
	if(num==0 || num=='' || num==undefined)
		return 0;
	return Number(num);
}

let blankToOne = (num)=>{
	if(num==0 || num=='' || num==undefined)
		return 1;
	return Number(num);
}

let nullToValue = (str, value)=>{
	if(str==0 || str=='' || str==undefined)
		return value;
	return str;
}

let createQuerystring = (params)=>{
	let qs = "";
	let size = 0;
	let temp = 0;
	for (let key in params){
		if (params.hasOwnProperty(key)) 
			size++;
	}
	for (let key in params) {
		temp++;
		qs += key + "=" + params[key];
		if(temp!=size)
			qs += "&";
	}
	return qs;
}

let getQueryStringObject = ()=>{
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

const memberRegex = {
	id : /^[A-Za-z0-9+]{1,15}$/,
	password : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\W\d]{6,20}$/,
	nickname : /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]{1,15}$/,
	email : /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
}

let regexCheck = (regex, value) => {
	return regex.test(value) ? true : false;
};

let regexAllCheck = (...args) => {
	for(let r of args){
		if(typeof(r) == 'object'){
			for(let v in r){
				if(r[v]==false)
					return false;
			}
		} else{
			if(r==false)
				return false;
		}
	}
	return true;
};

let removeClass = (e, className) => {
	e.classList.remove(className);
}