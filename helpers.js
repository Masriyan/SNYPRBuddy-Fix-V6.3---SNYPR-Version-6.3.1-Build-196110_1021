var tagAndCheck = function(elem, tagname="ASURONIX-DEFAULT-TAG") { 
	// Check if this element is tagged with SNYPRBuddy enhancements
	// If not, tag it, return false
	// If so, return true 
	
	// Helper function to determine if we already enhanced something and to avoid doing it again
	if (elem.querySelector("#" + tagname) == null) {
		elem.insertAdjacentHTML('beforeend', `<span id="${tagname}"></span>`);
		return false;
	}
	
	return true;
}

// Based off https://stackoverflow.com/questions/37374117/continuously-check-if-something-exists-and-do-something
// Made to be as "efficient as possible"
var waitForElementToExist = function(elem, selector, func) {
	
	var observer = new MutationObserver(function(mutations){
		mutations.forEach(function(mutation){
			for (var i = 0;i < mutation.addedNodes.length;i++) {
								
				// The bread and butter, find if the addedNode[i] matches the querySelector
				if (mutation.addedNodes[i].querySelector) {
					
					var elementToFind = (mutation.addedNodes[i]).querySelector(selector);
					
					if (elementToFind) {
						func(elementToFind);
						//observer.disconnect();
					}
				}
			}
		});
	});
	
	observer.observe(elem, {childList: true, subtree: true});
}

var observeElementAndReapply = function(elem, func, initialapply = false, observeOptions={childList:true, subtree:false}, tagit=false) {
	
	// Run the function a first time prior to observing for changes
	if (initialapply) {
		if (tagit) {
			tagAndCheck(elem);
		}
		func.call(elem);
	}
	
	// Monitor an element for replacement for changes using new fangled way
	var observer = new MutationObserver(function(mutations) {
		console.log("Observations seen - reloading func");
		
		if (tagit) {
			if (!tagAndCheck(elem)) {
				func.call(elem);
			}
			else {
				console.log("Skipping func due to tag present");
			}
		}
		else {
			func.call(elem);
		}
		
		// DEBUG STATEMENT
		/*
		injectScript(function() {
			showNotification([{'success': 'This page is SNYPRBuddy Enhanced'}]);
		});
		*/
	});

	observer.observe(elem, observeOptions)
}

var acceptableTimeDelay = function(seconds) {
		
	// Returns CSS class based on time delay (in seconds)
	var none = 'time-delay-high';
	
	// Negative times treated as issue and show high
	var map = {
		0: 'time-delay-high',
		3600: 'time-delay-low',
		7200: 'time-delay-med',
	}
	
	for (var key of Object.keys(map)) {
		if (seconds < key) {
			return map[key];
		}
	}
	
	// Otherwise return worst
	return none;
}

// Helper function to run code in-page with access to vanilla scripts
// Based off https://stackoverflow.com/a/9517879
// Augmented with complete example of injecting parameters as JSON
// Is this a hack? You be the judge!
var injectScript = function(func, injected_obj={}) {
	var actualCode = '(' + func + ')(' + JSON.stringify(injected_obj) +')';
	var script = document.createElement('script');
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);
	script.remove();
}

// Helper function
// Based off a horrible reference that won't be named!
var secondsToHHMMSS = function(time_in_seconds) {
	var negative = false;
	
	if (time_in_seconds < 0) {
		negative = true;
		time_in_seconds = Math.abs(time_in_seconds);
	}
	
	// Don't care about decimal
	var sec_num = time_in_seconds.toFixed();
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60
	
	var resString = [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":");
		
	if (negative) {
		// If somehow the string is negative, inform the user via a change in string text
		resString = "-" + resString + " [Last Event Time in the Future - Validate Config]";
	}

    return resString;
}

// Helper function to find the element on the page based off the text it contains
function findElementsByInnerText(selector, text) {
  var elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function(element){
    return RegExp(text).test(element.textContent);
  });
}

// Helper to get value from object or return a default
var getOrDefault = function(obj, key, def=null) {

	// Return it if it exists by key
	if (obj.hasOwnProperty(key)) {
		return obj[key];
	}
	
	// Otherwise return the default
	return def;
};

// Sam Bonus From
// https://codereview.stackexchange.com/questions/112813/reduce-array-of-objects-into-object-of-arrays
// Modified to leverage serializeArray
// Requires serializeArray.js
var serializeObject = function (form) {

	var result = serializeArray(form).reduce(function(result, item){
		result[item.name] = (result[item.name] || []).concat(item.value);
		return result;
	}, {});
	
	return result;

}

