var SEARCH_BY_RAW_QUERY = "q";
var QUICK_EDIT_QUERY = "quickEdit";

var devFunctions = function() {
	
	// Grab the "Security Dashboard" menu list
	var menuElem = document.querySelector('.section-li .mega-menu-ul-wrap ul');
	
	// Grab the CSRF token on the page
	var csrfElem = document.querySelector('input[name="org.codehaus.groovy.grails.SYNCHRONIZER_TOKEN"]');
	
	// Insert a new menu option for a secret menu that configures the Widgets on SCC
	// It requires the CSRF in the URL which will be automatically added
	if (menuElem && csrfElem) {
		
		var csrf = csrfElem.getAttribute('value');
		
		menuElem.insertAdjacentHTML('beforeend', `
			<li class="dl-li" data-submenuname="Widget Configuration" data-submenuidx="10">
				<a class="mlnk dl-link hvr-underline-from-left" target="_self" href="/Snypr/configurableDashboards/loadConfigurableDashboards?org.codehaus.groovy.grails.SYNCHRONIZER_TOKEN=${csrf}">Widget Configuration - ✯SB
				</a>
			</li>
		`);
		
	}
}

// Shared func used in multiple areas
var spotterResultsEnhanceShared = function() {
	
	// Augment Spotter results with new context menus
	var contextMenu = document.querySelector('.dummy-context-menu > ul');
	
	// Unset the condition that makes this scroll
	contextMenu.setAttribute('style', 'max-height:unset;')
	
	// Generate a function that loops through the map and replaces the placeholder with the value passed to the function
	var genReplaceStringFromMapFunc = function(map, placeholder="REPLACEME") {
		
		return function(value) {
			
			Object.keys(map).forEach(function(index) {
				
				var replacedUrl = map[index].replace(placeholder, value);
				
				// And then add it to the context menu
				contextMenu.insertAdjacentHTML('beforeend', `
					<li class='snyprbuddy-context-menu-item'>
						<a href="${replacedUrl}" target="_blank">${index}: ${value}</a>
					</li>
				`);
				
			});
			
		}
		
	};
	
	var functionalEnhancementMap = {
		'employeeid': function(value) {
			
			var employeeid = value;
			
			// The HTML class for the element to add
			var employeeClass = ".snyprbuddy-employeeid-" + employeeid;
			
			fetch("/Snypr/users/quickSearchAJAX", {
			  "headers": {
				"accept": "application/json, text/javascript, */*; q=0.01",
				"accept-language": "en-US,en;q=0.9",
				"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
				"org.codehaus.groovy.grails.synchronizer_token": getCSRFToken(),
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
				"x-requested-with": "XMLHttpRequest"
			  },
			  "body": "checkToken=true&column=employeeid&term="+employeeid+"&org.codehaus.groovy.grails.SYNCHRONIZER_TOKEN=" + getCSRFToken(),
			  "method": "POST",
			  "mode": "cors",
			  "credentials": "include"
			}).then(function(response) {	
				// This is returning just HTML
				return response.json();
			}).then(function(robj) {
				
				console.log(robj);
				
				var internalid = robj[0][0];
				// var employeeid = robj[0][1]
				var firstname = robj[0][2];
				var lastname = robj[0][3];
				
				
				// Response is currently a format like [[internalid, employeeid, firstname, lastname]]
				
				var urlGen = "/Snypr/manageData/showUserSearch?objid=" + robj[0][0] + "&objtype=user&org.codehaus.groovy.grails.SYNCHRONIZER_TOKEN=" + getCSRFToken();
				
				contextMenu.insertAdjacentHTML('beforeend', `
					<li class='snyprbuddy-context-menu-item'>
						<a class="${employeeClass}" href="${urlGen}" target="_blank">User Record: ${employeeid} - ${firstname} ${lastname} </a>
					</li>
				`);
				
				
			});
			
			
			
		},
		'ipaddress': genReplaceStringFromMapFunc({
			'VirusTotal': 'https://www.virustotal.com/gui/ip-address/REPLACEME/details',
			'Talos': 'https://talosintelligence.com/reputation_center/lookup?search=REPLACEME',
			'ThreatMiner': 'https://www.threatminer.org/host.php?q=REPLACEME',
			'ThreatCrowd': 'https://www.threatcrowd.org/ip.php?ip=REPLACEME',
			'Censys': 'https://censys.io/ipv4/REPLACEME',
			'Shodan': 'https://www.shodan.io/search?query=REPLACEME',
			'ZoomEye': 'https://www.zoomeye.org/searchResult?q=REPLACEME',
			'IBM X-Force': 'https://exchange.xforce.ibmcloud.com/ip/REPLACEME'
		}),
		'sourceaddress': genReplaceStringFromMapFunc({
			'VirusTotal': 'https://www.virustotal.com/gui/ip-address/REPLACEME/details',
			'Talos': 'https://talosintelligence.com/reputation_center/lookup?search=REPLACEME',
			'ThreatMiner': 'https://www.threatminer.org/host.php?q=REPLACEME',
			'ThreatCrowd': 'https://www.threatcrowd.org/ip.php?ip=REPLACEME',
			'Censys': 'https://censys.io/ipv4/REPLACEME',
			'Shodan': 'https://www.shodan.io/search?query=REPLACEME',
			'ZoomEye': 'https://www.zoomeye.org/searchResult?q=REPLACEME',
			'IBM X-Force': 'https://exchange.xforce.ibmcloud.com/ip/REPLACEME'
		}),
		'destinationaddress': genReplaceStringFromMapFunc({
			'VirusTotal': 'https://www.virustotal.com/gui/ip-address/REPLACEME/details',
			'Talos': 'https://talosintelligence.com/reputation_center/lookup?search=REPLACEME',
			'ThreatMiner': 'https://www.threatminer.org/host.php?q=REPLACEME',
			'ThreatCrowd': 'https://www.threatcrowd.org/ip.php?ip=REPLACEME',
			'Censys': 'https://censys.io/ipv4/REPLACEME',
			'Shodan': 'https://www.shodan.io/search?query=REPLACEME',
			'ZoomEye': 'https://www.zoomeye.org/searchResult?q=REPLACEME',
			'IBM X-Force': 'https://exchange.xforce.ibmcloud.com/ip/REPLACEME'
		}),
		'sourcehostname': genReplaceStringFromMapFunc({
			'VirusTotal': 'https://www.virustotal.com/gui/domain/REPLACEME/details',
			'Talos': 'https://talosintelligence.com/reputation_center/lookup?search=REPLACEME',
			'ThreatMiner': 'https://www.threatminer.org/domain.php?q=REPLACEME',
			'ThreatCrowd': 'https://threatcrowd.org/domain.php?domain=REPLACEME',
			'Censys': 'https://censys.io/domain/REPLACEME',
			'Shodan': 'https://www.shodan.io/search?query=REPLACEME',
			'ZoomEye': 'https://www.zoomeye.org/searchResult?q=REPLACEME',
			'IBM X-Force': 'https://exchange.xforce.ibmcloud.com/url/REPLACEME'
		}),
		'destinationhostname': genReplaceStringFromMapFunc({
			'VirusTotal': 'https://www.virustotal.com/gui/domain/REPLACEME/details',
			'Talos': 'https://talosintelligence.com/reputation_center/lookup?search=REPLACEME',
			'ThreatMiner': 'https://www.threatminer.org/domain.php?q=REPLACEME',
			'ThreatCrowd': 'https://threatcrowd.org/domain.php?domain=REPLACEME',
			'Censys': 'https://censys.io/domain/REPLACEME',
			'Shodan': 'https://www.shodan.io/search?query=REPLACEME',
			'ZoomEye': 'https://www.zoomeye.org/searchResult?q=REPLACEME',
			'IBM X-Force': 'https://exchange.xforce.ibmcloud.com/url/REPLACEME'
		}),
		'emailsender': genReplaceStringFromMapFunc({}),
		'emailrecipient': genReplaceStringFromMapFunc({}),
		'emailsenderdomain': genReplaceStringFromMapFunc({
			'VirusTotal': 'https://www.virustotal.com/gui/domain/REPLACEME/details',
			'Talos': 'https://talosintelligence.com/reputation_center/lookup?search=REPLACEME',
			'ThreatMiner': 'https://www.threatminer.org/domain.php?q=REPLACEME',
			'ThreatCrowd': 'https://threatcrowd.org/domain.php?domain=REPLACEME',
			'Censys': 'https://censys.io/domain/REPLACEME',
			'Shodan': 'https://www.shodan.io/search?query=REPLACEME',
			'ZoomEye': 'https://www.zoomeye.org/searchResult?q=REPLACEME',
			'IBM X-Force': 'https://exchange.xforce.ibmcloud.com/url/REPLACEME'
		}),
		'emailrecipientdomain': genReplaceStringFromMapFunc({
			'VirusTotal': 'https://www.virustotal.com/gui/domain/REPLACEME/details',
			'Talos': 'https://talosintelligence.com/reputation_center/lookup?search=REPLACEME',
			'ThreatMiner': 'https://www.threatminer.org/domain.php?q=REPLACEME',
			'ThreatCrowd': 'https://threatcrowd.org/domain.php?domain=REPLACEME',
			'Censys': 'https://censys.io/domain/REPLACEME',
			'Shodan': 'https://www.shodan.io/search?query=REPLACEME',
			'ZoomEye': 'https://www.zoomeye.org/searchResult?q=REPLACEME',
			'IBM X-Force': 'https://exchange.xforce.ibmcloud.com/url/REPLACEME'
		})
	};
	
	observeElementAndReapply(contextMenu, function() {
			
		// Since technically inserting HTML will re-trigger this context menu, we want to check
		// If we've augmented before
		if (contextMenu.querySelectorAll('.snyprbuddy-context-menu-item').length != 0) {
			return;
		}
		
		// Take the first link (which will tell us what item is being context menu'd)
		var firstLink = contextMenu.querySelector('li > a');
		
		// Grab the key and value (value is base64 encoded - so we atob() decode it)
		var firstKey = firstLink.getAttribute('data-key');
		var firstValue = b64DecodeUnicode(firstLink.getAttribute('data-val'));
		
		// If we can't find the respective elements to augment
		// 
		if (!firstKey || !firstValue)
			return;
		
		// Augment everything with a SNYPRBuddy Section
		contextMenu.insertAdjacentHTML('beforeend', `
			<li class='snyprbuddy-context-menu-item'>
				SNYPRBUDDY
			</li>
			<li class='snyprbuddy-context-menu-item clipboard'>
				<a href="#">Copy to Clipboard</a>
			</li>
		`);
		
		// For all items, react to the Clipboard Handler
		contextMenu.querySelector('.clipboard').addEventListener('click', function(event) {
			copyTextToClipboard(firstValue);
		});
		
		// Find if we have enhanced functionality for a specific attribute
		// Call the function passing in the value from Spotter
		if (functionalEnhancementMap.hasOwnProperty(firstKey)) {
			var val = functionalEnhancementMap[firstKey](firstValue);
		}
	});
	
	var augmentingColumns = {
		'ipaddress': function(elem) {
			
			var map = {
				'VirusTotal': 'https://www.virustotal.com/gui/ip-address/REPLACEME/details',
				'Talos': 'https://talosintelligence.com/reputation_center/lookup?search=REPLACEME',
				'ThreatMiner': 'https://www.threatminer.org/host.php?q=REPLACEME',
				'ThreatCrowd': 'https://www.threatcrowd.org/ip.php?ip=REPLACEME',
				'Censys': 'https://censys.io/ipv4/REPLACEME',
				'Shodan': 'https://www.shodan.io/search?query=REPLACEME',
				'ZoomEye': 'https://www.zoomeye.org/searchResult?q=REPLACEME',
				'IBM X-Force': 'https://exchange.xforce.ibmcloud.com/ip/REPLACEME'
			};
			
			var ip = elem.textContent;
			
			// Create a divider so it appears under the existing content
			var newDiv = elem.insertAdjacentElement('beforeend', document.createElement('div'));
			
			Object.keys(map).forEach(function(key) {
				
				var replacedUrl = map[key].replace('REPLACEME', ip);
									
				// Inject in the new div the links to search for these in checks
				newDiv.insertAdjacentHTML('beforeend', `
					<button>
						<a class="fa fa-search fa-12 text-grey-darker" href="${replacedUrl}" target="_blank">${key}</a>
					</button>
				`);
				
			});
		}
	}
	
	var spotterResultsElem = document.querySelector('#searchEventsTableTBody');
	
	if (spotterResultsElem) {
		getJobMonitorStatsAsync().then(function(dsInfo) {
		
			observeElementAndReapply(spotterResultsElem, function() {
				var spotterResultHeaders = spotterResultsElem.querySelectorAll('tr td .event-row-header'); 
				
				for (var loop = 0; loop < spotterResultHeaders.length; loop++) {
					var val = spotterResultHeaders[loop];
					
					var dsnameElem = val.querySelector('[data-key="resourcegroupname"]');
					
					if (dsnameElem) {
						
						var dsname = dsnameElem.innerText.replace('resourcegroupname: ', '');
						
						// By default assume there is no job scheduled
						// No job means we won't have job stats, obviously.
						var ingesterTxt = 'No Job Scheduled';
						var scheduleTxt = '';
						
						// If there is a job, get the Ingester or Console associated with it
						if (dsInfo[dsname]) {
							ingesterTxt = dsInfo[dsname]['Ingester'] || 'Console';
							scheduleTxt = dsInfo[dsname]['Schedule'];
						}					
						
						val.insertAdjacentHTML('beforeend', `
						<div class="pull-left event-row-header-labels">Ingester: ${ingesterTxt}</div>
						`);
						
						if (scheduleTxt) {
							val.insertAdjacentHTML('beforeend', `
								<div class="pull-left event-row-header-labels">Schedule: ${scheduleTxt}</div>
							`);
						}
					}
				}
				
			}, undefined, undefined, true);
			
		});
	}
	
	// Augment stats-top-table with similar 
	var statsContainer = document.querySelector('#stats-container');
	// This container seems to stay empty until | TOP is used, so we'll monitor this as reference	
	
	// We may be on a page where it doesn't exist, so wrap it for now
	if (statsContainer) {
		observeElementAndReapply(statsContainer, function() {

			// Get the table responsible for TOP results (and maybe STATS? - next release)
			var topTable = statsContainer.querySelector('#stats-top-table');
			
			if (topTable) {
				
				// This doesn't work or not needed in 6.3
				versionSpecific({
					'6.2': function() {
						// Rekajigger each link
						// This needs to be run in context of the page otherwise it won't work
						// Basically alter the click handler to not do anything if the path is a (for now)
						// This is sorta hacky but - that's the entire purpose of this extension - to derive new value
						injectScript(function() { 
							document.querySelectorAll('#stats-top-table > tbody > tr > td').forEach(function(elem) {
								
								// We don't care why this fails, but don't do it if it doesn't work.
								try {
									var existingClickHandler = elem.getAttribute('onclick');
									
									// Basically if we click the element, but we first clicked an A (meaning an injected link)
									// Do nothing, otherwise do the default functionality
									elem.setAttribute('onclick', 'console.log("hi"); console.log(event.path[0].tagName); if (event.path[0].tagName != "A") { ' + '}');
								} catch(err) {
									console.log("Error removing click handler");
									console.log(err);
								}
								
							});
						});
					}
				});
				
				// Then proceed with the normal augmentation
			
				var headerArray = Array.from(statsContainer.querySelectorAll('thead > tr > th')).map(function(elem) {
					return elem.innerText.toLowerCase().trim();
				});
			
				// Get an array of the columns to augment
				var columnsToAugment = headerArray.reduce(function(array, elem, index) {
					if (augmentingColumns.hasOwnProperty(elem)) {
						array.push(index);
					}
					return array;
				}, []);

				// For every header if we like this header, augment the rows		
				statsContainer.querySelectorAll('tbody > tr').forEach(function(elem, index) {
					
					// Augment columns of row
					var columnsOfRow = elem.querySelectorAll('td');
					
					// If we augment column 3, 4 and 6
					// Find the header text for 3, 4, and 6
					// And execute their associated augmentation function (td element passed as param)
					columnsToAugment.forEach(function(index) {
						var funcToCall = augmentingColumns[headerArray[index]];
						
						funcToCall(columnsOfRow[index]);
					});					
				});
			}
						
		});
	}
}

