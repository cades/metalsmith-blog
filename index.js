var Metalsmith = require('metalsmith');
var drafts = require("metalsmith-drafts");
var markdown = require('metalsmith-markdown');
var archive = require("metalsmith-archive");
var archivePage = require('./plugins/archivePage');
var layouts = require('metalsmith-layouts');
var robots = require('metalsmith-robots');
var watch = require('metalsmith-watch');
var serve = require('metalsmith-serve');

var base = Metalsmith(__dirname)
  .source('./src')
  .destination("build")
  .use(drafts())
  .use(markdown())
  .use(archive({collections: '.'}))
  .use(archivePage())
  .use(layouts('handlebars'))
  .use(robots({
    "useragent": "*",
    "disallow": ["/"]
  }))

if (process.env.WATCH) {
  base = base
    .use(
      watch({
        paths: {
          "${source}/**/*": "**/*",
          "layouts/**/*": "**/*"
        },
        livereload: true
      })
    )
    .use(serve({port: 8070}))
    .build(function(err) {
      if (err) throw err;
    });
}

base.build(function(err) {
  if (err) throw err;
});

