VENDOR_URL = "https://documentation.securonix.com/onlinedoc/Content/Connectors/Content/Content%20Guides/Supported%20Datasources/Vendors/"

function scrape(dom, basehref) {
	
	// Base HREF Hax From
	// https://stackoverflow.com/questions/55232202/optional-baseuri-location-in-domparser
	if (basehref) {
		var baseEl = dom.createElement('base');
		baseEl.setAttribute('href', basehref);
		dom.head.append(baseEl);
	}

	var allConnectors = [];
	
	
	// Index is the column
	var logoRow = [];
	var nameAndCollectionMethodRow = [];
	var versionRow = [];
	
	var vendorElem = dom.querySelector('#mc-main-content h1');
	var vendor = "";
	
	if (vendorElem) {
		vendor = vendorElem.innerText.trim();
	}
	
	
	var rows = dom.querySelectorAll('#mc-main-content tr');
	
	for (var rowidx = 0; rowidx < rows.length; rowidx++) {	
		var row = rows[rowidx];

		//var rowtypeid = (rowidx % 4);
		var rowtypeid = 0;
				
		var cellsForRow = row.querySelectorAll('td');
		
		for (var i = 0; i < cellsForRow.length; i++) {
			var cell = cellsForRow[i];
			
			// If cell is empty, skip
			if (cell.innerText.trim() == "") {
				continue;
			}
			
			// Loop through each row, and then take each column
			
			if (cell.querySelector('.H5_VendorPage') != null) {
				var title = (cell.querySelector('.H5_VendorPage') || "").innerText;
				
				var collectionMethods = [...cell.querySelectorAll('.UnderlineHover_LeftAligned_DropDown > a')].map(function(elem) {
					return {
						'type': (elem.innerText || "").trim(),
						'link': elem.href
					};
				});
								
				nameAndCollectionMethodRow.push({
					'vendor': vendor,
					'title': title,
					'methods': collectionMethods
				});
			}
			else if (cell.querySelector('.UnderlineHover_LeftAligned_DropDown > a') != null) {
				
				var versions = [...cell.querySelectorAll('.UnderlineHover_LeftAligned_DropDown > a')].map(function(elem) {
					return {
						'type': (elem.innerText || "").trim(),
						'link': elem.href
					};
				});
				
				versionRow.push(versions);
				
			}			
		}		
		
	}
	
	for (var i = 0; i < nameAndCollectionMethodRow.length; i++) {
	
	
		var collection = nameAndCollectionMethodRow[i];
		collection['versions'] = versionRow[i];
		
		allConnectors.push(collection);
		
	}

	return allConnectors;

}

var connectorList = [...document.querySelectorAll('a > .ConnectorsButton_Hover')];


var completeListAwait = await Promise.all(connectorList.map(u=>fetch(u.parentElement.href))).then(responses => Promise.all(responses.map(res => res.text()))).then(texts => {
	
	var exec = texts.map(function(t) {
		
		// Initialize the DOM parser and parse the page
		var parser = new DOMParser();
		var doc = parser.parseFromString(t, "text/html");
		
		return scrape(doc, VENDOR_URL);
	});
	
	return exec;
	
});

console.log(JSON.stringify(completeListAwait.flat(1), null, '\t'));
//console.log(finalResult);