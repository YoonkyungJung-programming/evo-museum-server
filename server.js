const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.json()); //express에 대한 설정
app.use(cors()); //이제 모든 브라우저에서 가능

app.get("/exhibitions", (req, res) => {
  res.send({
    exhibitions: [
      {
        id: 1,
        name: "The Art of Banksy Online",
        exp: "아트 오브 뱅크시 온라인",
        //main page image
        imageUrl:
          "https://media.timeout.com/images/105611607/750/422/image.jpg",
      },
    ],
  });
});

app.get("/exhibitions/1", (req, res) => {
  res.send({
    exhibition: [
      {
        id: 1,
        name: "The Art of Banksy Online",
        exp: "exhibition contents needed !",
        //Exhibition page image
        imageUrl2:
          "https://post-phinf.pstatic.net/MjAxOTEwMjhfNDAg/MDAxNTcyMjQyMzU4ODA2.KUMHlcBR4RinjJov0AavjphuoKwpCdtTV4IxuirH3KMg.qYI-wyqe3fOOYczsVn30XI3OyAK5aJkR4wei1u6JVoEg.JPEG/banksy_exhibition.jpg?type=w1200",
      },
    ],
  });
});

app.post("/exhibitions", (req, res) => {
  res.send("등록되었습니다");
});

app.listen(port, () => {
  console.log("evo museum server on!");
});
