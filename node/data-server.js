// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var util = require('util')
var zlib = require('zlib')

var last_data = null
var last_data_headers = null
var content_encoding = null

function PostCode() {

// Example cURL from Chrome webpage: curl 'http://live.fiawec.com/proxy.php?i=&t=&file=1/live/data.js' -X POST -H 'Cookie: __utma=203182604.1037311345.1402603651.1402606580.1402613069.3; __utmb=203182604.1.10.1402613069; __utmc=203182604; __utmz=203182604.1402603651.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)' -H 'Origin: http://live.fiawec.com' -H 'Accept-Encoding: gzip,deflate,sdch' -H 'Accept-Language: en-GB,en-US;q=0.8,en;q=0.6' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.102 Safari/537.36' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Referer: http://live.fiawec.com/' -H 'X-Requested-With: XMLHttpRequest' -H 'Connection: keep-alive' -H 'Content-Length: 0' --compressed

  // An object of options to indicate where to post to
  var post_options = {
      host: 'live.fiawec.com',
      port: '80',
      path: '/proxy.php?i=&t=&file=1/live/data.js',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Origin': 'http://live.fiawec.com',
          'Accept-Encoding': 'gzip,deflate,sdch',
          'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6', 
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.102 Safari/537.36',
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'Referer': 'http://live.fiawec.com/',
          'X-Requested-With': 'XMLHttpRequest',
          'Connection': 'keep-alive',
          'Content-Length': '0'
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('binary');
      var data = ""
      res.on('data', function (chunk) {
          console.log('Got response chunk of length' + chunk.length);
          data += chunk
      });
      res.on('end', function () {
          console.log("finished!")
          //console.log(util.inspect(res))
          encoding = res["headers"]["content-encoding"]
          if (encoding != null) {
            content_encoding = encoding
          }
          
          console.log("encoding of data was: " + encoding + ' of length ' + data.length)
          last_data = data
          last_data_headers = res["headers"]
          

      });
     res.on('response', function(response) { 
 
         console.log("Content encoding: " + response["content-encoding"])

     });
  });

  post_req.end();

}

// Run every 5 seconds
setInterval(function() {
  PostCode()
}, 5 * 1000)

var data_server_port = 9616

http.createServer(function (req,res) {
    console.log("I was asked for " + req.url)
    if (req.url.indexOf("/data.js") == 0) {
            if (last_data) {
              console.log("returning json of size " + last_data.length)
              console.log("Replaying in header responses from the timing site")
              console.log(util.inspect(last_data_headers))
              Object.keys(last_data_headers).forEach(function(item) {
                res.setHeader(item, last_data_headers[item])
              })
              res.end(last_data, 'binary')
            } else { 
              console.log("Nothing to return")
              res.end()
            }
    }
    else if (req.url.indexOf("/livetiming.html") == 0) {
        fs.readFile("../html/livetiming.html", 'utf8', function(err, data) {
            console.log("returning livetiming.html")
            res.end(data)
        })
    } 
    else if (req.url.indexOf("/jquery-compressed.js") == 0) {
        fs.readFile("../html/jquery-compressed.js", 'utf8', function(err, data) {
            console.log("returning jquery-compressed.js")
            res.end(data)
        })
    } 
    else if (req.url.indexOf("/referential.js") == 0) {
        fs.readFile("../html/referential.js", 'utf8', function(err, data) {
            console.log("returning referential.js")
            res.end(data)
        })
    } 

}).listen(data_server_port)
console.log("Running data server on port" + data_server_port)
