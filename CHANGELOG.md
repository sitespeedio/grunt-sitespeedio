# CHANGELOG - grunt-sitespeedio

0.5
------------------------
* New sitespeed.io release (3.5) with new structure of Graphite keys

0.4.1
------------------------
* Quick fix fixing duplicate dots in graphite graphs

0.4.0
------------------------
* New sitespeed with new graphite URL key structure and ability to define the waitScript

0.3.8
------------------------
* New sitespeed.io more bug fixes.

0.3.7
------------------------
* Upgraded sitespeed.io, the last version had a defect counting the number of requests per domain wrong

0.3.6 
------------------------
* New sitespeed.io version with weight per content type sent to Graphite.

0.3.5
------------------------
* New sitespeed.io version that removes the limit of max 100 domains sent to Graphite, making it possible to post the result JSON and to parse it in individual steps.

0.3.4
------------------------
* New sitespeed.io version with support for sending request timing from WPT to Graphite and set a URL to a selenium server

0.3.3
------------------------
* New sitespeed.io version 3.2.4 was broken

0.3.2
------------------------
* Upgraded to sitespeed.io 3.2.4 with bug fixes for perf budget, custom timings and User Timings.

0.3.1
------------------------
* Upgraded sitespeed.io to 3.2.3 with bug fix for running PhantomJS2 and storing all metrics as JSON

0.3.0
------------------------
* Upgraded sitespeed.io to 3.2.2
* Cleaned up and new config showFailedOnly for showing only failing tests, thanks @zenderol & @bobaaaaa

0.2.0
------------------------
* Based on sitespeed 3.2 and Browsertime 0.9. 

0.1.10
------------------------
* New sitespeed 3.1.12 with bugfix for faulty requests breaking Graphite

version 0.1.9
------------------------
* Cleaned up the structure of the task #5
* New sitespeed.io version 3.1.11 with bugfix for hanging Graphite

version 0.1.8 
------------------------
* New Browsertime with configured browser driver timeout

version 0.1.7 
------------------------
* New sitespeed version with new Browsertime that makes Firefox 36 work

version 0.1.6 
------------------------
* Updating sitespeed with a new Browsertime version that can kill Browsermobproxy on Windows

version 0.1.5
------------------------
* Upgrading sitespeed with fixes for WebPageTest

version 0.1.4
------------------------
* If you use the --file flag, read urls from disk #2
* Output number of failing and passing tests in the log #3
* Bumped to latest sitespeed.io version.

version 0.1.3
------------------------
* New sitespeed.io version that produces HTML output of the budget

version 0.1.2
------------------------
* Call done even when you don't run a perf budget

version 0.1.1
------------------------
* Always generate HTML as default

version 0.1.0 
------------------------
* Say hello to the first released version of the sitespeed.io Grunt plugin! Major focus have been on making the (performance) budget up and running.
