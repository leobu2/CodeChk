
var region_name; //"Taipei City"
var country_name;//"Taiwan"
var latitude;//25.0478 (緯度)
var longitude;	//121.5318 (經度)
var ip;//192.168.1.1
var UserName;
var UserID;
var UserFlag = 0;
var isUserCorrect;
var picName;
var	finalData;
/*
	if(confirm('您要刪除工號以及姓名的Cookie嗎?')){
		Cookies.remove('UserID');
		Cookies.remove('UserName');
		alert('===已刪除Cookie===\n目前UserID的值為: ' + UserID + '\n目前UserName的值為: ' + UserName);
	}else{
		alert('===不刪除Cookie===\n目前UserID的值為: ' + UserID + '\n目前UserName的值為: ' + UserName);
	}
*/
/* 	function read_finalData(){
		var r = finalData;
		return r;
	} */
	
	function openNav(cls) {
		if (cls == "HW"){
			document.getElementById("hw-Waiting").style.display = "block";
		}else if(cls == "SW"){
			document.getElementById("sw-Waiting").style.display = "block";
		}	  
	}

	function closeNav(cls) {
		if (cls == "HW"){
			document.getElementById("hw-Waiting").style.display = "none";
		}else if(cls == "SW"){
			document.getElementById("sw-Waiting").style.display = "none";
		}	  

	}


	function goBack(){
			
		var w = localStorage.getItem('who');
		if (w == "HW"){
			self.location.href="HwErrorCodeSS.html";					
		}else if (w == "SW"){			
			self.location.href="SwErrorCodeSS.html";	
		}

	}
	function readSS(cls,sheet,title_chk,type,sRow,sCol){	
		
		
		////////////// 決定 sheet---開始
		//試算表共用後複製出來的連結
		var hw_code = "https://docs.google.com/spreadsheets/d/191ebFViUYDTgbCD4wyyqP1RkNxl1lTPnMIlgJOePP6o/edit?usp=sharing";
		var sw_code = "https://docs.google.com/spreadsheets/d/1cpX0tQd2ynPX92CrIuVurxVDVu-6R9qQCReXwD1YL6s/edit?usp=sharing";
		
		if (cls == "HW"){
			var 網址 = hw_code;						
		}else if (cls == "SW"){			
			var 網址 = sw_code;			
		}
		console.log("網址= " + 網址 );
		
		//////////////  決定 sheet---結束
		
		var 客戶 = sheet; //sheet name
		var 欄名 = title_chk; //查哪個標題
		var 代碼 = ""; //查詢值
		var 模糊 = type; // 0=模糊搜尋； 1=精準搜尋
		var 開始行 = sRow; //行 (1234....) -row 直
		var 開始列 = sCol; //列 (ABCD....) - coulmn 橫	
		
		代碼 = prompt("請輸入錯誤碼");
		//self.location="wait.html";
		//localStorage.setItem('final',"");
		localStorage.setItem('who',cls);
		console.log("代碼=" & 代碼);
		
		//如果按取消就離開
		if (代碼 == null ){
			return;
		}else if  (代碼 == ""){
			alert("未輸入值!");
			return;
		}
		
		openNav(cls);
		
		
		var parameter = {
			name: 客戶,
			keyValue: 代碼,
			url: 網址,
			keyName: 欄名,
			searchType: 模糊,
			startRow: 開始行,
			startColumn: 開始列,
		};
		console.log("代碼= " + 代碼);
			
		//$.ajaxSettings.async = false;
			
		$.get('https://script.google.com/macros/s/AKfycbx0oNiTZFqCTNapVYzLvhMo41R-xHQ2d6nhVd2fQvL1t1GiD5NUtyjOsXuNfjbGNBKbDg/exec', parameter, function(data) {
			console.log(data);

				localStorage.setItem('final',data);
				closeNav(cls);
				
				
				//$.ajaxSettings.async = true;
				self.location.href="ShowResult.html";
				myFunInput(代碼,客戶,data);	
				
				
		});
	}
	
	
