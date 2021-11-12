# SNYPRBuddy - Changelog

Field Centric Enhancements to SNYPR UI.

Download/Install: https://chrome.google.com/webstore/detail/snyprbuddy/jcneackodnpcojhjieebmnccokdbonab

## [0.26.0] - 2021-09-08 - Deep Linking for Faster Work

## Added
- Security Command Center - Deep diving into violations now offers the ability to Open Violations in New Tab.
  - To accomplish this, a deep link is generated which allows users to directly access a violation
  - The link is compatible even for users who do not have SNYPRBuddy (as in, you can share with anyone!)

## [0.25.1] - 2021-08-26 - BUDDYNet for Documentation

## Changed
- Add Data - Recommended documentation will now automatically reference a JSON file stored on BUDDYNet-DB repository (https://raw.githubusercontent.com/prashker/BUDDYNet-DB/master/documentation_json.json) instead of hardcoded with the Chrome Extension
  - Results cached for 1 day

## [0.25.0] - 2021-08-10 - Documentation Galore

## Added
- Add Data - SNYPRBuddy will now recommend documentation depending on the type of datasource that is being onboarded
  - The data is sourced from https://documentation.securonix.com
  - This feature uses fuzzy search logic to attempt to find the relevant documentation

## [0.24.0] - 2021-07-09 - JUPTER BOUND!

## Added
- This release is focused on compatibility with SNYPR JUPITER 6.4 - some features may not work, but the initial goal was to ensure compatibility. 
  - SNYPR 6.4 Prep - Gracefully handle BUDDYNet incompatible pages
  - SNYPR 6.4 Prep - Spotter - "Show All" buttons for Violations and Datasources adapted to 6.4 logic
  - SNYPR 6.4 Prep - Spotter - Available Violations Enhancements

## [0.23.8] - 2021-03-26 - Hidden

## Removed
- Menu - The Security Center has removed the Widget Configuration page at the request of SNYPR Engineering

## [0.23.7] - 2021-03-25 - Show All for the other thing...

## Added
- Spotter Dashboard -> Available Datasources -> "Show All" button has been added. This will display all datasources in a single page for easy viewing.

## [0.23.6] - 2021-03-03 - Manifest Revert.

## Changed
- Chrome Extension - Manifest changes bigger than expected. Back to v2 for now.

## [0.23.5] - 2021-02-05 - Manifest oh Manifest.

## Added
- Views - Pagination Options - Now augmented with expanded pagination options (higher)
  - Currently affects following pages - Lookup Table - Watch Lists - White Lists - Peers - Resources
  - Concerns for performance have been taken into account.

## Changed

- Chrome Extension - Changes have been made to conform with the new upcoming Manifest v3 - for more information see here: https://blog.chromium.org/2020/12/manifest-v3-now-available-on-m88-beta.html
  - Very minimal changes were done so expecting no backwards compatibility issues, however, if so, expect a quick patch turnaround to revert this!
  - It is unclear when Manifest v2 will be disallowed, but I figured it is best to be proactive with this kind of change.

## [0.23.4] - 2020-12-11 - Oops!

## Changed
- Bugfix - Context Menu - Sometimes would not show up

## [0.23.3] - 2020-12-11 - Happy Holidays!

## Added
- Policy Violations - Add the "policy_master" ID for each policy to the Type Column
  - This will be useful for people who usually look in the back end frequently and require the Policy ID for debugging.

## [0.23.2] - 2020-11-20 - API fixes

## Changed
- SNYPR Login Page - API now requires "tenant ID" for API token generation

## [0.23.1] - 2020-11-04 - Time keeps on slippin slippin slippin, into the future.

## Changed
- Context Menu - Performance Fix - Does not enhance if not visible (will speed up SNYPRBuddy if you noticed any hiccups)
- Spotter - Time Delay/Since now updated to work on 6.3.2 / MSSP / Verizon build

## [0.23.0] - 2020-10-16 - https://www.youtube.com/watch?v=YINJj6DzBps

## Added
- Context Menu - employeeid attribute now has an option to load the User Profile page for that respective record (if correlated)
- Spotter - Added a new "Share" button of sorts that turns the currently inputted Spotter query into a shareable URL
  - This feature should work for sharing to people who do not even have SNYPRBuddy installed!

## Changed
- Spotter - Bugfix - TOP/STATS enhanced columns have been fixed in 6.3.x - this feature is hidden so not many people would have noticed it was broken

## [0.22.2] - 2020-07-17 - Another One - DJ Khaled

## Added
- SNYPR 6.3.1 - Non-fatal error in Dev Console resolved

## [0.22.1] - 2020-07-09 - 6.3.1 Fix

## Added
- SNYPR 6.3.1 - Bugfix with regards Ingester and Ingestion Schedule statistics pull from Job Monitor page (forward and backwards compatible)

## [0.22.0] - 2020-05-26 - Catchup

# Added
- SNYPR 6.3 - Bugfixes to support 6.3.x after reports from users that features were broken

## [0.21.0] - 2020-05-01 - Some more Job Monitor monitoring

## Added 
- Spotter Dashboard - Ingestion schedule (if Job is Scheduled) will also be augmented in UI
- Spotter - Spotter results will now augment the header of Activity Data with the Ingester Schedule (similar to above)

## [0.20.0] - 2020-04-16 - Stealing from the Job Monitor

## Added
- Spotter Dashboard - Available Datasources now augmented with the Ingester responsible for the datasource
  - Will show the hostname of the RIN or "Console" or "No Job Scheduled" respectively
- Spotter - Spotter results will now augment the header of Activity Data with the Ingester responsible (similar to above)

## [0.19.0] - 2020-04-09 - Keeping up with Redis Counts

## Added
- Policy Violations - Lookup Tables/Watchlist/Active List now auto-queried for their counts
  - "Get Entity Count" is replaced with an automatic count
  
## Changed
- Context Menu - Bugfix - Remove context menu additions where it fails to apply (fixes error in Console)
- BUDDYNet - New button in menu of UI to activate
  - Instead of a confusing click of the exisitng icon, a new unique "BUDDYNet" icon is placed beside the menu
  - Additionally shows an Notification Toast on how to use it

## [0.18.0] - 2020-03-24 - Pit stop

## Added
- Spotter - Context List - IBM X-Force has been added to the list
- Spotter - Context List - sourceaddress, destinationaddress, sourcehostname, destinationhostname have been augmented IP or URL options respectively
- Policy Violations - Sidebar now supports filtering "By Category"
  - This slightly conflicts with CU4SP4 which allows you to search by Sandbox Category however is overall good

## Changed
- BUDDYNet - Augmented icon is now semi transparent until hovered over
  - Want this to be as least intrusive as possible while maintaining usefulness
- BUDDYNet - Internal performance changes on how element searching is done
  - Maintains a "retry counter" to avoid continuously polling the page for an element that will never show up

## [0.17.0] - 2020-03-15 - BUDDYNet is a series of tubes (or the Spam Sam's Inbox Feature)

## Added
- New Feature - BUDDYNet - A highly experimental SNYPRBuddy network for exchanging information across the entire SNYPRBuddy userbase. BUDDYNet allows you to tag an "element" of the SNYPR interface and add comments.

## Changed
- Job Monitor - Bugfix - Indexed Events = 0 now properly handled


## [0.16.0] - 2020-02-20 - The Big Minor (or The Big Kahuna in a Backwards Compatible Manner)

## Added
- Settings - Spotter Settings - Adds a button beside "Save" on the Spotter Settings page to allow quick apply of the changes without restart
- Policy Violations - New "View All Steps" button to show all details on one page. This disables the ability to save any changes however gives a View-Only-ish view at all policy config without risking changing anything.
- Policy Violations - Able to search Directive Conditions in Spotter with new "Search in Spotter" button beside directive
- All Pages - Header (SNYPR Logo) is now enhanced with a unique icon, also known as an identicon/gravatar - generated it using the hostname of the SNYPR URL and the header

## Changed
- Policy Violations - Bugfix - Config-to-Spotter Query now properly handles NULL/NOT NULL
- Policy Violations - Bugfix - Quick-Edit auto closes sidebar on load (fixes UI issue)
- Internal - Bugfix - "Copy to Clipboard" previously it encoded special characters improperly. Now uses a b64DecodeUnicode helper function.
- Policy Violations - "Config-to-Spotter" now takes into account the datasource name and adds it to the Spotter query. Checks if the policy being worked on is non-functionality based, and adds resourcegroupname="XXX" to the Spotter query

## [0.15.1] - 2020-02-04 - Yes...?

## Changed
- "Open in New Tab" - BugFix: searchParams.set() now used instead of delete/append
- "Open in New Tab" - BugFix: replaceAppendToURL helper function to avoid double GET parameters

## [0.15.0] - 2020-01-21 - Need to work faster!

## Added
- Policy Violation page - augmented each row with a "Open in New Tab" edit link to quickly modify policies without reloading page

## Changed
- Internal - Base64 is used for the majority of inter-page communications (Spotter Search URLs, Quick Edit)

## [0.14.0] - 2020-01-08 - SNYPR has an API

## Added
- SNYPR Login Page - Allow easy way to generate API token
  - Exposes a new way to generate an API token that doesn't use the API itself. Normally this stuff goes on the UI.
  - Adds a "SNYPR API" button to the login window which exposes a dialog and a new button exposing the functionality.
  - Slight error handling and user is warned this is EXPERIMENTAL.

## Changed
- Job Monitor - Logic Change: Compare to total events parsed rather than total events indexed when determining the number of correlated events and violations
- Job Monitor - BugFix: Daily Correlated Events and Violations handle 0% properly (previously displayed "NaN")

## [0.13.1] - 2020-01-01 - New Year New Monitor

## Changed
- Job Monitor - Do not colour code dependent items if zero Published events
- Job Monitor - Job Details are properly enhanced when search bar is used

## [0.13.0] - 2019-12-29 - Who monitors the monitor?

## Added
- Job Monitor - "Today's Run Statistics" are now colour coded in an attempt to quickly discern if there is an issue or not with the DS ingestion
  - Green indicates reasonable belief of no issue
  - Yellow indicates potential issue (ex: no published events, discrepancy between parsed/indexed and published, etc)
  - Red is a clear issue (ex: unparsed events)
- Job Monitor - The datasource RGID has been added under the Job Information to quickly determine RGID
- Job Monitor - The number of daily correlated events (previously exposed by clicking the Datasource Name) is now shown under the Job Information to quickly glance at success rate of ingestion
- Job Monitor - The number of daily violations (previously exposed by clicking the Datasource Name) is now shown under the Job Information to quickly glance at violation rate

## Changed
- Semantic change to versioning (previously 0.0.12, now 0.13.0 reserved for Major.Minor.BugFix)

## [0.0.12] - 2019-12-11 - Wait a minute, bugs? [Part2]

## Changed
- Behind the hood, Spotter is now properly handling page changes to avoid re-enhancing the page many times
- Spotter - Augmented with some additional debug information with regards to timezone parsing
- Spotter - "Time Since" and "Time delay" for Violations and Datasources now attempt to handle negative delays as a result of config or timezone parsing issues

## [0.0.11] - 2019-12-04 - Wait a minute, bugs?

## Changed
- Spotter Dashboard enhancements are now refreshed when actions such as "Update Cache" is clicked (bugfix)

## [0.0.10] - 2019-11-06 - Secret Menus

## Added

- Menu - The Security Center menu is now augmented with the "Widget Configuration" page - a page that allows Dashboard Management from the UI

## [0.0.9] - 2019-11-04 - Timezones ACTUALLY matter.

## Changed
- Now using moment.js to calculate timezone offsets when calculating "Time Since" and "Time Delay" - users with confusing timezone setups (local and application) should now see everything relative properly now!

## [0.0.8] - 2019-10-29 - Timezones matter.

## Changed
- Spotter - "Time Since" and "Time delay" for Violations and Datasources now attempt to take into account Application Timezones
  - This is a bugfix targeting where users local time does not equal Application Timezone
- Spotter - Context menu has been enhanced to auto-expand and avoid a scrollbar

## [0.0.7] - 2019-10-24 - Kazoo

### Added
- Spotter - Context List has been expanded for more sources of information
  - IPAddress, EmailSenderDomain and EmailRecipient Domain now offer the ability to search VirusTotal, Talos, ThreatMiner, ThreatCrowd, Censys, Shodan, ZoomEye, and more!
- Activity Import - Policies on the final step of scheduling an Activity Import now display the number of policies enabled, and the totals associated with it

## Changed
- Spotter enhancements have now been modified to apply to (most) areas where Spotter is present. 
  - Main Spotter Page
  - SCC - Violation Events
  - Incident Dashboard - Violation Events

## [0.0.6] - 2019-10-23 - A little bit here, a little bit there

### Added
- Job Monitor - Most imports have some useful information within the alt text of the Job Name (when you hover over the name) - this information has now been moved to the UI beside the rest of the information already available for Job Details
- Policy Violations -> Pagination options now have an "All" addition to show all Policies on 1 screen
- Activity Import -> Prepend resource group ID to every datasource name - similar to Spotter screen


## [0.0.5] - 2019-10-17 - I Spot You Spot
### Added
- Spotter - Normal Spotter queries now have all attributes augmented with additional options when attributes are clicked
  - Copy to Clipboard is available for all attributes
  - ipaddress is augmented to allow search to VirusTotal and Talos
- Spotter - TOP queries have their tables augmented when ipaddress is referenced, also displaying VirusTotal and Talos

## [0.0.4] - 2019-10-10 - 気づいた
### Added
- Policy Violations - IEE Policies now have a live Spotter query generator with the option to "Copy to Clipboard" and "Search in Spotter". Incredibly useful in policy development and debugging.
- Internal - Helper Function Added - serializeArray used -  (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com

### Changed
- Internal - Existing helper functions moved to own helpers.js and updated in manifest.json accordingly

## [0.0.3] - 2019-10-05 - Huh? We're Live?
### Added
- Policy Violation page - augmented each row with a "Spotter" search icon for quick searching in Spotter

### Changed
- "DS Status" now populates the "Filter datasources" box properly. Without it would make it confusing how to proceed.
- Footer adding logic no longer fails on pages without footer
- Time Delay and Time Since adjusted to do proper Hours:Minutes:Seconds display. Previously was overflowing after 24 hours in seconds.

## [0.0.2] - 2019-08-17 - Hello Future World
### Added
- Spotter Dashboard -> Available Violations -> "Show All" button has been added. This will display all violations in a single page for easy viewing.

### Changed
- Spotter Dashboard -> "DS Status" button enhanced for a more seamless automatic experience. Will now automatically scroll back to results.
- Spotter Dashboard -> Auto-expanding logic has been reimplemented to accomodate a slow page

### Removed
- None

## [0.0.1] - 2019-08-16 - Hello World
### Added
- Spotter Dashboard -> Available Datasources -> Auto-expands datasource list (supports pagination, ordering, DOM changes)
- Spotter Dashboard -> Available Datasources -> Prepend resource group ID to every datasource name for easy viewing
- Spotter Dashboard -> Available Datasources -> "Time Delay" debugging added, displays delay between current time since last seen event. Color coded depending on delay duration (currently <1hr = green, <2hr = orange, >2hr = red)
- Spotter Dashboard -> Available Violations -> Auto-expands list
- Spotter Dashboard -> Available Violations -> "Time Since" debugging added, for easier info of when latest violation was found
- Spotter Dashboard -> Available Violations -> "DS Status" button added - for quick search on Available Datasources List
- Footer -> SNYPR Version augmented with SNYPRBuddy version number (as an indicator that the extension is enabled)

### Changed
- None

### Removed
- None