var spotterEnhanceEntryPoint = function() {
	
	// This ensures that even if an action such as Update Cache happens, we monitor and reapply SNYPRBuddy functions
	observeElementAndReapply(document.querySelector(".searchEngineContainer"), spotterDashboardEnhance, true, undefined, true);
}

var spotterDashboardEnhance = function() {
		
	// Auto-search if specified from a redirect of another page
	// Not quite sure why this works yet - but we'll just let it happen :)
	/*
	This functionality previously relied on when SEARCH_BY_RAW_QUERY was SNYPRBuddy handled
	SNYPR natively supports auto-search via base64'd "q" param to the Spotter page
	So we simply do not need to handle this anymore
	IF WE DO - uncomment this and edit SEARCH_BY_RAW_QUERY to something else
	
	var url = new URL(window.location.href);
	var rawSearch = url.searchParams.get(SEARCH_BY_RAW_QUERY);

	if (rawSearch != null) {
		console.log("Raw search attempted");
		document.querySelector("#queryInput").value = urlSafeDecode(rawSearch);
		document.querySelector('[name=submitsearchquery]').click();
	}
	*/
	
	// New feature - take the Spotter Search box and expose a "Share to Clipboard" URL
	var searchBarControls = document.querySelector('.sp-search-bar-controls');
	
	if (searchBarControls) {
		
		// Inject the Button to Generate Spotter Query URL
		searchBarControls.insertAdjacentHTML('afterbegin', `
			<span id="snyprbuddy-spotterurl-gen" class="sp-help fa fa-share-alt icon-click cursor-pointer" alt="SNYPRBuddy - Copy Query URL to Clipboard"></span>
		`);
		
		searchBarControls.querySelector('#snyprbuddy-spotterurl-gen').addEventListener('click', function(event) {
			
			var spotterQueryElem =  document.querySelector("#queryInput");
			
			if (spotterQueryElem) {
				var query = spotterQueryElem.value;
				
				// Generate the URL and copy to clipboard + notify the user
				copyTextToClipboard(spotterQueryToSearchURL(query));
				injectScript(function() {
					showNotification([{'info':"SNYPRBuddy - Spotter Query URL copied to Clipboard"}]);
				});
			}
		});
	}

	var autoExpand = function(rowElem) {
		// Avoiding the click event
		// Because this page sucks for performance
		// A normal click on white space costs 100ms (you know...as opposed to 0)
					
		var extraInfoElem = rowElem.querySelector('.extra-info');
		var checkboxElem = rowElem.querySelector('.view-more-link');
		
		// Force show it
		extraInfoElem.style.display = "block";
		
		// Force expand it
		checkboxElem.classList.remove('icofont-rounded-right');
		checkboxElem.classList.add('icofont-rounded-down');
		checkboxElem.classList.add('opened');
	}
	
	var potentialTimeZone = "";
	var timeelem = document.querySelector('.timezone-info');
	
	if (timeelem) {
		potentialTimeZone = timeelem.innerText.replace('ALL TIMES SHOWN ARE IN ', '');
				
		var validSystemTimezone = moment.tz.zone(potentialTimeZone) != null;	
		
		// Add into the UI the 'guessed' timezone for local operations
		timeelem.insertAdjacentHTML('afterend', '<div class="snyprbuddy-timezone-info pull-right" style="align:right;">' + 'SNYPRBuddy TZ: ' + moment.tz.guess() + '<br> SNYPRBuddy PARSE: ' + validSystemTimezone + '</div>');		
	}
			
	if (window.location.href.includes("loadDashboard")) {
		
		// Enhance the datasource block
		observeElementAndReapply(document.getElementById("summaryresult"), function() {
									
			var spotterDatasources = document.querySelectorAll('.lnk.spotterds');
			
			for (var loop = 0; loop < spotterDatasources.length; loop++) {
				var val = spotterDatasources[loop];
				
				var topLevelRow = val.closest('div.info-box');
				
				var extraInfoElem = topLevelRow.querySelector('.extra-info');

				var rgid = val.getAttribute('data-rgid');
				var lastEventDateTime = parseSpotterTimeZoneAware(extraInfoElem.querySelector("[id^='endTime']").innerHTML, potentialTimeZone);	
										
				// Add RGID to UI
				val.firstChild.innerHTML = '[RGID: ' + rgid + '] ' + val.firstChild.innerHTML;
				
				// Augment with nicer time delay info
				var timeSince = moment().diff(lastEventDateTime);
				var timeSinceStr = secondsToHHMMSS(timeSince/1000);
				var colorCoding = acceptableTimeDelay(timeSince / 1000);						
				
				// Inject more Buddy Info
				extraInfoElem.insertAdjacentHTML('beforeend', `
				<span class="summary">
					<span class="fa fa-cogs text-grey-lighter" alt="SNYPR Buddy - Delay"></span>
					Time delay: 
					<span class="${colorCoding}">${timeSinceStr}</span>
				</span>`
				);
				
				// Auto-expand each element
				autoExpand(topLevelRow);
			}
		}, true);
		
		// Enhance the datasource block with Job Stats block
		getJobMonitorStatsAsync().then(function(dsInfo) {
			
			observeElementAndReapply(document.getElementById("summaryresult"), function() {

				// New version of how to find the elements
				var spotterDatasources = document.querySelectorAll('#summaryResultTBody > li');
				
				for (var loop = 0; loop < spotterDatasources.length; loop++) {
					var val = spotterDatasources[loop];
										
					var dsnameElem = val.querySelector('.lnk.spotterds');	

					// First row is resource type
					// switch to querySelectorAll for all 3 rows
					var resourceTypeElem = val.querySelector('.extra-info .summary');					
					
					if (dsnameElem && resourceTypeElem) {
						
						var dsname = dsnameElem.getAttribute('data-value');
						
						// By default assume there is no job scheduled
						// No job means we won't have job stats, obviously.
						var ingesterTxt = 'No Job Scheduled';
						var scheduleTxt = '';
						
						// If there is a job, get the Ingester or Console associated with it
						if (dsInfo[dsname]) {
							ingesterTxt = dsInfo[dsname]['Ingester'] || 'Console';
							scheduleTxt = dsInfo[dsname]['Schedule'];
						}
												
						resourceTypeElem.insertAdjacentHTML('beforeend', `
						<span class="seperator">|</span><span alt="SNYPRBuddy - Node associated with import">Ingester: ${ingesterTxt}</span>`
						);
						
						if (scheduleTxt) {
							resourceTypeElem.insertAdjacentHTML('beforeend', `
							<span class="seperator">|</span><span alt="SNYPRBuddy - Import schedule">Schedule: ${scheduleTxt}</span>`
							);
						}
					}
				};
			}, true);
			
		});
				
		// "Show All" button for Policy Violations and Datasources on Spotter Page
		// As of 6.4 we now split path due to new pagination mechanism
		// PRE-64 STUB
		// function buildPaginationLinks(url, data, update, callback)
		// 64 STUB
		// securonix.customPagination.buildPaginationLinks(ele, url, data, update, callback)
		versionSpecific({
			'6.4': function() {
				document.querySelector('#spt_violation_filter_summarytab').parentElement.nextElementSibling.insertAdjacentHTML('beforeend', `	
					<button type="button" class="btn btn-sm btn-default"
						onclick="securonix.customPagination.buildPaginationLinks(null, '/Snypr/spotter/getPolicyViolationList', {'offset' : 0, 'max' : 999, 'order' : 'desc', 'sort' : 'count', 'currentpage' : 1}, 'policyviolation-summaryresult', 'securonix.snyper.spotter.events.cPaginationViolationCallback')">
						<span>Show All</span>
					</button>
				`);
				
				document.querySelector('#spt_activity_filter_summarytab').parentElement.nextElementSibling.insertAdjacentHTML('beforeend', `	
					<button type="button" class="btn btn-sm btn-default"
						onclick="securonix.customPagination.buildPaginationLinks(null, '/Snypr/spotter/getDatasourceList', {'offset' : 0, 'max' : 999, 'order' : 'desc', 'sort' : 'count', 'currentpage' : 1}, 'summaryresult', 'securonix.snyper.spotter.events.cPaginationDatasourceCallback')">
						<span>Show All</span>
					</button>
				`);
			},
			'pre64': function() {
				document.querySelector('#spt_violation_filter_summarytab').parentElement.nextElementSibling.insertAdjacentHTML('beforeend', `	
					<button type="button" class="btn btn-sm btn-default"
						onclick="buildPaginationLinks('/Snypr/spotter/getPolicyViolationList', {'offset' : 0, 'max' : 999, 'order' : 'desc', 'sort' : 'count', 'currentpage' : 1}, 'policyviolation-summaryresult')">
						<span>Show All</span>
					</button>
				`);
				
				document.querySelector('#spt_activity_filter_summarytab').parentElement.nextElementSibling.insertAdjacentHTML('beforeend', `	
					<button type="button" class="btn btn-sm btn-default"
						onclick="buildPaginationLinks('/Snypr/spotter/getDatasourceList', {'offset' : 0, 'max' : 999, 'order' : 'desc', 'sort' : 'count', 'currentpage' : 1}, 'summaryresult')">
						<span>Show All</span>
					</button>
				`);
			}
		}, fallback='pre64');
		
		var spotterViolationsEnhancement = function() {
			
			// Remove all previous enhancements before augmenting (weird scenario but must be done)
			document.querySelectorAll('.snyprbuddy-violation-enhance').forEach(function(elem) { elem.remove() });	
			
			var spotterDatasources = document.querySelectorAll('.lnk.clickablePolicyName');
			
			for (var loop = 0; loop < spotterDatasources.length; loop++) {
				// In case it runs twice, clear out the old stuff
				
				var val = spotterDatasources[loop];
				
				var topLevelRow = val.closest('div.info-box');
				
				var extraInfoElem = topLevelRow.querySelector('.extra-info');
				
				// Violations don't always have 3 children in extrainfo

				//var rgid = val.getAttribute('data-rgid');
				
				try {
					var lastEventDateTime = parseSpotterTimeZoneAware(extraInfoElem.querySelector("[id^='updatedDate']").innerHTML, potentialTimeZone);
					
					var timeSince = moment().diff(lastEventDateTime);
					var timeSinceStr = secondsToHHMMSS(timeSince/1000);
					var colorCoding = acceptableTimeDelay(timeSince / 1000);
									
					// Add RGID to UI
					//val.firstChild.innerHTML = '[RGID: ' + rgid + '] ' + val.firstChild.innerHTML;
					
					// Make Resource Name Clickable
					var resourceNameElement = extraInfoElem.children[1];
										
					var rgRegex = /:\s+(.*)\s\|/.exec(resourceNameElement.innerText);
					if (rgRegex !== null) {
						
						var regexMatch = rgRegex[1];
												
						resourceNameElement.insertAdjacentHTML('beforeend', `
							<span class="seperator snyprbuddy-violation-enhance">|</span>
							<a href="#" class="snyprbuddy-violation-enhance" onclick="
								document.getElementById('spt_activity_filter_summarytab').value = '${regexMatch}';
								securonix.snyper.spotter.events.filterSummaryData('${regexMatch}', undefined, 'summaryresult');
								document.getElementById('summaryresult').scrollIntoView();
							">DS Status</a>
						`);
						
					}

					// Inject more Buddy Info
					extraInfoElem.insertAdjacentHTML('beforeend', `
					<span class="summary snyprbuddy-violation-enhance">
						<span class="fa fa-cogs text-grey-lighter" alt="SNYPR Buddy - Time Since Violation"></span>
						Time since: 
						<span class="${colorCoding}">${timeSinceStr}</span>
					</span>`
					);
				}
				catch(err) {
					console.log(err);
				};

				// Auto-expand each element
				autoExpand(topLevelRow);
			}
		};

		// Enhance the policy violations block
		observeElementAndReapply(document.getElementById("policyviolation-summaryresult"), function() {
			
			// Pre-64 we enhance directly
			// 6.4 we observe the list for changes and augment accordingly
			
			versionSpecific({
				'6.4': function() {
					observeElementAndReapply(document.querySelector("#violationSummaryTBody"), spotterViolationsEnhancement, true);
				},
				'pre64': spotterViolationsEnhancement
			}, fallback='pre64');
			
		}, true);
		
		// Spotter results enhancement block
		spotterResultsEnhanceShared();		
		
	}
}