// Modified version where I can assume there's only 1 of each type, and overwrite otherwise
var serializeObjectOneElement = function (form) {

	var result = serializeArray(form).reduce(function(result, item){
		result[item.name] = item.value;
		return result;
	}, {});
	
	return result;

}

// https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

// Copy to Clipboard from Extension
// Arbitrary string
// https://stackoverflow.com/questions/3436102/copy-to-clipboard-in-chrome-extension
function copyTextToClipboard(text) {
	//Create a textbox field where we can insert text to. 
	var copyFrom = document.createElement("textarea");

	//Set the text content to be the text you wished to copy.
	copyFrom.textContent = text;

	//Append the textbox field into the body as a child. 
	//"execCommand()" only works when there exists selected text, and the text is inside 
	//document.body (meaning the text is part of a valid rendered HTML element).
	document.body.appendChild(copyFrom);

	//Select all the text!
	copyFrom.select();

	//Execute command
	document.execCommand('copy');

	//(Optional) De-select the text using blur(). 
	copyFrom.blur();

	//Remove the textbox field from the document.body, so no other JavaScript nor 
	//other elements can get access to this.
	document.body.removeChild(copyFrom);
}

// Parse a datetime with an optional timezone added
var parseSpotterTimeZoneAware = function(str, timezone = "") {
	
	// Use the format we assume so far
	var parsed = moment(str, 'ddd MMM D hh:mm:ss z YYYY');
	
	// Attempt to parse with a timezone
	// Otherwise fallback to without it 
	// This is due to non-standard timezone formats in Securonix app
	// Try to parse the timestamp else just do whatever
	try {
		parsed.tz(timezone, true);
	} catch {}
		
	return parsed;
}

