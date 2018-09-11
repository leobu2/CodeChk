
var region_name; //"Taipei City"
var country_name;//"Taiwan"
var latitude;//25.0478 (緯度)
var longitude;	//121.5318 (經度)
var ip;//192.168.1.1
var UserName;
var UserID =;
var UserFlag = 0;
var isUserCorrect;
/* 
$.cookie('the_cookie'); // 獲得cookie
$.cookie('the_cookie', 'the_value'); // 設定cookie
$.cookie('the_cookie', 'the_value',{path:'/'}); // 設定cookie為整個網站有效
$.cookie('the_cookie', 'the_value', { expires: 7 }); //設定cookie有效時間7天
$.cookie('the_cookie', '', { expires: -1 }); // 删除
$.cookie('the_cookie', null); // 删除 cookie
$.cookie('the_cookie', 'the_value', {expires: 7, path: '/', domain: 'jquery.com', secure: true});//新建一個cookie 包括有效期 路徑 域名等
 */
 
function getPosition(){//新增內容for cookie testing-2018.09.10 17:15
/* 
	$.cookie('UserID',null);
	$.cookie('UserName',null);
	alert(confirm('是/否？'));
 */	
	UserID = $.cookie('UserID');
	UserName = $.cookie('UserName');
	isUserCorrect = confirm('請問工號以及姓名是否正確?\n\n '+ 'S' + UserID + '\n' + UserName);
	if(isUserCorrect){
		alert('歡迎使用!\n' + $.cookie('UserID')+ '\n' + $.cookie('UserName'));
	}else{
		$.cookie('UserID', '', { expires: -1 });
		$.cookie('UserName','', { expires: -1 });
	}
	
	if($.cookie('UserID')== null){
		UserID = UserID + prompt('===使用者認證===\n\n請輸入工號(不需英文)');
		$.cookie('UserID', UserID, {expires: 888, path: '/'});
		UserFlag = 1;
	}else{
		UserID = $.cookie('UserID');
	}
	
	if($.cookie('UserName')== null){
		UserName = prompt('===使用者認證===\n\n請輸入中文全名');
		$.cookie('UserName', UserName, {expires: 888, path: '/'});		
		UserFlag = 1;
	}else{
		UserName = $.cookie('UserName');
	}
	
	if (UserFlag == 1 ){
	alert('歡迎使用! ' + '[' + UserID + ' ' + UserName + ']');
	}
			
	

}//KEEP THIS FUNCTION FOR HTML PAGE USE



function myFunInput(UserEnter,title){
		
	appUrl = "https://script.google.com/macros/s/AKfycbxzZTtlQrGpENBGfgF50cwMwq3jgf67XBsFmNz5jQTSn8TTw15V/exec";
	var Today = new Date();
	
	$.getJSON("https://ip-api.io/json/",	
    		function(result) {
			console.log(result);
			region_name = result.region_name;		
			country_name = result.country_name;
			latitude = result.latitude;
			longitude = result.longitude;
			ip = result.ip;
			var data = [[Today,title,UserEnter.toUpperCase(),region_name,country_name,latitude,longitude,ip,UserID,UserName]];
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
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));