function getPosition(){ //新增內容for cookie testing-2018.09.10 17:15	
	
	if(Cookies.get('UserID')== null){
		UserID = prompt('===關於使用者===\n請輸入工號(不需英文)!');
		if(UserID == null){	
			alert('工號輸入錯誤(取消輸入)!');
			
			RETURN;
			
		}else if(UserID.length != 4){ //長度不等於4
			alert('工號輸入錯誤(不等於4碼)，請重新輸入!');
			getPosition();
			
		}else{ //長度等於4
			if(isNaN(UserID)){ //如包含非數字資料，則重輸入
				alert('工號輸入錯誤(包含非數字資料)，請重新輸入!');
				getPosition();
			}
			UserID = 'S' + UserID
			Cookies.set('UserID', UserID, {expires: 888});
			UserFlag = 1;
		}
	}else{
		UserID = Cookies.get('UserID');
	}
	
	
	if(Cookies.get('UserName')== null){
		UserName = prompt('===關於使用者===\n請輸入中文全名!');
		if(UserName == null){
			alert('姓名輸入錯誤(取消輸入)!');
			
			RETURN;
		}else if(UserName == ""){
			alert('姓名輸入錯誤(未輸入值)，請重新輸入!');
			getPosition();
		}else{
			Cookies.set('UserName', UserName, {expires: 888});		
			UserFlag = 1;
		}			
	}else{
		UserName = Cookies.get('UserName');
	}
	
	
	if (UserFlag == 1 ){
		alert('===資料輸入完成，謝謝===\n=====歡迎使用=====\n ' + UserID + '\n' + UserName);
		UserFlag = 0;
	}
			
	

}//KEEP THIS FUNCTION FOR HTML PAGE USE

/*
function FromSS(){
	appUrl = "https://script.google.com/macros/s/AKfycbxzZTtlQrGpENBGfgF50cwMwq3jgf67XBsFmNz5jQTSn8TTw15V/exec";
	url: "https://docs.google.com/spreadsheets/d/1trX7v1VnJi15k_oRFX4s2fCjVDKUqHCH3mXw5WnSv-A/edit?usp=sharing",
	var parameter = {
		url: url,
		name: '工作表1',
		startRow: 1,
		startColumn: 1,
	};
	
	$.post(appUrl, parameter, function(data) {
	console.log(data);
	});
}
*/

function myFunInput(UserEnter,title,User_result){
		
	appUrl = "https://script.google.com/macros/s/AKfycbxzZTtlQrGpENBGfgF50cwMwq3jgf67XBsFmNz5jQTSn8TTw15V/exec";
	          
	var Today = new Date();
	var sToday = Today.toString();
	var CookieArray = [];
	var i;
	//var User_result_before = User_result;
	var User_result_before = User_result.replace(/,/g,'.');
	UserEnter = UserEnter.toUpperCase()
	if (User_result != undefined && User_result != 'undefined'){
		User_result = User_result.replace(/\n/g,"<br/>");
	}
	
	//read cookie and write to memory
	for (i = 0; i < 20; i++) { 
		    CookieArray[i] =  Cookies.get('his_'+ i);
	}
	//read memory and write to next cookie
	for (i = 0; i < 20; i++) { 
		  Cookies.set('his_'+ (i+1), CookieArray[i] ,{expires: 888});
	}
	
	//全部搬完後，再把這次的值寫入第一個 ，也就是[0]
	Cookies.set('his_0', '查詢時間: ' + sToday.substring(0,24) + '<br>' + '查詢網頁: ' + title + '<br>' + '查詢代碼: ' + UserEnter + '<br>' + '查詢結果: '+ '<br>' + User_result + '<br><br>',{expires: 888});
	
	$.getJSON("https://ip-api.io/json/",	
    		function(result) {
			console.log(result);
			region_name = result.region_name;		
			country_name = result.country_name;
			latitude = result.latitude;
			longitude = result.longitude;
			ip = result.ip;
			var data = [[sToday.substring(0,24),title,UserEnter,region_name,country_name,latitude,longitude,ip,UserID,UserName,User_result_before]];
			var parameter = {
				url: "https://docs.google.com/spreadsheets/d/1trX7v1VnJi15k_oRFX4s2fCjVDKUqHCH3mXw5WnSv-A/edit?usp=sharing",
				name: "工作表1",
				data: data.toString(),
				row: data.length,
				column: data[0].length,
				insertType:"bottom",
			};
			$.get(appUrl, parameter);
    	});		 
}




/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));
