var https = require("https")
  , fs = require("fs")

  , credentialHost = process.env.npm_package_config_credentialHost

module.exports = function(cb) {
  var json = ""
    , path = "./credentials.json"

  if (process.env.TRAVIS) {
    https.get({host: credentialHost}, function(res) {
      res.on("data", function(chunk){ json += chunk })
      res.on("end", function() {

        fs.writeFile(path, json)
        cb(null, require(path))
      })
    }).on("error", cb)    
  }

  else cb(null, require(path))
}