const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const exhibition = require("./models/exhibition");
const port = 8080;

app.use(express.json()); //express에 대한 설정
app.use(cors()); //이제 모든 브라우저에서 가능

//전체 전시 get
app.get("/exhibitions", (req, res) => {
  models.Exhibition.findAll({
    //{order : [['createdAt','DESC']],} findAll 안에 넣으면 정렬가능
    attributes: ["id", "name", "exp", "imageUrl", "createdAt"],
  })
    .then((result) => {
      console.log("EXHIBITIONS :", result);
      res.send({
        exhibitions: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("ERROR : 전체 전시 조회에 에러가 발생 ");
    });
});

//개별전시 :id  get
app.get("/exhibitions/:id", (req, res) => {
  const params = req.params;
  const { id } = params;

  models.Exhibition.findOne({
    where: {
      id: id, //id가 일치하는 것 하나만 find 해라
    },
    attributes: ["id", "name", "exp2", "imageUrl2", "createdAt"],
  })
    .then((result) => {
      console.log("EXHIBITION : ", exhibition);
      res.send({
        exhibition: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("개별 전시 조회에 에러가 발생");
    });
});

//전체 전시 post
app.post("/exhibitions", (req, res) => {
  const body = req.body;
  //
  //Database
  const { name, exp, exp2, imageUrl, imageUrl2 } = body;

  models.Exhibition.create({
    name,
    exp,
    exp2,
    imageUrl,
    imageUrl2,
  })
    .then((result) => {
      console.log("생성 결과 : ", result);
      res.send({
        result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("데이터베이스 Data Create에 에러가 발생");
    });

  res.send({
    body,
  });
});

//listen
app.listen(port, () => {
  console.log("EVO-Museum Server ON : 서버 연결");

  //데이터베이스 동기화
  models.sequelize
    .sync()
    .then(() => {
      console.log("Database Connected : 데이터베이스 연결 ");
    })
    .catch((err) => {
      console.errror(err);
      console.log(
        "Database Connection Error : 데이터베이스 연결에 에러가 발생"
      );
      process.exit();
    });
});
