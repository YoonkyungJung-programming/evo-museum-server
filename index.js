var http = require("http"); //모듈 import
var hostname = "127.0.0.1"; //내컴퓨터 주소 항상 127.0.0.1 이다
var port = 8080;

//http.createServer 를 통해 얻어진 결과같이 const server 에 저장되게 된다
const server = http.createServer(function (req, res) {
  const path = req.url;
  const method = req.method;

  if (path === "/Exhibition") {
    if (method === "GET") {
      //메시지코드 : 200, 나는 json 형태의 응답을 보낼거야
      res.writeHead(200, { "Content-Type": "application/json" });
      const Exhibition = JSON.stringify([
        { name: "The Art of Banksy Online", exp: "아트 오브 뱅크시 온라인" },
      ]);

      res.end(Exhibition);
    } else if (method === "POST") {
      res.end("등록하였습니다");
    }
  }
  res.end("Good Bye");
});

server.listen(port, hostname); //listen === 기다리고 있다

console.log("evo-museum server on!");
