var fs = require("fs"),
    http = require("http")
    util = require("util"),
    path = require("path")

var last_url = null

var config = 
{
  "nodes": {
    "0": "default.html",
    "1": "twitter-baekdal-lemans.html",
    "2": "radiolemans.html"
  },
  "server": {
    "html": "../html"
  }
}

// Load the config from disk, if it exists
var config_file = "config.json"
if (fs.existsSync(config_file)) {
  var config_file_contents = fs.readFileSync(config_file, 'utf8')
  if (config_file_contents) {
    config = JSON.parse(config_file_contents);
  }
  console.dir(config_file);
} else {
  console.log(config_file + " does not exist, using default config")
}

http.createServer(function (req, res) {

  console.log("Current config:")
  console.log(config)

  function route() {

    console.log("Request at: " + req.url)
    last_url = req.url

    if (req.url.indexOf("/favicon.ico") == 0) {
      res.end()
      return
    } else if (req.url.indexOf("/node/") == 0) {
      var browser_node = null

      var browser_node_pattern = /\/node\/(\d+)/
      var r = req.url.match(browser_node_pattern)

      if (r) {
        // Pass the node number to the function that creates
        //  the page
        page_node(res, r[1])
      } else {
        // Default cloent to the special node 0
        console.log("Unable to parse node number from this host")
        page_node(res, 0)
      } 
    } else {
      page_main(res) 
    }
  
  }

  route()

}).listen(9615);

console.log("Server running on port 9615")

function page_main(res) {
  res.write("<html><body>")
  res.write("This is the main page<br>")
  res.write(util.inspect(config))
  res.end("</body></html>")
  fs.readdir(".", function(err, files) {console.log(files)})
}

function page_node(res, node_number) {
  var node_config = config["nodes"][node_number]
  if (!node_config) {
    node_config = config["nodes"]["0"]
  }
  console.log("Server config" + config["server"])
  html_contents_file = path.join(config["server"]["html"], node_config)
  console.log("Contents file: " + html_contents_file)
  fs.readFile(html_contents_file, function(err, data) {
    res.end(data)
  });
}
