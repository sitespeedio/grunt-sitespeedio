# grunt-sitespeedio

## Test your website using sitespeed.io

grunt-sitespeedio is a [Grunt.js](https://github.com/cowboy/grunt/) task for testing your site against web performance best practice rules, fetch timings from a browser, test and enforce [performance budgets](#performance-budget), send performance metrics to [Graphite](http://graphite.wikidot.com/) using [sitespeed.io](https://www.sitespeed.io).

Check out the [documentation](https://www.sitespeed.io/documentation/) to get a full overview of what you can do and test using [sitespeed.io](https://www.sitespeed.io).

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sitespeedio --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sitespeedio');
```

## The sitespeedio task

### Required configuration properties

To start testing pages, you must configure a URL for your crawl.

```javascript
sitespeedio: {
  default: {
    options: {
      urls: ['https://www.sitespeed.io/']
    }
  }
}
```

### Testing multiple URLs
```javascript
sitespeedio: {
  default: {
    options: {
      urls: ['https://www.sitespeed.io', 'https://www.sitespeed.io/faq/']
    }
  }
}
```

With these configuration properties set, you can add `sitespeedio` to your default tasks list. That'll look something like this:

    grunt.registerTask('default', ['jshint', 'sitespeedio']);

With this in place, grunt-sitespeedio will now collect performance metrics for your site.

## The result files
The result files will automatically be stored in a temporary directory. If you want to change that, use
the *resultBaseDir* property, like this:

```javascript
sitespeedio: {
  default: {
    options: {
      urls: ['https://www.sitespeed.io'],
      outputFolder: '/my/new/dir/'
    }
  }
}
```

## Use cases
Fetch timings, sending performance metrics to Graphite and performance budgets.

### Fetching timing metrics

You can choose to collect Navigation Timing and User Timing metrics using real browser. You can choose by using Firefox or Chrome. And you can configure the connection speed ([more info](http://www.sitespeed.io/documentation/#connectionspeed) by choosing between mobile3g, mobile3gfast, cable and native. And choose how many times you want to test each URL (default is 3).

You surely want to combine it with running [Xvfb](https://gist.github.com/nwinkler/f0928740e7ae0e7477dd) to avoid opening the browser.

```javascript
sitespeedio: {
  default: {
    options: {
      urls: ['https://www.sitespeed.io', 'https://www.sitespeed.io/faq/'],
      browsertime: {
        browser: 'firefox'
        connectivity: 'cable',
        iterations: 5,
      }
    }
  }
}
```

### Performance Budget
Test your site against a [performance budget](http://timkadlec.com/2013/01/setting-a-performance-budget/). You can test your site against almost all data collected by sitespeed.io.

Checkout the [example Gruntfile]() and budget looks something like this:

```
budget: {
  "browsertime.pageSummary": [{
    metric: "statistics.timings.firstPaint.median",
    "max": 1000
  }, {
    "metric": "statistics.visualMetrics.FirstVisualChange.median",
    "max": 1000
  }],
  "coach.pageSummary": [{
    "metric": "advice.performance.score",
    "min": 75
  }, {
    "metric": "advice.info.domElements",
    "max": 200
  }, {
    "metric": "advice.info.domDepth.max",
    "max": 10
  }, {
    "metric": "advice.info.iframes",
    "max": 0
  }, {
    "metric": "advice.info.pageCookies.max",
    "max": 5
  }],
  "pagexray.pageSummary": [{
    "metric": "transferSize",
    "max": 100000
  }, {
    "metric": "requests",
    "max": 20
  }, {
    "metric": "missingCompression",
    "max": 0
  }, {
    "metric": "contentTypes.css.requests",
    "max": 1
  }, {
    "metric": "contentTypes.image.transferSize",
    "max": 100000
  }, {
    "metric": "documentRedirects",
    "max": 0
  }]
```

If you want to include/exclude tests in the output, you can switch that by a Grunt config like:

```
grunt.config.set('includePassed', true);
```

### Can't find the configuration

sitespeed.io is highly configurable. The grunt-sitespeedio plugin will pass every option to sitespeed, you can see each and every configuration [here](). Each option needs to be called with full name (meaning the same as using **--** for the cli. Say for example that don't need the screenshot for each. Using the cli, you add the flag <code>--browsertime.screenshot false</code>

Doing the same with the grunt plugin:
```javascript
sitespeedio: {
  default: {
    options: {
      urls: ['http://www.sitespeed.io'],
      browsertime: {
        screenshot: false
      }
    }
  }
}
```
