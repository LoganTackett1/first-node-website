const http = require("http");
const fs = require("fs");
const url = require("url");

http.createServer(function (req,res) {
    const parsed = url.parse(req.url,true);
    if (parsed.pathname == '/favicon.ico') {
        return;
    }
    let fileLoc = "./pages" + parsed.pathname + ".html";
    if (fileLoc == "./pages/.html") {
        fileLoc = "./pages/index.html";
    }
    fs.readFile(fileLoc,function (err,data) {
        if (err) {
            console.log(err);
            fs.readFile('./pages/404.html',function (err1,data1) {
                res.writeHead(404,{"Content-Type":"text/html"});
                res.write(data1);
                return res.end();
            });
        } else {
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            return res.end();
        }
    });
}).listen(8080);