var policyViolationEnhance = function() {
	
	// New Feature: Quick edit
	// If we passed a HTML via Base64 in the URL, auto-open it for editing 
	var url = new URL(window.location.href);
	var rawSearch = url.searchParams.get(QUICK_EDIT_QUERY);
	
	if (rawSearch != null) {
		var elem = urlSafeDecode(rawSearch);
		
		// We do this by adding it to the page
		document.querySelector('body').insertAdjacentHTML('beforeend', `
			<div id="snyprbuddy-quickedit" style="display:none;">
				${elem}
			</div>		
		`);
		
		// And clicking it to force the SNYPR native jQuery(document).on('click', '.edit-policy') to fire
		// Making it so SNYPRBuddy doesn't need to maintain the nitty gritty
		// (Btw I'm very happy about this feature)
		document.querySelector('#snyprbuddy-quickedit span').click();
	}
	
	
	// Cache for 6 hours
	persistentCacheFunction('FILTER_BY_POLICY_CATEGORY', 21600, function() {
	
		// Retrieve the list of categories by parsing the Create Policy page
		// Yes....it sucks....
		// Copied fetch from Chrome XRF
		return fetch("/Snypr/policy/showCreatePolicy", {
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
			"referrer": "SNYPRBUDDY-HELLO",
			"referrerPolicy": "no-referrer-when-downgrade",
			"body": "checkToken=true&snyppolicytype=REALTIME&actionname=showCreatePolicy&org.codehaus.groovy.grails.SYNCHRONIZER_TOKEN=" + getCSRFToken(),
			"method": "POST",
			"mode": "cors"
		}).then(function(response) {		
			// This is returning just HTML
			return response.text();
		}).then(function(html) {
			
			// Initialize the DOM parser and parse the page
			var parser = new DOMParser();
			var doc = parser.parseFromString(html, "text/html");
			
			// Skip "Select" and return an Array of the Rest
			return Array.from(doc.querySelector('select#category').options).slice(1).map(function(elem) { return elem.text; })
			
		});
		
	}, function (array_of_categories) {		
		// Add a new sidebar item for filtering on Category
		var sidebar = document.querySelector('#accordion');
		
		var html_of_array = array_of_categories.reduce(function(acc, elem) {
			return acc + `
				<li class="list-group-item list-group-fixed-ht">
					<a class="filter-by-sbcat" data-val="${elem}">
						${elem}
					</a>
				</li>
			`;
		}, "");

		// Add the elements to the sidebar and inject the click handle
		if (sidebar) {
			sidebar.insertAdjacentHTML('beforeend', `
			<div class="panel panel-default">
				<div class="panel-heading" role="tab" id="collapseListGroupHeadingbycriticality">
					<h4 class="panel-title" id="-collapsible-list-group-">
						<a id="sb-bycategory" class="" data-toggle="collapse" href="#snyprbuddy-collapseListbycategory" data-parent="#accordion">
							By Category [SNYPRBUDDY]
						</a>
					</h4>
				</div>
				<div id="snyprbuddy-collapseListbycategory" class="panel-collapse collapse userDefinedPoliciesPanel">
					<ul id="updatebycategory" class="sidebar-nav list-group">
						${html_of_array}
					</ul>
				</div>
			</div>`);
		}
		
		// Inject into page the native loadPolicyList with special logic for sbcat (SNYPRBuddy cat)
		injectScript(function() {
            jQuery(document).off("click", ".filter-by-sbcat");
            jQuery(document).on("click", ".filter-by-sbcat", function (e) {
				
				// Mimic the real code as much as possible
				var params = {
					updatediv: 'policy-list',
				};
				
                jQuery('#policy-management-container').show();
                jQuery('#policy-operations').hide();
				
                var obj = jQuery(this);
                params["filterby"] = "category";
                params["filtervalue"] = obj.data("val");
                securonix.snyper.policy.loadPolicyList(params);
            });
		})
		
	});

	
	// Get the href for Spotter page
	var spotterURL = findElementsByInnerText('.mega-menu-ul-wrap li a', 'Spotter');

	if (spotterURL.length != 0) {
		
		// Observe the policy list for changes
		observeElementAndReapply(document.getElementById("policy-list"), function() {
			
			// Find the pagination controls
			// Augment it with the "All" option
			var pagination = document.querySelector('.paginationContainer > div > select');
			if (pagination) {
				var option = document.createElement("option");
				option.text = "All";
				option.value = "9999"
				pagination.add(option);
			}
			
			var policies = document.querySelectorAll('[tablename=policylisttable] tr');
						
			// Skip first row which is headers
			for (var loop = 1; loop < policies.length; loop++) {
				var val = policies[loop];
				
				// Get the element with the policy name
				var policyElem = val.querySelector('td:nth-child(2) span');
				
				// For each policy row, get the data-policyname from 2nd column
				var policyname = policyElem.getAttribute('data-policyname');
				var policyid = policyElem.getAttribute('data-policyid');
				var spotterQueryURL = spotterQueryToSearchURL("index = violation and policyname = \"" + policyname + "\"");
				
				// Prepare a quick-edit URL
				var quickEditURL = replaceAppendToURL(window.location.href, QUICK_EDIT_QUERY, urlSafeEncode(policyElem.outerHTML));
				
				// Add the Spotter Button to the First Column
				val.querySelector('td:first-child').insertAdjacentHTML('beforeend', `
				<div>
					<a target="_blank" href="${spotterQueryURL}" class="fa fa-search fa-12 text-grey-darker"> Spotter</a>
				</div>
				`);
				
				// Add the Quick Edit Button to the Policy Column
				val.querySelector('td:nth-child(2)').insertAdjacentHTML('beforeend', `
				<div>
					<a target="_blank" title="SNYPRBuddy: Middle-click to open this policy in a new tab without leaving this page"
					href="${quickEditURL}" class="fa fa-edit fa-12 text-grey-darker"> Open in New Tab</a>
				</div>
				`);
				
				// Augment the PolicyID (requested by Apoorva)
				if (policyid) {
					val.querySelector('td:nth-child(3)').insertAdjacentHTML('beforeend', `
					<span class="job-status fired clearfix">Policy ID: ${policyid}</span>
					`);
				}
			}
		});
		
		// Same page but XHR replacement
		// The attribute being replaced is #policy-operations (showCreatePolicy)
		observeElementAndReapply(document.getElementById("policy-operations"), function() {
			
			// Helper to find the active datasource being modified
			// If it is not a datasource, return null
			var getSelectedDatasource = function() {
				
				// Find the "Datasource Button"
				var datasourceButton = document.querySelector('.runontype[alt="Datasource"]');
				
				if (datasourceButton) {
					
					// Only if it is selected do we care about the DS
					if (datasourceButton.classList.contains('active')) {
						
						// So retrieve the selected element
						var selectedSourceElem = document.querySelector('#dsid_chosen .chosen-single');
						
						if (selectedSourceElem) {
							var rawDSText = selectedSourceElem.innerText;
							
							// Regex to get the text before the [Square Brackets]
							// Ex: DatasourceA [CloudFlare] -> "DatasourceA"
							var rgMatch = /(.*?)\s*\[/.exec(rawDSText);
							
							// If all looks good, return it
							if (rgMatch !== null) {
								return rgMatch[1];
							}
						}
					}
				}
				
				// For whatever other reason, return null
				return null;				
			}
			
			// If we are quick-editing and it has finally loaded, hide the sidebar
			// Quick-Editing now Hides the Sidebar (Hack) to Match Default Functionality			
			if (url.searchParams.has(QUICK_EDIT_QUERY)) {
				injectScript(function() {
					securonix.helpers.ui.hideSideBar();
				});
			}
			
			// Add in the ability to show all policy steps at once
			var policySteps = document.querySelector('.steps');

			if (policySteps) {
				
				policySteps.insertAdjacentHTML('beforeend', `
					<div class="pull-left">
						<div class="snyprbuddy-fake-policy-step">
							<div id="snyprbuddy-all-policy-steps" class="btn btn-secondary btn-sm pull-left">SNYPRBuddy - View All Steps</div>
						</div>
					</div>
				`);
				
				document.querySelector('#snyprbuddy-all-policy-steps').addEventListener('click', function(event) {
					
					// Disable the buttons as this is a view only mode
					event.target.classList.add('disabled');
										
					var prevButton = document.querySelector(".prev[data-step='0']");
					var saveAndNextButton = document.querySelector(".next[data-action='clickableonsave'");
					
					// FUTURE: document.querySelectorAll('.back-controls div').forEach(function(elem) { ... disable ... });
					
					// Disable the prev button
					if (prevButton) {
						prevButton.classList.add('disabled');
					}
					
					// Disable next button and add text warning user why it was disabled
					if (saveAndNextButton) {
						saveAndNextButton.classList.add('disabled');
						saveAndNextButton.innerText = 'Save & Next Disabled via SNYPRBuddy';
					}
					
					// Quick view all the tabs by setting them all to active
					document.querySelectorAll('.step-content').forEach(function(elem) {
						elem.classList.add('active');
					});
					
				});		
			}
			
			var policyConditions = document.querySelector('#conditionsTabPane .condition-descp');
			var rulesContainer = document.querySelector('#snyp-pol-rules-container');
			
			// If the policy conditions HTML is loaded up
			// Augment the auto-Spotter preview box, and monitor it
			if (policyConditions != null) {
				
				if (rulesContainer != null) {
					rulesContainer.insertAdjacentHTML('beforebegin', `	
						<div class="alert alert-info mt-alert">
							<span>SNYPRBuddy Config-to-Spotter [Experimental]
								<button id="autospotter-clipboard" type="button" class="btn btn-sm btn-default">
									<span>Copy to Clipboard</span>
								</button>
								<button id="autospotter-search" type="button" class="btn btn-sm btn-default">
									<span>Search in Spotter</span>
								</button>
							</span>
							<textarea readonly style="width:100%; height:40px" id="snyprbuddy-autospotter"></span>
						</div>
					`);
					
					
					// Click handler for "Copy to Clipboard" button
					document.querySelector('#autospotter-clipboard').addEventListener('click', function(event) {
						var copyFrom = document.querySelector('#snyprbuddy-autospotter');
						
						//Select all the text!
						copyFrom.select();

						//Execute command
						document.execCommand('copy');
					});
					
					// Click handler for running the configuration in Spotter
					document.querySelector('#autospotter-search').addEventListener('click', function(event) {
						var spotterURL = findElementsByInnerText('.mega-menu-ul-wrap li a', 'Spotter');
						
						var query = document.querySelector('#snyprbuddy-autospotter').textContent;
						console.log("Opening in new tab: " + query);
						
						var pre = spotterQueryToSearchURL(query);
						window.open(pre, '_blank');
					});			

					observeElementAndReapply(rulesContainer, function() {
						var policyObject = serializeObject(document.querySelector("#savePolicyForm"));
									
						// This is the basis for every element in the Query Builder
						// Maintains a hierarchical information pattern to retrieve info
						var objectGen = function() {
							return {
								'name': null,
								'rules': {
									'operation': [],
									'attribute': [],
									'ruleoperand': [],
									'condition': [],
									'value': []
								},
								'groups': []
							}
						}
						
						var rootObject = objectGen();
						rootObject.name = 'Root';
						
						var reducerFunc = function(root, item) {
							
							var levelsDeep = item.name.split('_');
							
							// If this is top level simply insert it to the root
							// Otherwise, iterative search
							// O(n*m) - sue me!
							if (levelsDeep.length == 1) {
								root['groups'].push(item);
							}
							else {
								
								deepDive = root['groups'];
								
								var foundLocation = false;
								
								// For each level deeper we need to iterate
								// Navigate through the root object to find the items spot
								// And insert it
								
								// Technically we know the index is gr# minus 2 for root level items, but
								// honestly I rather search for it just to be sure							
								for (var outer = 0; outer < levelsDeep.length && !foundLocation; outer++) {
									var level = levelsDeep[outer];
								
									
									// For every group in the root group
									// Determine which is the one we should drop into
									for (var i = 0; i < deepDive.length; i++) {
										var searchObj = deepDive[i];
										
										// Once we're at the proper level
										// Navigate into it
										if (searchObj.name == level) {										
											deepDive = searchObj;
											foundLocation = true;
											break;
										}
									}
									
									// We should be at the final area now
									// (otherwise we're at a weird state)
									// Push the group into here
									if (foundLocation) {
										deepDive['groups'].push(item);
										
										// Needed?
										break;
									}
								}
							}
							return root;							
						}
						
						// Take the groups and enhance them with the attributes we want from the object
						var groupsList = policyObject['condgr'].map(function(elem) {
							var group = objectGen();
							group.name = elem;
							
							// Take all the attributes we need from the config object, and rebuild it here
							// Abstraction???
							Object.keys(group['rules']).forEach(function(ruleconfig) {
								
								var attribute = getOrDefault(policyObject, elem + '_' + ruleconfig);
								if (attribute != null) {
									group['rules'][ruleconfig] = attribute;
								}
							});
							
							return group;
						}).reduce(reducerFunc, rootObject);
						
						console.log(groupsList);
						
						var recursiveBuilder = function(group) {
							// The whole idea of this is the following
							// Iterate through all the rules and groups in the order they should be
							// If there's rules in the group, we know there's no subgroups
							// If there's subgroups we know there's no rules
							// Therefore, 
							// If it's a list of rules, build the query for those rules
							// If it's a list of groups, recurse into each of them (eventually leading to rules)
							// It's neat :)
							
							var subgroupCount = group['groups'].length;
							var rulesCount = group['rules']['attribute'].length;
							var spotterQueryGen = "";
							
							// Edge case when there's an empty group (not needed)
							if (subgroupCount == 0 && rulesCount == 0) {
								return spotterQueryGen;
							}
							
							if (subgroupCount == 0) {
								var rulesObj = group['rules'];
																
								for (var ruleIndex = 0; ruleIndex < rulesCount; ruleIndex++) {
									
									var attr = rulesObj['attribute'][ruleIndex];
									var cond = getOrDefault(conditionConversionMap, rulesObj['condition'][ruleIndex], 'INVALID_CONVERSION_' + rulesObj['condition'][ruleIndex]);
									var value = rulesObj['value'][ruleIndex];
									
									// The current rules operation field is what connects the
									// previous rule to this rule
									// Skip it for the first rule
									var connectingRuleOperand = '';
									
									// Skip it for the first rule (as it shouldn't do anything)
									if (ruleIndex != 0) {
										connectingRuleOperand = rulesObj['ruleoperand'][ruleIndex] || '';										
									}
									
									// For an operator without the need for a value, exclude it
									// Fixes a bug with NULL ""
									if (rulesObj['condition'][ruleIndex].includes('NULL')) {
										spotterQueryGen += connectingRuleOperand + ' ' + attr + ' ' + cond + ' ';	
									}
									else {
										spotterQueryGen += connectingRuleOperand + ' ' + attr + ' ' + cond + ' ' + '"' + value + '" ';	
									}
								}								
							}
							else {
								for (var groupIndex = 0; groupIndex < subgroupCount; groupIndex++) {
									var subgroup = group['groups'][groupIndex];
									
									var connectingGroupOperand = '';
									
									// The current groups operation field is what connects the
									// previous group to this group, if there is no operation									
									
									connectingGroupOperand = subgroup['rules']['operation'][0] || '';

									// Recursive call
									var innerQuery = recursiveBuilder(subgroup);
									
									// We trim to avoid the pain
									if (innerQuery.trim() != "") {
										spotterQueryGen += connectingGroupOperand + ' (' + recursiveBuilder(subgroup) + ') ';
									}																		
									
								}
							}

							return spotterQueryGen;
							
						}
						
						// Convert the Objects to Spotter Query and Add to UI for Users
						var conv = recursiveBuilder(groupsList);
						
						// If this is a datasource, add in the Spotter condition
						var ds = getSelectedDatasource()
						if (ds != null) {
							conv = 'resourcegroupname="' + ds + '" AND ' + conv;
						}
						
						var elementsToEnableDisable = [document.querySelector('#autospotter-clipboard'), document.querySelector('#autospotter-search')];
						
						// Show some helper text if no conditions exists
						// Disable buttons unless policy conditions specified
						if (conv.trim() == "") {
							conv = "Policy conditions will auto-populate here as Spotter queries. Enables quick testing of logic";
							
							elementsToEnableDisable.forEach(function(elem) {
								elem.classList.add('disabled');
							});
						}
						else {
							
							elementsToEnableDisable.forEach(function(elem) {
								elem.classList.remove('disabled');
							});
						}
						
						// Set the text 
						document.querySelector('#snyprbuddy-autospotter').innerHTML = conv;
						
						
					}, true, {childList: true, subtree: true});
				}
			}
			
			// Augment the directives with SNYPR conversion as well
			var directivesPane = document.querySelector('#advAnalyticsTabPane');
			if (directivesPane) {
				
				// Any modifications to the directives pane triggers a refresh of content
				observeElementAndReapply(directivesPane, function(elem) {
					
					// Any change in the subtree triggers a re-calc
					// However we are simply adding a button to search to Spotter to the first column
					// And when it is clicked we check its sibling
					document.querySelectorAll('.dirsummary table tbody tr:nth-child(2) td:nth-child(1)').forEach(function(keyColumn) {
						
						// Check if we've augmented this row
						var autoSpotterElemForThisRow = keyColumn.querySelector('.snyprbuddy-directive-autospotter');
						
						if (!autoSpotterElemForThisRow) {
							keyColumn.insertAdjacentHTML('beforeend', `<button type="button" class="btn btn-sm btn-default snyprbuddy-directive-autospotter">
								<span>Search in Spotter</span>
							</button>`);
							
							keyColumn.querySelector('.snyprbuddy-directive-autospotter').addEventListener('click', function(event) {
																								
								// Get the siblings text (the value column)
								// TIL: https://stackoverflow.com/questions/10086427/what-is-the-exact-difference-between-currenttarget-property-and-target-property
								var valueColumn = event.currentTarget.parentElement.nextElementSibling;
								
								if (valueColumn) {
									// Convert block 
									var valueText = valueColumn.innerText;
									
									var replacedText = Object.keys(conditionConversionMap).reduce(function(strSoFar, key) {
										return strSoFar.replace(key, conditionConversionMap[key]);
									}, valueText);
									
									// If this is a datasource, add in the Spotter condition
									var ds = getSelectedDatasource()
									if (ds != null) {
										replacedText = 'resourcegroupname="' + ds + '" AND ' + replacedText;
									}
									
									console.log(replacedText);
									
									// Open the query in new tab
									window.open(spotterQueryToSearchURL(replacedText), '_blank');
								}
							});
						}
												
					});
					
				}, true, {childList: true, subtree: true});		
				
			}
			
			// Watchlists, Active Lists, LookupTables, they all have a "Get Entity Count"
			// This simply auto-queries it and shows it on the UI without intervention by
			// user - making it simpler
			injectScript(function() {
				var quickLoadCount = function($this) {
					
					// Get the button
					var entityElem = $this.siblings('.getentitycount')
					
					var entitytype = entityElem.data('entitytype');
					var entityname = $this.val();
					
					// Generate the request
					var data = {
						'checkToken': true,
						'entitytype': entitytype,
						'entityname': entityname
					};
					
					// Mimic securonix.snyper.policy.getentitycount() 
					jQuery.ajax({
						type: "POST",
						url: contextPath + "/policy/getentitycount",
						async: !1,
						data: data,
						dataType: "json",
						success: function(a, b) {
							// Instead fill in the data without a modal
							entityElem.text("[SNYPRBUDDY Auto-Count] " + a.entityname + " has " + a.entitycount + (a.entitycount != 1 ? " entities" : " entity"));
						},
						error: function(a, b, e) {}
					})
				};
				
				
				// For every change in the SELECT
				// Auto-retrieve the count of elements
				jQuery(document).off("change", "select.entitynameforcount");
				jQuery(document).on("change", "select.entitynameforcount", function(event) {
					quickLoadCount($(this));
				});
				
				// Apply it to every element on page load
				$('select.entitynameforcount').each(function() {
					quickLoadCount($(this));
				});
			});
	
		});
	}
}

var jobMonitorEnhance = function() {
	
	var greenColorStr = 'background-color: #bce2bc';
	var yellowColorStr = 'background-color: #f3f3b4';
	var redColorStr = 'background-color: #ffb5b5';
	
	var jobTypeEnhancements = {
		'GR_EVENT_IMPORT': function() {
			// ACTIVITY IMPORTS
			
			var published = this.querySelector('[id$="PUBLISHER_EVENTS_PUBLISHED"]');
			var parsed = this.querySelector('[id$="PARSER_EVENTS_VALID"]');
			var indexed = this.querySelector('[id$="INDEXER_EVENTS_INDEXED"]');
			var unparsed = this.querySelector('[id$="PARSER_EVENTS_INVALID"]');
			
			// Just set published to green generally
			// Yellow if it is 0
			if (published) {
				
				published.parentElement.setAttribute('style', published.innerText != "0" ? greenColorStr : yellowColorStr);
				
				// Augment these sections only if published is done
				if (published.innerText != "0") {
					// If these sections are equal to published, green, else yellow
					[parsed, indexed].forEach(function(elem) {						
						if (elem) {
							elem.parentElement.setAttribute('style', elem.innerText == published.innerText ? greenColorStr : yellowColorStr);
						}
					});

					// Set unparsed to red IF THERE ARE ANY
					if (unparsed) {
						unparsed.parentElement.setAttribute('style', unparsed.innerText == "0" ? greenColorStr : redColorStr);
					}
				}
			}
		},
		'GROUP_PEER_GENERATION': function() {
		
			// Peer Creation Rules
			
			var peersupdated = this.querySelector('[id$="PEERS_CREATED_UDPATED"]');
			
			// Peers updated is one section, yellow if 0, green if anything today
			if (peersupdated) {
				peersupdated.parentElement.setAttribute('style', peersupdated.innerText != "0" ? greenColorStr : yellowColorStr);
			}
		},
		'GR_USER_IMPORT': function() {
			
			// User Imports
			
			var published = this.querySelector('[id$="LINES_PROCESSED"]');
			var newusers = this.querySelector('[id$="NEW_USERS"]');
			var updated = this.querySelector('[id$="UPDATED_USERS"]');
			
			// If they are not zero, make it green
			[published].forEach(function(elem) {						
				if (elem) {
					elem.parentElement.setAttribute('style', elem.innerText != "0" ? greenColorStr : yellowColorStr);
				}
			});
			
			// These ones are special since they sum together to make published
			// Therefore all we want to do is make them green 
			/*[newusers, updated].forEach(function(elem) {
				if (elem) {
					elem.parentElement.setAttribute('style', published.innerText != "0" ? greenColorStr : yellowColorStr)
				}
			});
			*/			
		},
		'GR_ACCESS_IMPORT': function() {
			
			// Access Import
			
			var published = this.querySelector('[id$="LINES_PROCESSED"]');
			var matched = this.querySelector('[id$="LINES_MATCHED"]');
			var unmatched = this.querySelector('[id$="LINES_UNMATCHED"]');
			
			if (published) {
				published.parentElement.setAttribute('style', published.innerText != "0" ? greenColorStr : yellowColorStr);
				
				if (published.innerText != "0") {
					[matched].forEach(function(elem) {						
						if (elem) {
							elem.parentElement.setAttribute('style', elem.innerText == published.innerText ? greenColorStr : yellowColorStr);
						}
					});
					
					// Set unparsed to red IF THERE ARE ANY
					if (unmatched) {
						unmatched.parentElement.setAttribute('style', unmatched.innerText == "0" ? greenColorStr : redColorStr);
					}
				}
			}
		},
		'GROUP_GEOLOCATION': function() {
			// Geo Location
			
			var published = this.querySelector('[id$="READ"]');
			var indexed = this.querySelector('[id$="SOLR"]');
			
			if (published) {
				published.parentElement.setAttribute('style', published.innerText != "0" ? greenColorStr : yellowColorStr);
				
				if (published.innerText != "0") {
					[indexed].forEach(function(elem) {
						if (elem) {
							elem.parentElement.setAttribute('style', elem.innerText == published.innerText ? greenColorStr : yellowColorStr);
						}
					});
				}
			}
		},
		'GROUP_TPI': function() {
			
			// Third Party Intelligence
			
			var published = this.querySelector('[id$="READ"]');
			var stored = this.querySelector('[id$="REDIS"]');
			var indexed = this.querySelector('[id$="SOLR"]');
			
			if (published) {
				published.parentElement.setAttribute('style', published.innerText != "0" ? greenColorStr : yellowColorStr);
				
				if (published.innerText != "0") {
					[stored, indexed].forEach(function(elem) {
						if (elem) {
							elem.parentElement.setAttribute('style', elem.innerText == published.innerText ? greenColorStr : yellowColorStr);
						}
					});
				}
			}
		},
		'GR_LOOKUP_DATA': function() {
			
			// Lookup Import
			
			var published = this.querySelector('[id$="READ"]');
			var stored = this.querySelector('[id$="REDIS"]');
			var indexed = this.querySelector('[id$="SOLR"]');
			
			if (published) {
				published.parentElement.setAttribute('style', published.innerText != "0" ? greenColorStr : yellowColorStr);
				
				if (published.innerText != "0") {
					[stored, indexed].forEach(function(elem) {
						if (elem) {
							elem.parentElement.setAttribute('style', elem.innerText == published.innerText ? greenColorStr : yellowColorStr);
						}
					});
				}
			}	
		},
		'GROUP_WATCHLIST': function() {
			
			// Watchlist Import
			
			var published = this.querySelector('[id$="READ"]');
			var stored = this.querySelector('[id$="REDIS"]');
			var indexed = this.querySelector('[id$="SOLR"]');
			
			if (published) {
				published.parentElement.setAttribute('style', published.innerText != "0" ? greenColorStr : yellowColorStr);
				
				if (published.innerText != "0") {
					[stored, indexed].forEach(function(elem) {
						if (elem) {
							elem.parentElement.setAttribute('style', elem.innerText == published.innerText ? greenColorStr : yellowColorStr);
						}
					});	
				}
			}
		}
	}
	
	var augmentFunction =  function() {
		var jobs = document.querySelectorAll('#replace-tobody-content > tr');
				
		for (var loop = 0; loop < jobs.length; loop++) {
			var jobRow = jobs[loop];
							
			// Col 1 is Job Details
			var col1 = jobRow.cells[0];
			
			// Col 2 is Schedule Details
			// Col 3 Today's Run Statistics
			// Col 4 Published Events History
			
			// Get the import type and run the appropriate enhancement block for it
			var jobTypeElem = jobRow.querySelector('.filterLableKey');
			var jobType = '';
			
			// If we found the job type
			if (jobTypeElem) {
				jobType = jobTypeElem.getAttribute('data-jobgroup');
			}
			
			try {				
				if (!col1.querySelector('.snyprbuddy-jobstats')) {
					
					// The alt text of relevance is either the first or second
					// If it's not the first, the first will be "" which means we can do the shorthand ||
					var alt = col1.querySelectorAll('[alt]')[0].getAttribute('alt') || col1.querySelectorAll('[alt]')[1].getAttribute('alt');
					
					if (alt) {
						col1.querySelector('.ds-actions').insertAdjacentHTML('beforebegin', `
							<div class="margin-tp-2 dsname-label snyprbuddy-jobstats">
								<span class="sub-title-display-inline">SNYPRBuddy Alt: </span> 
								<span class="sub-title-value">                	
									${alt}
								</span>
							</div>
						`);
					}
					
					// Pull the RGID
					var rgid = jobRow.getAttribute("replaceid");
					
					if (rgid) {
						col1.querySelector('.ds-actions').insertAdjacentHTML('beforebegin', `
							<div class="margin-tp-2 dsname-label snyprbuddy-jobstats">
								<span class="sub-title-display-inline">SNYPRBuddy DS RGID: </span> 
								<span class="sub-title-value">                	
									${rgid}
								</span>
							</div>
						`);

						// If we have the RGID and this is an Activity Import
						// We can augment with additional stats around correlated event percent
						if (jobType == 'GR_EVENT_IMPORT') {
							injectScript(function(obj) {
								securonix.helpers.ui.executeAction("/viewJobs/getTodaysCounters", {rgId:obj.rgid, JobId:-1}, function (result) {
									// Since this is injected into the page we need to use a different method to append to cell by RGID
									// tr replaceid=RGID will do
									
									// Find the row based off replaceid
									var jobByDSID = document.querySelector('tr[replaceid="' + obj.rgid + '"]');
									
									if (jobByDSID) {
										var jobCell = jobByDSID.cells[0];
										var statsCell = jobByDSID.cells[2];
										
										// If there's no stats for some reason
										if (Object.keys(result).length === 0) {
											jobCell.querySelector('.ds-actions').insertAdjacentHTML('beforebegin', `
												<div class="margin-tp-2 dsname-label snyprbuddy-jobstats">
													<span class="sub-title-display-inline">SNYPRBuddy extra statistics pull:</span> 
													<span class="sub-title-value">                	
														Failed (Click Datasource Name to Retry)
													</span>
												</div>
											`);
										}
										else {
											var eventsIndexed = parseInt(statsCell.querySelector('[id$="PARSER_EVENTS_VALID"]').getAttribute('alt'));
											
											// Take the results of the AJAX call and compare to the total in the statsCell (indexed is end result)
											var correlatedResults = result.CORRELATED;
											var correlatedResultsPercent =  correlatedResults != 0 ? (correlatedResults / eventsIndexed * 100).toFixed(2) : 0;

											var violations = result.VIOLATIONS;
											var violationsPercent = violations != 0 && eventsIndexed != 0 ? (violations / eventsIndexed * 100).toFixed(2) : 0;
											
											// Add it to the UI
											
											jobCell.querySelector('.ds-actions').insertAdjacentHTML('beforebegin', `
												<div class="margin-tp-2 dsname-label snyprbuddy-jobstats">
													<span class="sub-title-display-inline">SNYPRBuddy DS Daily Correlated Events: </span> 
													<span class="sub-title-value">                	
														${correlatedResults} (${correlatedResultsPercent}% of Events)
													</span>
												</div>
												<div class="margin-tp-2 dsname-label snyprbuddy-jobstats">
													<span class="sub-title-display-inline">SNYPRBuddy DS Daily Violations: </span> 
													<span class="sub-title-value">                	
														${violations} (${violationsPercent}% of Events)
													</span>
												</div>
											`);
										}
									}
								});
							}, {rgid:rgid});
						}
					}
				}
			}
			catch(err) {
				console.error(err);
			}
			
			var todaysRunStatsCol = jobRow.cells[2];
								
			// If the job type is one that we currently enhance
			if (jobTypeEnhancements.hasOwnProperty(jobType)) {
				observeElementAndReapply(todaysRunStatsCol, jobTypeEnhancements[jobType], true, {childList:true, subtree:true});
			}		
		}
	};
	
	// Monitor the page change
	observeElementAndReapply(document.querySelector('#view-connectionType-jobs'), function() {
		// Monitor Search Results
		observeElementAndReapply(document.querySelector('#jobsByConnection'), augmentFunction);
		
		// Monitor Table Element Changes
		observeElementAndReapply(document.querySelector('#replace-tobody-content'), augmentFunction, true);
	});
};

var activityImportEnhance = function() {
	
	// Go through the list of datasources in the activity import list
	// add the datasource id
	observeElementAndReapply(document.getElementById("act-datasourcelist"), function() {
		var spotterDatasources = document.querySelectorAll('.select-act-load-ds-config');
		
		for (var loop = 0; loop < spotterDatasources.length; loop++) {
			var val = spotterDatasources[loop];
						
			var rgid = val.getAttribute('data-rgid');
			
			// Add RGID to UI
			// Bugfix: Handles 6.2.x and 6.3.x HTML
			var elementToAugment = versionSpecific({
				'6.3': function() {
					return val.querySelector('.cr-name').firstElementChild;
				},
				'6.2': function() {
					return val.firstElementChild;
				}
			}, fallback='6.2');

			elementToAugment.innerHTML = '[RGID: ' + rgid + '] ' + elementToAugment.innerHTML;
			
		}
	}, true);
	
	var reloadPolicyCount = function(elemBeingClicked) {
		// Get the header of the list
		var policyListHeader = document.querySelector('#act-import-policy-list > div > div > span');
		
		// Get the list of policies
		var policyToggles = document.querySelectorAll("#act-import-policy-list > div .linefiltersummarylistscroll > ul li a.policyToggle");
		
		// Get the list of policies that are enabled
		var enabledPoliciesCount = Array.from(policyToggles).filter(function(elem) {
			return elem.classList.contains("checked");
		}).length;
				
		// If we are clicking a toggle, take into account what it'll become post-click
		// If it is clicked, unchecking it reduces the count
		// If it is unclicked, checking it increases the count
		if (elemBeingClicked) {
			enabledPoliciesCount += elemBeingClicked.classList.contains("checked") ? -1 : 1;
		}
		
		policyListHeader.innerText = "POLICIES - [SNYPRBUDDY - ENABLED: " + enabledPoliciesCount + ", TOTAL: " + policyToggles.length + " ]";

	}

	// The way this element works is it exists at the start
	// But only has content in it once we load it
	// So monitor and reload and be ready to apply the logic
	observeElementAndReapply(document.querySelector("#act-schedule-summary"), function() {
			
		// Once the page loads this will load in separately
		observeElementAndReapply(document.querySelector("#act-import-policy-list"), function() {
					
			document.querySelectorAll("#act-import-policy-list > div .linefiltersummarylistscroll > ul li a.policyToggle").forEach(function(elem) {
				elem.addEventListener('click', function(event) { 
					reloadPolicyCount(event.target);
				});
			});
			
			reloadPolicyCount();

		});
		
	});
	
	var documentation_json_url = chrome.runtime.getURL('lib/documentation-extractor/json_of_documentation.txt');

	// New mechanism refreshes from GitHub if older than 1 day
	persistentCacheFunction('BUDDYNET_DOCUMENTATION_JSON', 86400, function() {
		return fetch("https://raw.githubusercontent.com/prashker/BUDDYNet-DB/master/documentation_json.json", {
			mode: 'cors',
			cache: 'no-cache'
		})
		.then(function(response) {
			// The API call was successful!
			if (response.ok) {
				return response.json();
			}
			// There was an error
			return Promise.reject(response);
		});
	}, function(doc_json) {
		
		// Using a fuzzy search library to make it easier to find results
		// Search both the "vendor" and "title" for now.
		
		const options = {
		  // isCaseSensitive: false,
		  includeScore: false,
		  shouldSort: true,
		  // includeMatches: false,
		  // findAllMatches: false,
		  // minMatchCharLength: 1,
		  // location: 0,
		  // threshold: 0.6,
		  // distance: 100,
		  // useExtendedSearch: false,
		  // ignoreLocation: false,
		  // ignoreFieldNorm: false,
		  keys: [
			"vendor",
			"title"
		  ]
		};

		var fuse = new Fuse(doc_json, options);
		
		var documentationBlock = document.querySelector('#snyprbuddy-docs-block');
		var deviceTypeElem = document.querySelector('#act-devicetype-properties');
		
		observeElementAndReapply(deviceTypeElem, function() {	
		
			// Add in a new SNYPRBuddy BLOCK
			if (deviceTypeElem && documentationBlock == null) {
				deviceTypeElem.insertAdjacentHTML('afterend', `
					<div id="snyprbuddy-docs-block" class="col-md-12 displayNone">
						<div class="card">
							<p class="card-title with-bt-margin">SNYPRBUDDY Recommends the following documentation</p>
							<div class="found">
								Hello world
							</div>
						</div>
					</div>
				`);	
				documentationBlock = document.querySelector('#snyprbuddy-docs-block');
			}			

			// Find the data in "Device Type Information"
			var deviceTypeInfoElems = document.querySelectorAll('#act-devicetype-properties .devicetype-breadcrumb .row > div input');
			
			if (deviceTypeInfoElems.length == 4) {
							
				// They are all <inputs>
				var vendor = deviceTypeInfoElems[0].value;
				var functionality = deviceTypeInfoElems[1].value;
				var resourcetype = deviceTypeInfoElems[2].value;
				var collectionmethod = deviceTypeInfoElems[3].value;
				
				var results = fuse.search(resourcetype, {limit: 3});
				
				if (results.length > 0) {			
					var resultsHTML = results.reduce(function(currentHTML, elem) {
						
						// Get the record from the original JSON parsed
						var doc_obj = elem['item'];
						
						var allTypes = doc_obj['methods'];
						
						// Merge methods and versions
						if (doc_obj['versions']) {
							allTypes = allTypes.concat(doc_obj['versions']);
						}
						
						
						var htmlToAdd = allTypes.reduce(function(htmlsofar, variant) {
							
							return htmlsofar + `
								<li>
									<a href="${variant['link']}">${doc_obj['vendor']} ${doc_obj['title']} ${variant['type']}</a>
								</li>
							`;
						}, '');
						
						return currentHTML+htmlToAdd;

					}, '') || `No , visit <a href="https://documentation.securonix.com/">Securonix Documentation for more information`;
					
					var finalHTML = `<ul>
						${resultsHTML}
					</ul>`;
					
					documentationBlock.querySelector('.found').innerHTML = finalHTML;
					documentationBlock.classList.remove('displayNone');
				}
			}
		
		}, true, {childList:true, subtree:true});
		
	});
	
	
};

var sccEnhance = function() { 
	// Feature enhancement request
	// Same Spotter modification enhancements in Spotter as "Violation Events" (Spotter)
	spotterResultsEnhanceShared();
	
	var deepLinkMainURL = window.location.href.match('^.*Snypr') + '/configurableDashboards/view?violationinfoviewparams=';

	var generateDeepLink = function(pvelem) {

		// 6.3 seems to contain the relevant info in the following block
		var violationInfoElem = pvelem;
		
		if (violationInfoElem) {
			
			// entityid is same logic as native SNYPR code
			// var entityId = jQuery(this).data('userid') && jQuery(this).data('userid') != "-1" ? btoa(jQuery(this).data('userid')) : btoa(jQuery(this).data('entityid'));
			//    var queryString = {"entityid":entityId, "entitytype":entityType, "policyname":jQuery(this).data("policyname"), "requestFor": (isTM ? "threats" : "violations"), "tenantid": jQuery(this).data('tenantid'), "resourcegroupid": jQuery(this).data('resourcegroupid')}
			
			var userid = violationInfoElem.getAttribute('data-userid');
			
			var entityid = userid && userid != '-1' ? userid : violationInfoElem.getAttribute('data-entityid');
			var entitytype = violationInfoElem.getAttribute('data-entitytype');
			var policyname = violationInfoElem.getAttribute('data-policyname');
			var requestFor = "violations";
			var tenantid = violationInfoElem.getAttribute('data-tenantid');
			var resourcegroupid = violationInfoElem.getAttribute('data-resourcegroupid');
			var generatedtime = violationInfoElem.getAttribute('data-generatedtime');
			
			var finalEntity = {
				'entityid': btoa(entityid),
				'entitytype': entitytype,
				'policyname': policyname,
				'requestFor': requestFor,
				'tenantid': parseInt(tenantid),
				'resourcegroupid': parseInt(resourcegroupid),
				'generatedtime': parseInt(generatedtime)
			};
			
			// From https://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript
			// Basically do this if UTF8 string is being base64'd
			var finalEntityJSON = unescape(encodeURIComponent(JSON.stringify(finalEntity)));
						
			var deepLinkToViolation = deepLinkMainURL + btoa(finalEntityJSON);
			
			return deepLinkToViolation;
		}				
	};
	
	// Not tested on 6.4
	waitForElementToExist(document.querySelector('#st-container'), '#entity-violation-block', function(elem) {
				
		observeElementAndReapply(elem, function() {
			var violationList = document.querySelectorAll('.pv-show-violationinfo');
			
			violationList.forEach(function(violationelem) {

				// Generate the deep link based off this violation element
				var url = generateDeepLink(violationelem);
								
				// Then add a new button to the UI that enables deep linking
				// Depending on which SCC element determins which the element we're injecting into is.
				
				// pol-name-inner-wrap is Top Violators
				// ehead-txt is Top Threats and Top Violations
				var elementToEnhance = violationelem.querySelector('.pol-name-inner-wrap') || violationelem.querySelector('.ehead-txt');
				
				if (elementToEnhance) {
					elementToEnhance.insertAdjacentHTML('afterend', `
						<span class="take-action-ico actions un_bind pull-left no-action inline_take_action">
							<span style="margin-top: -3px !important; margin-left: 7px !important;" class="btn btn-default btn-xs">
								<a style="color: inherit !important;" target="_blank" href="${url}">Open in New Tab</a>
							<i class="icofont icofont-share"></i>
							</span>
						</span>
					`);
				}
				
			});
		});		
			
	});
}

var loginEnhance = function() { 

	// We need the base URL and login button to properly augment this page
	var parsedURL = window.location.href.match('^.*Snypr');	
	var loginButton = document.querySelector('[type="submit"]');
		
	// Get the API URL and the endpoints needed
	var apiURL = parsedURL + '/ws/';
	var genToken = apiURL + 'token/generate';

	// How many days the token should be valid for
	var tokenValidityDays = 365;
		
	if (parsedURL && loginButton) {
		
		// Augment the page with a button to enable API validation stuff
		document.querySelector('#lost-password').insertAdjacentHTML('beforebegin', `
			<button class="btn btn-primary btn-xs" id="snyprbuddy-enableapi-buttons">SNYPR API</button>
		`);
		
		document.querySelector('#snyprbuddy-enableapi-buttons').addEventListener('click', function(event) {
			
			// Disable the button from being clicked again
			this.setAttribute('disabled', 'true');
			
			// Add the information blurb to the UI explaining what this feature does
			document.querySelector('#authLogin').insertAdjacentHTML('afterbegin', `
				<div class="alert alert-info" role="alert" id="snyprbuddy-apiinfo">This is a SNYPRBuddy experimental enhancement to provision an API token for SNYPR (if enabled).
					<a href="https://documentation.securonix.com">
						Refer to documentation for further API schema information.
					</a>
					<br><br>
					Insert username and password and click the generate button - if successful, this block will return an API token valid for <bold>${tokenValidityDays} days</bold>.
					<br><br>
					Use this at your own risk. Experience with APIs is recommended.
				</div>
			`);
			
			var apiinfoElem = document.querySelector('#snyprbuddy-apiinfo');
			
			// Add a new tenant box copying the format of the other inputs
			var passwordInputGroup = document.querySelector('.input-group.form-group:last-of-type');
			if (passwordInputGroup) {
				passwordInputGroup.insertAdjacentHTML('afterend', `
					<div class="input-group form-group">
						<div class="input-group-addon">
							<span class="fa fa-fw fa-cog"></span>
						</div>      
						<input class="form-control" placeholder="Tenant ID (Find on Hadoop Settings Page)" name="j_tenant" type="text" autocomplete="off" value="" maxlength="150">                                            
					</div>
				`);
			}
			
			loginButton.insertAdjacentHTML('afterend', `
				<button class="btn btn-warn btn-block" id="snyprbuddy-genapibutton">SNYPRBuddy: Generate API Token</button>
			`);
			
			// On click of the genapi button, generate a token and fill the textbox
			document.querySelector('#snyprbuddy-genapibutton').addEventListener('click', function(event) {
				event.preventDefault();
				
				var form_username = document.querySelector('[name="j_username"]').value;
				var form_password = document.querySelector('[name="j_password"]').value;
				var form_tenant = document.querySelector('[name="j_tenant"]').value;
				
				fetch(genToken, {
					"method": "GET",
					"headers": {
						"username": form_username,
						"password": form_password,
						"tenant": form_tenant,
						"validity": "" + tokenValidityDays
					}
				}).then(function(response) {

					// The API call was successful!
					if (response.ok) {
						return response.text();
					}
					// There was an error
					return Promise.reject(response);
					
				}).then(function (data) {
					
					apiinfoElem.innerHTML = `SNYPR Token Generated <br><br> ${data} <br><br> Validity: ${tokenValidityDays} days <br><br> Keep this token safe as it will not be displayed again.`;
					
				}).catch(function (err) {	
				
					apiinfoElem.innerHTML = 'Something went wrong - validate credentials and try again: ' + err.status;
					
				});
			});
		});
		
	}

	// Add "generate API key" button
	// Get the current URL
	
}

var settingsEnhance = function() {
	
	// If we access the Spotter Config (may be the first page, so auto-apply just in case)
	
	observeElementAndReapply(document.querySelector("#spotterConfigTD"), function() {
		
		// Add a button to the button bar
		var buttonBar = document.querySelector("#spotterConfigTD .buttonBar.fixed-button-bar");
		
		if (buttonBar) {
			// This endpoint is exposed on the Spotter page but it does not make sense
			// To separate the config from the refresh
			// This button allows the user to apply immediately after saving
			buttonBar.insertAdjacentHTML('beforeend', `
			    <button type="button" class="btn btn-secondary" onclick="securonix.helpers.ui.executeAction('/spotter/refreshSpotterConfig', {}, function() { securonix.alertbox.showAlert('SNYPRBuddy Auto-Apply', 'SNYPRBuddy has activated the refreshSpotterConfig endpoint - this should apply whatever is possible immediately as opposed to requiring Solr+Application restart.', 400, 200, true, false, '', '', ''); });">SNYPRBuddy - Apply Immediately Without Restart (Must Save First)</button>
			`);
			
		}

	}, true);	
}

var headerEnhance = function() {
	// Insert a identicon beside the current logo with some padding to make it look nice
	var brandIconElem = document.querySelector('.navbar-brand');
	
	if (brandIconElem) {
		
		// Generate icon with a color that matches the icon of the header
		var seed = window.location.hostname;
		
		// Match the style of the current logo
		var options = {
			background: [17, 41, 67, 255],
			margin: 0.2,
			size: 50,
			format: 'svg'
		};
		
		// Generate the SVG data
		var icondata = generateIconSVGfromText(seed, options);
		
		// Add it to UI
		brandIconElem.insertAdjacentHTML('afterend', `
			<img id="snyprbuddy-icon" alt="Unique Icon for ${seed}" style="padding-right: 5px; background-color: #112943;" class="pull-left buddynet-block" src="data:image/svg+xml;base64,${icondata}">
		`);
		
		// Special mode to enable "hidden" features by double clicking the SNYPRBuddy Icon
		document.querySelector('#snyprbuddy-icon').addEventListener('dblclick', devFunctions, {once:true});
	}
}

var footerEnhance = function () {	
	// Augment version tag with BUDDY
	// If the footer exists
	var footer = document.querySelector('.footer .version');
	if (footer !== null) {
		footer.innerHTML += ' + BUDDY V' + chrome.runtime.getManifest().version;
	}
}


var buddyNet = function() {
	
	var generateFreshNote = function(path) {
		var genRecordInner = {
			'element': path,
			'shortname': '',
			'comments': []
		};
		
		return genRecordInner;			
	};
	
	// https://github.com/lqzhgood/Element-Picker
	const pickerInstance = new Picker({
		mode:'target',
		switch: false,
		events: [{
			key: 'contextmenu',
			fn(event) {
				console.log('Diy contextmenu Event', event.target, event);
				event.preventDefault();
			},
		}],
		onInit() {
			console.log('init finish');
		},
		onClick(event) {
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
					
			// Todo: Future validation
			//	- Exclude certain tagNames (INPUT, TEXTAREA)
			//	- Exclude specific elements by class, id
			//	- Confirm unique selector
			//	- Confirm root of the selector is an ID
			//	- Current approach can have weird cross-page issues
			//	- Avoid highlighting something already augmented (though this seems to be gracefully handled already? How did I do it?)
			
			// Confirm this is a unique element
			var path = cssPathForElement(event.target);
			var selectorResults = document.querySelectorAll(path);
			
			// Confirm element selection if we didn't just trigger
			if (!event.target.classList.contains('buddynet-block') && event.target.tagName != "TEXTAREA" && !event.target.classList.contains('buddynet-icon') && selectorResults.length == 1) {
				// Todo: Figure out if we want to re-use or just destroy()
				this.off();
				//this.destroy();
				
				// Hide the Verbose Display
				document.querySelector('#buddynet-verbose').style.display = 'none';

				// When we click an element
				// Generate a record (todo: determine if there already was one)
				// Todo2: Exclude if we're clicking a buddynet thing - too meta....
				var note = generateFreshNote(path);
				
				augmentObjectWithBuddyNet(event.target, note);
				
				// Trigger as if you clicking the new element you want to add
				event.target.querySelector('.buddynet-icon').click();
			}
			
		},
		onHover(event) {			
			// Augment the UI with the element being hovered over
			// Error message if it is a non-unique element
					
			var path = cssPathForElement(event.target);
			var selectorResults = document.querySelectorAll(path);
			
			document.querySelector('#buddynet-verbose span').innerText = selectorResults.length == 1 ?  'BUDDYNet - Tag Element: ' + path : "Element is not unique - cannot tag";
			
			selectorResults.forEach(function(elem) {
				elem.classList.add("_picker_target_elm");
			});			
		}
	});
	
	// Add a BUDDYNet Button to the UI
	var menuButton = document.querySelector('.navbar-nav .main-menu');
	
	if (menuButton) {
		menuButton.insertAdjacentHTML('beforebegin', `
			<li class="main-menu">
				<div class="dropdown">
					<a alt="Tag an Element in the UI and Add Your Comments" href="#" id="buddynet-start-icon" class="buddynet-block dropdown-toggle">
						<span class="buddynet-block padding-tp-10">BUDDYNet</span>
					</a>
				</div>
			</li>
		`);
	}
	else {
		return;
	}
	
	// Inject the Modal Template into the UI
	// This is the core of the new BUDDYNet
	document.querySelector('body').insertAdjacentHTML('beforeend', `
	<div class="modal fade" id="buddynet-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="buddynet-title">BUDDYNet - View or Submit Comments</h4>
				</div>
				<div class="modal-body">
					<div class="alert alert-info" role="alert" id="snyprbuddy-buddynet-info">
						<b>Initial Release</b> - Welcome to BUDDYNet - a highly experimental SNYPRBuddy network for exchanging information across the entire SNYPRBuddy userbase. BUDDYNet allows you to tag an "element" of the SNYPR interface and add comments.
						<br>
						<br> Comments are <b>retrieved</b> automatically from the internet
						<br> Comments are <b>submitted</b> by currently emailing <b>sprashker@securonix.com</b> the JSON that will be generated upon comment 'posting'.
						<br>
						<br> This process will be further streamlined over time.
					</div>
					
					<div class="row bootstrap">
						<div class="col-md-12">
							<div class="comment-wrapper">
								<ul id="buddynet-comment-list" class="media-list buddynet-style-fix">
								
								</ul>
							</div>
						</div>
					</div>
									
					<form id="buddynet-comment-form" class="form-block">
						<div class="row">
							<div class="col-md-8">
								<div class="form-group fl_icon">
										<div class="icon"><i class="fa fa-cogs"></i></div>
										<input readonly name="element" class="form-input" type="text" placeholder="HTML Element to Hook To (wait how'd you see this?!)">
								</div>
							</div>	
							<div class="col-md-4">
								<div class="form-group fl_icon">
										<div class="icon"><i class="fa fa-cogs"></i></div>
										<input name="shortname" class="form-input" type="text" placeholder="(Optional) Shortname">
								</div>
							</div>
						</div>
						
							
						<div class="row">
							<div class="col-md-6">
								<div class="form-group fl_icon">
									<div class="icon"><i class="fa fa-user"></i></div>
									<input name="author" class="form-input" type="text" placeholder="Author of the post">
								</div>
							</div>
						</div>
					
						<div class="row">
							<div class="col-md-12 buddynet-style-fix">
								<textarea name="content" id="buddynet-commentbox" class="form-control" placeholder="write a comment... [markdown supported]"></textarea>
							</div>
						</div>
					</form>
					
					<div id="buddynet-json-result" class="row">
						<div class="col-md-12">
							<div class="form-group">
								<label>COPY THE FOLLOWING BLOCK AND SEND TO <b>sprashker@securonix.com</b> via Email, Hangouts, <a target="_blank" href="https://securonixhq.slack.com/team/UE2FZBU2Y">or Slack</a></label>
								<textarea class="form-control" rows="4" readonly></textarea>
							</div>
					</div>
				</div>
				
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button id="buddynet-submit" type="button" class="btn btn-primary">Prepare JSON to Submit Comment</button>
				</div>
			</div>
		</div>
	</div>
	`);
	
	document.querySelector('body').insertAdjacentHTML('beforeend', `
		<div id="buddynet-verbose">
			<span style="font-size: 20px; float:right; line-height: 50px; color: black;"></span>
		</div>
	`);
	
	// Augment the textarea to become a Markdown Box
	// (Wow, what a cool script)
	var buddynetCommentBox = new EasyMDE({
		element: document.querySelector('#buddynet-commentbox'),
		spellChecker:false,
		autoDownloadFontAwesome:false,
		autosave: false,
		forceSync: true,
		toolbar: ["bold", "italic", "strikethrough", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "code", "link", "table", "|", "preview", "side-by-side", "fullscreen", "|", "guide"]
	});

	document.querySelector('#buddynet-submit').addEventListener('click', function(event) {
		var formData = serializeObjectOneElement(document.querySelector('#buddynet-comment-form'));
		formData['timestamp'] = unixtime();
		
		// Show the results box
		document.querySelector('#buddynet-json-result').style.display = 'unset';
		
		// For now put the JSON in the UI
		document.querySelector('#buddynet-json-result textarea').innerText = JSON.stringify(formData);
	});

	// Given comments blurb turn it into HTML
	var commentsToHTML = function(comments) {
		var html = "";
		
		// If there's no comments, have an example comment
		if (comments.length == 0) {
			html += `
				<li class="media">
					<span style="user-select:none;" class="pull-left">📄</span>
					<div class="media-body">
						<span class="text-muted pull-right">
							<small class="text-muted">Hello World!</small>
						</span>
						<p>
							<strong class="text-success">No Comments</strong>
							<p>When adding a comment, be sure to <strong>add as much detail as possible</strong></p>
							<p>Information such as:</p>
							<ul>
								<li>Version Number</li>
								<li>Relevant Tickets, Forum Posts, etc</li>
								<li>Documentation Links (if applicable)</li>
								<li>Did we mention as much detail as possible?</li>
							</ul>
							<p>Markdown is very powerful, so be sure to <em>leverage</em> the <strong>styles</strong> <code>it exposes</code></p>
							<p>Don't forget to click the <code>Preview</code> button to see what it looks like.</p>
							<p>When you are satisfied with your comment. Post it.</p>
						</p>
					</div>
				</li>
			`;	
		}
		else {
			Array.from(comments).forEach(function(c) {
				var contentConverted = buddynetCommentBox.markdown(c['content']);
							
				// Convert unixtime to localtime
				var ts = new Date(c['timestamp'] * 1000);
				
				html += `
					<li class="media">
						<span style="user-select:none;" class="pull-left">📄</span>
						<div class="media-body">
							<span class="text-muted pull-right">
								<small class="text-muted">Submitted: ${ts}</small>
							</span>
							<strong class="text-success">${c['author']}</strong>
							<p>
								${contentConverted}
							</p>
						</div>
					</li>
				`;		
			});
		}
				
		return html;
	}
	
	var augmentObjectWithBuddyNet = function(el, details) {
		if (el.querySelector('.buddynet-icon') != null) {
			console.log('Already applied');
			return;
		}
		
		var commentCount = details['comments'].length;
		
		// Display the comment count in UI
		el.classList.add('buddynet-parent');
		el.insertAdjacentHTML('beforeend', ` 
			<div data-toggle="modal" data-target="#buddynet-modal" class="buddynet-icon">
				<span><i class="fa fa-info-circle"></i> ${commentCount}</span>
			</div>`
		);
		
		var buddyNetModalElement = document.querySelector('#buddynet-modal');
		
		// When we click it, present the bigger picture
		// Edit the thing
		el.querySelector('.buddynet-icon').addEventListener('click', function(event) {	
			
			// Populate the template with the innerHTML we need
			
			// Element we are augmenting
			buddyNetModalElement.querySelector('[name="element"]').value = details['element'];
			
			// Allow shortname to be edited if it is empty
			// Otherwise, block it
			buddyNetModalElement.querySelector('[name="shortname"]').value = details['shortname'];
			buddyNetModalElement.querySelector('[name="shortname"]').readOnly = details['shortname'].length != 0;
			
			// Add comments to UI
			buddyNetModalElement.querySelector('#buddynet-comment-list').innerHTML = commentsToHTML(details['comments']);
			
			// Hide the Result of a Previous Comment JSON Blurb
			buddyNetModalElement.querySelector('#buddynet-json-result').style.display = 'none';
			
			// Default to login name
			var author = getLoginUsername(); // + ' @ ' + helperHash(window.location.hostname);
			buddyNetModalElement.querySelector('[name="author"]').value = author;
			
		});
	}
	
	var startBuddyNet = function (dataobj) {
		
		var RETRY_COUNT = 10;

		// Enable the ability to create new anchors by clicking the snyprbuddy icon
		// Todo: Determine maybe a nicer way to start this functionality
		var buddynetIcon = document.querySelector('#buddynet-start-icon');
		
		if (buddynetIcon) {
			buddynetIcon.addEventListener('click', function() {
				document.querySelector('#buddynet-verbose').style.display = 'unset';
				pickerInstance.on();
				
				// Use SNYPR notification toast
				injectScript(function() {
					showNotification([{'info':"BUDDYNet - Tag an element and attach your comments"}]);
				});
			});
		}
		
		// This block observes all changes on the page
		// Checks if it requires BUDDYNet augmentation
		// And augments it accordingly
		observeElementAndReapply(window.document.documentElement, function() {
			
			// Loop through all potential augmentations
			// If we find it, augment it
			Array.from(dataobj['db']).forEach(function(selector, idx, arr) {
				
				// Have a retry block set to 0 if it doesn't exist
				arr[idx]['retry'] = arr[idx]['retry'] || 0;
							
				if (arr[idx]['retry'] < RETRY_COUNT) {
					console.log('BUDDYNet - Looking for: ' + selector['element']);
					
					arr[idx]['retry'] += 1;
									
					var elementExists = document.querySelector(selector['element']);
					
					if (elementExists != null) {
						arr[idx]['retry'] = 0;
						augmentObjectWithBuddyNet(elementExists, selector);				
					}
				}
				else {
					//console.log('BUDDYNet - Skipping: ' + selector['element'] + ' - Hit RETRY LIMIT');
				}
				
			});
			
		}, true, {childList:true, subtree:true});
	}
	
	
	// Historical Purposes
	chrome.storage.local.remove(["buddynetLastRemotePullTS","buddynetCachedData"]);

	persistentCacheFunction('BUDDYNET_INTERNET_DATA', 3600, function() {
		return fetch("https://raw.githubusercontent.com/prashker/BUDDYNet-DB/master/data.json", {
			mode: 'cors',
			cache: 'no-cache'
		})
		.then(function(response) {
			// The API call was successful!
			if (response.ok) {
				return response.json();
			}
			// There was an error
			return Promise.reject(response);
		});
	}, startBuddyNet);
	
}

// Helper func (to move)
var paginationHelper = function(elemQuery, maxFetch) {
	
	observeElementAndReapply(document.querySelector(elemQuery), function() {

		var pagination = this.querySelector('.paginationContainer > div > select');
		if (pagination) {
			var option = document.createElement("option");
			option.text = maxFetch + " SB";
			option.value = maxFetch;
			pagination.add(option);
		}
		
	});
	
}

var viewsLookupEnhance = function() {
	paginationHelper("#lookupDataList", 9999);
}

var viewsWatchlistEnhance = function() {
	paginationHelper("#wlMembersList", 9999);	
}

var viewsWhitelistEnhance = function() {
	paginationHelper("#whitelistMembersList", 9999);
}

var viewsPeersEnhance = function() {
	paginationHelper("#templatePeerListDiv", 9999);
}

var viewsUsersEnhance = function() {
	paginationHelper("div.st-content", 500);
}

var viewsResourcesEnhance = function() {
	paginationHelper("#allDataSourceDiv", 500);
}

var workflowEnhance = function() {

}

// For all pages containing the following URLs
// Current logic: href changes
// Future logic: address change without href update? (aka ajax req)
var map = {
	'loadDashboard': spotterEnhanceEntryPoint,
	'configurableDashboard': sccEnhance,
	'showPolicyManagement': policyViolationEnhance,
	'jobMonitorView': jobMonitorEnhance,
	'showActivityImport': activityImportEnhance,
	'Snypr/$|login\/auth': loginEnhance,
	'showSystemConfiguration': settingsEnhance,
	'showLookupTableData': viewsLookupEnhance,
	'manageWatchlist': viewsWatchlistEnhance,
	'viewWhitelistDashboard': viewsWhitelistEnhance,
	'showPeerSearch': viewsPeersEnhance,
	'showUserSearch': viewsUsersEnhance,
	'showResourceSearch': viewsResourcesEnhance,
	'showWorkflows': workflowEnhance
};

for (var key of Object.keys(map)) {
	console.log(window.location.href);
	if (window.location.href.match(key)) {
		console.log('Executing func for ' + key);
		map[key]();
		break;
	}
}

// Header+Footer Enhancements
headerEnhance();
buddyNet();
footerEnhance();