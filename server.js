const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const exhibition = require("./models/exhibition");
//방명록
const visitor = require("./models/visitor");
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
      res.status(400).send("ERROR : 전체 전시 조회에 에러가 발생 ");
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
    .then((result1) => {
      if (result1) {
        models.Visitor.findAll({
          where: {
            exhibition_id: id,
          },
          attributes: ["visitor_name", "text", "createdAt"],
        })
          .then((result2) => {
            console.log("EXHIBITION : ", exhibition);
            console.log("Visitor : ", visitor);
            res.send({
              exhibition: result1,
              visitor: result2,
            });
          })
          .catch((error) => {
            console.error(error);
            res.send("개별 전시 Visitor 조회에 에러가 발생");
          });
      } //if
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("개별 전시 조회에 에러가 발생");
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
      res.status(400).send("데이터베이스 Exhibition Data Create에 에러가 발생");
    });

  {
    /** 
  res.send({
    body,
  });
  */
  }
});

//방명록 게시 (안되면 주석처리)
app.post("/exhibitions/:id", (req, res) => {
  const body = req.body;
  //
  //Database
  const { exhibition_id, visitor_name, text } = body;

  models.Visitor.create({
    exhibition_id,
    visitor_name,
    text,
  })
    .then((result) => {
      console.log("생성 결과 : ", result);
      res.send({
        result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("데이터베이스 Visitor Data Create에 에러가 발생");
    });
  {
    /** 
  res.send({
    body,
  });
*/
  }
});
// 방명록

//listen
app.listen(port, () => {
  console.log("EVO-Museum Server ON : 서버 연결 성공");

  //데이터베이스 동기화
  models.sequelize
    .sync()
    .then(() => {
      console.log("Database Connected : 데이터베이스 연결 성공");
    })
    .catch((err) => {
      console.errror(err);
      console.log(
        "Database Connection Error : 데이터베이스 연결에 에러가 발생"
      );
      process.exit();
    });
});