// Currently just base64 encode/decode but could change
// https://stackoverflow.com/questions/28100601/decode-url-safe-base64-in-javascript-browser-side
var urlSafeEncode = function(query) {
	return btoa(query).replace(/\//g, '_').replace(/\+/g, '-');
};

var urlSafeDecode = function(query) {
	return atob(query.replace(/_/g, '/').replace(/-/g, '+'));
};

var replaceAppendToURL = function(urlstring, newparam, newvalue) {
	// Given a URL string
	// We want to add another GET param to it
	// But we want to replace if there already exists one
	
	// Parse
	var url = new URL(urlstring);
	
	// The set() method of the URLSearchParams interface sets the value associated with a given search parameter to the given value. 
	// If there were several matching values, this method deletes the others. If the search parameter doesn't exist, this method creates it.
	url.searchParams.set(newparam, newvalue);
	
	// Return the URL
	return url.href;
}

// Config to Spotter for Conditions
var conditionConversionMap = {
	'CONDITION_EQUALS': '=',
	'CONDITION_NOT_EQUALS': '!=',
	'CONDITION_CONTAINS': 'CONTAINS',
	'CONDITION_DOES_NOT_CONTAIN': 'NOT CONTAINS',
	'CONDITION_GREATER_THAN': '>',
	'CONDITION_LESS_THAN': '<',
	'CONDITION_GREATER_THAN_OR_EQUALS': '>=',
	'CONDITION_LESS_THAN_OR_EQUALS': '<=',
	'CONDITION_IS_NULL': 'NULL',
	'CONDITION_IS_NOT_NULL': 'NOT NULL',
	'CONDITION_STARTS_WITH': 'STARTS WITH',
	'CONDITION_ENDS_WITH': 'ENDS WITH',
	'CONDITION_DOES_NOT_START_WITH': 'NOT STARTS WITH',
	'CONDITION_DOES_NOT_END_WITH': 'NOT ENDS WITH'
	// For now not the regex ones
	//'CONDITION_REGEX_EQUALS': '',
	//'CONDITION_REGEX_NOT_EQUALS': ''
}

var helperHash = function(text, format="HEX") {
	// Essentially this logic can never change for this to remain consistent
	
	var salt = "SamuelPrashkerCreatedMe"
	
    var shaObj = new jsSHA("SHA-512", "TEXT");
	shaObj.update(text+salt);
	
    return shaObj.getHash(format);
}

var generateIconSVGfromText = function(text, options) {
	
	// Relies on helperHash
	// DO NOT CHANGE THIS UNLESS IT IS BROKEN
    var hash = helperHash(text, "HEX");
	
    var data = new Identicon(hash, options).toString();

	return data;
}

var cssPathForElement = function(el) {
	// Given a element, find its CSS path/generate it
	if (!(el instanceof Element)) 
		return;
	var path = [];
	while (el.nodeType === Node.ELEMENT_NODE) {
		var selector = el.nodeName.toLowerCase();
		if (el.id) {
			selector += '#' + el.id;
			path.unshift(selector);
			break;
		} else {
			var sib = el, nth = 1;
			while (sib = sib.previousElementSibling) {
				if (sib.nodeName.toLowerCase() == selector)
				   nth++;
			}
			// Hack - We care about explicitly stating if nth == 1
			// if (nth != 1)
			selector += ":nth-of-type("+nth+")";
		}
		path.unshift(selector);
		el = el.parentNode;
	}
	return path.join(" > ");	
}

var getLoginUsername = function() {
	// Rely on the logged-in-user
	// This may change somehow in the future	
	return document.querySelector('.logged-in-user').innerText.toLowerCase();
}

var unixtime = function() {
	return Math.round((new Date()).getTime() / 1000);
}

var persistentCacheFunction = function(cache_identifier, expiry_in_seconds, stale_func, fresh_func) {
	// Allows you to cache the results of a certain function
	// If the data is stale, refresh it with the stale_func
	// If the data is fresh, use it for the fresh_func
	// If the fresh func fails, delete the key (to avoid clogging localStorage)
	var CACHE_TS_KEY = cache_identifier + '_CACHE_TS';
	var CACHE_DATA_KEY = cache_identifier + '_CACHE_DATA';
	
	try {
		chrome.storage.local.get([CACHE_TS_KEY, CACHE_DATA_KEY], function(result) {
			
			var stored_ts = result[CACHE_TS_KEY];
			var stored_data = result[CACHE_DATA_KEY];
			
			// Default is to refresh unless we have a reason not to
			var retrieveFresh = true;
			
			if (stored_ts != undefined && stored_data != undefined) {
				// If there is stored values
				// Check how much time has elapsed and only refresh if it is expired
				var now = unixtime();
				var sinceTS = unixtime() - stored_ts;
				
				if (sinceTS > expiry_in_seconds) {
					console.log(cache_identifier + " - Cache expired");
				}
				else {
					console.log(cache_identifier + " - Cache valid - expires in " + (expiry_in_seconds-sinceTS) + " seconds");
					retrieveFresh = false;
				}
			}
			else {
				// IF we have never seen the cache before or some other edge case
				console.log(cache_identifier + " - No cache");
			}
			
			// If the cache is stale
			if (retrieveFresh) {
				
				Promise.resolve(stale_func()).then(data => {	
				
					// Persist updated values to localStorage
					var newobj = {};
					newobj[CACHE_TS_KEY] = unixtime();
					newobj[CACHE_DATA_KEY] = data;
					chrome.storage.local.set(newobj);
					
					console.log(cache_identifier + " - Expired cache refreshed via stale_func");
					
					// Call the fresh function with the newly retrieved (now fresh) data
					fresh_func(data);
					
				})
				.catch(function(err) {	
					console.log(cache_identifier + " - Stale Func Failure - Deleting cache"); 
					chrome.storage.local.remove([CACHE_TS_KEY, CACHE_DATA_KEY]);
					console.error(err);
				});
				
			}
			else {				
				console.log(cache_identifier + " - Loaded via cache");
				
				// Call the fresh_func with the cached parameter
				fresh_func(stored_data);
			}
		});
	}
	catch (e) {
		console.log(cache_identifier + ' - General error');
		console.log(e);
	}
}
	
var getCSRFToken = function() {
	return document.querySelector('input[name="org.codehaus.groovy.grails.SYNCHRONIZER_TOKEN"]').getAttribute('value');
}

// Helper function to grab the Job Monitor page
var getJobMonitorStatsAsync = function() {
	// Currently extracting data in the form of
	// { datasourcename: {...attributes...} }
	
	return fetch("/Snypr/viewJobs/showJobByConnectionType", {
		"credentials": "include",
		"headers": {
			"accept": "*/*",
			"accept-language": "en-US,en;q=0.9",
			"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
			"org.codehaus.groovy.grails.synchronizer_token": getCSRFToken(),
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
			"x-requested-with": "XMLHttpRequest"
		},
		"body": "checkToken=true&escapeLoadingEnd=false&controller=viewJobs&offset=0&max=100&currentpage=1&escapeLoadingStart=false&sort=creationTime&action=showJobByConnectionType&countType=user&divid=byOtherJobsWrapper&jobsViewBy=Jobs+By+Connection+&order=desc&ingesternamerequestid=&org.codehaus.groovy.grails.SYNCHRONIZER_TOKEN=" + getCSRFToken(),
		"method": "POST",
		"mode": "cors"
	}).then(function(response) {		
		// This is returning just HTML
		return response.text();	
		
	}).then(function(html) {
		
		// Initialize the DOM parser and parse the page
		var parser = new DOMParser();
		var doc = parser.parseFromString(html, "text/html");
		
		var jobs = doc.querySelectorAll('#replace-tobody-content > tr');
		
		// Build a mapping of DS info
		// key: dsname - val: all attributes
		var dsInfo = {};
		
		for (var loop = 0; loop < jobs.length; loop++) {
			var jobRow = jobs[loop];
						
			var dsAttributes = {};
			
			// Jobs Details Column
			var jobdetailsAttributes = jobRow.querySelectorAll('td:first-child div.dsname-label');
			for (var attr_loop = 0; attr_loop < jobdetailsAttributes.length; attr_loop++) {
				var datasourceAttribute = jobdetailsAttributes[attr_loop];
				
				var key = datasourceAttribute.querySelector('.sub-title-display-inline');
				var value = datasourceAttribute.querySelector('.sub-title-value');
				
				// The keys are a weird "TEXTWITHCOLON :" thing, so we strip the colon and trim
				if (key && value) {
					dsAttributes[key.innerText.replace(':', '').trim()] = value.innerText.trim();
				}
			}
			
			// Schedule Details Column
			var scheduledetailsAttributes = jobRow.querySelectorAll('td:nth-child(2) > div');
			for (var attr_loop = 0; attr_loop < scheduledetailsAttributes.length; attr_loop++) {
				var datasourceAttribute = scheduledetailsAttributes[attr_loop];
				
				var key = datasourceAttribute.querySelector('.sub-title');
				var value = datasourceAttribute.querySelector('.countvalue');
				
				// The keys are a weird "TEXTWITHCOLON :" thing, so we strip the colon and trim
				
				// Special Schedule Blog
				// For some reason the data can have "WEIRD      LONG SPACES BETWEEN         WORDS"
				// So we regex it out instead of trim()
				if (key && value) {
					dsAttributes[key.innerText.replace(':', '').trim()] = value.innerText.replace(/\s\s+/g, ' ');
				}
				
			}
			
			if (dsAttributes['Datasource Name'] != null) {
				dsInfo[dsAttributes['Datasource Name']] = dsAttributes; 
			}
		}
		
		console.log(dsInfo);
		
		return dsInfo;
	});
}

var versionSpecific = function(versionBlurb, fallback) {
	// Helper function to execute code targeting a specific version
	// This will allow me to logically separate divergent code based off version
	
	// versionBlurb must be a map conforming to 
	// {
	//	'6.2.1': function() { ... }
	//	'6.2.2': function() { ... }
	// }
	
	var version = document.querySelector('.footer .version');
	
	console.log('Version specific code -- checking');
	
	if (version) {
		
		var versionStr = version.innerText;
		
		// Loop through every version key
		// See if it is contained in the version text
		
		for (var key of Object.keys(versionBlurb)) {
			if (versionStr.match(key)) {
				console.log('Version specific code: ' + key);
				
				// If we found then execute and return results
				return versionBlurb[key]();
			}
		}
		
		if (fallback) {
			if (versionBlurb[fallback]) {
				console.log('Version specific code - fallback: ' + fallback);
				return versionBlurb[fallback]();
			}
		}
	}
	
	return null;
}

var spotterQueryToSearchURL = function(querystr) {
	// Given a spotter query, return a searchable URL
	
	// Get the href for Spotter page (this way is easy)
	var spotterURL = findElementsByInnerText('.mega-menu-ul-wrap li a', 'Spotter');
	
	//console.log("Generating Spotter URL from: " + querystr);

	if (spotterURL.length != 0) {
		return encodeURI(spotterURL[0].href + '&' + SEARCH_BY_RAW_QUERY + '=' + urlSafeEncode(querystr));
	}
	
	return null;	
}

var attachTimer = function(elemSelector, preTXT, postTXT) {

	var totalSeconds = 0;
	
	var genTimeString = function() {
		return `${preTXT} ${totalSeconds} ${postTXT}`;
	}

		
	var timerFunc = function() {
		++totalSeconds;
				
		var elem = document.querySelector(elemSelector);
		
		var timerElem = elem.querySelector('.timer');
		
		if (timerElem) {
			elem.querySelector('.timer').innerHTML = genTimeString();
		}
		else {
			elem.insertAdjacentHTML('beforeend', `
				<span class="timer">${genTimeString()}</span>
			`);
		}		
	}
	
	var resetTimer = function() {
		totalSeconds = 0;
	}
	
	setInterval(timerFunc, 1000);
	
	return resetTimer;
}