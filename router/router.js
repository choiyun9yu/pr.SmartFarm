// 초기 설정
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// post방식 사용시 반드시 필요
const body_parser = require("body-parser");
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

const { response } = require("express");
const path = require("path");
const { resolveMx } = require("dns");
const { rmSync } = require("fs");
// ejs파일 경로설정
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// ------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------

// AWS RDS mysql 주소
const conn = mysql.createConnection({
  host: "database-2.czhwbelwlp5g.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "121104115",
  port: "3306",
  database: "auto_farming",
});

// ------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------

// 루트페이지로 접속 시
router.get("/", function (req, res) {
  res.redirect("http://127.0.0.1:5501/public/01_login.html");
});

// ------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------

// Main page

// 자동제어
// '/btn1' post방식으로 on/off 값을 req.body.auto 받아서 auto2 변수에 담아 DB에 업데이트하고
// '/btn1' get방식으로 보냄(res.send)
var auto2;
router.post("/btn1", async function (req, res) {
  console.log(req.body.auto);
  auto2 = req.body.auto;
  let sql = "update farm_table set auto=? where farm_id = '123'";
  conn.query(sql, [auto2], function (err, rows) {
    if (!err) {
      console.log("수정성공");
    } else {
      console.log("수정실패" + err);
    }
  });
  router.get("/btn1", function (req, res) {
    res.send(auto2);
  });
});

// 에어컨 on/off + 에어컨 온도 값
// ex) 에어컨 키고(1), 온도값 24도(24) => '/btn2'에 124 값을 전송
// req.body.temp, req.body.airconditioner : post방식으로 받아온 값
// airconditioner : ejs에서 post방식으로 보내는 에어컨 on/off 값
// temp : ejs에서 post방식으로 보내는 에어컨 온도 값
// insertTemp : get방식으로 보내는 에어컨 on/off와 에어컨 온도값(ex) 124)
var airconditioner2;
var temp2;
var insertTemp;
router.post("/btn2", async function (req, res) {
  console.log(req.body.temp);
  console.log(req.body.airconditioner);
  airconditioner2 = req.body.airconditioner;
  let sql1 = "update actuator_table set ac_act=?";
  conn.query(sql1, [airconditioner2], function (err, rows) {
    if (!err) {
      console.log("수정성공");
    } else {
      console.log("수정실패" + err);
    }
  });
  temp2 = req.body.temp;
  let sql = "update manual_ac_table set desired_tem=? ";
  conn.query(sql, [temp2], function (err, rows) {
    if (!err) {
      console.log("수정성공");
    } else {
      console.log("수정실패" + err);
    }
  });
  insertTemp = airconditioner2 + temp2;
  // console.log(kakaojoa);
  // console.log(req.headers);
  // res.send(req.body.bananajoa);
});
router.get("/btn2", function (req, res) {
  res.send(insertTemp);
});

// vent
// '/btn3' post방식으로 on/off 값을 req.body.vent 받아서 vent2 변수에 담아 DB에 업데이트하고
// '/btn3' get방식으로 보냄(res.send)
var vent2;
router.post("/btn3", async function (req, res) {
  console.log(req.body.vent);
  vent2 = req.body.vent;
  let sql = "update actuator_table set vent_act=? ";
  conn.query(sql, [vent2], function (err, rows) {
    if (!err) {
      console.log("수정성공");
    } else {
      console.log("수정실패" + err);
    }
  });
});
router.get("/btn3", function (req, res) {
  res.send(vent2);
});

// LED
// '/btn4' post방식으로 on/off 값을 req.body.led 받아서 led2 변수에 담아 DB에 업데이트하고
// '/btn4' get방식으로 보냄(res.send)
var led2;
router.post("/btn4", async function (req, res) {
  console.log(req.body.led);
  led2 = req.body.led;
  let sql = "update actuator_table set led1_act=? ";
  conn.query(sql, [led2], function (err, rows) {
    if (!err) {
      console.log("수정성공");
    } else {
      console.log("수정실패" + err);
    }
  });
});
router.get("/btn4", function (req, res) {
  res.send(led2);
});

// 산소수발생기
// '/btn5' post방식으로 on/off 값을 req.body.o2 받아서 o22 변수에 담아 DB에 업데이트하고
// '/btn5' get방식으로 보냄(res.send)
var o22;
router.post("/btn5", async function (req, res) {
  console.log(req.body.o2);
  o22 = req.body.o2;
  let sql = "update actuator_table set o2gen_act=? ";
  conn.query(sql, [o22], function (err, rows) {
    if (!err) {
      console.log("수정성공");
    } else {
      console.log("수정실패" + err);
    }
  });
});
router.get("/btn5", function (req, res) {
  res.send(o22);
});

// 물탱크
// '/btn6' post방식으로 on/off 값을 req.body.addwt 받아서 addwt2 변수에 담아 DB에 업데이트하고
// '/btn6' get방식으로 보냄(res.send)
var addwt2;
router.post("/btn6", async function (req, res) {
  console.log(req.body.addwt);
  addwt2 = req.body.addwt;
  let sql = "update robot_table set awvalve_act=? ";
  conn.query(sql, [addwt2], function (err, rows) {
    if (!err) {
      console.log("수정성공");
    } else {
      console.log("수정실패" + err);
    }
  });
});
router.get("/btn6", function (req, res) {
  res.send(addwt2);
});

// 수직컨베이어
// '/btn7' post방식으로 on/off 값을 req.body.conv1 받아서 conv12 변수에 담아 DB에 업데이트하고
// '/btn7' get방식으로 보냄(res.send)
var conv12;
router.post("/btn7", async function (req, res) {
  console.log(req.body.conv1);
  conv12 = req.body.conv1;
  let sql = "update actuator_table set conv1_act=? ";
  conn.query(sql, [conv12], function (err, rows) {
    if (!err) {
      console.log("수정성공");
    } else {
      console.log("수정실패" + err);
    }
  });
});
router.get("/btn7", function (req, res) {
  res.send(conv12);
});

// ------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------

// 1 페이지

// Login기능구현하기
// 웹페이지에서 name이 id,pw인 값을 post방식으로
// request.body.id, request.body.pw로 받아서 DB의 값이랑
// 맞으면 03_meny.html 페이지로 넘어가고
// 틀리면 로그인 창이 다시 뜸
router.post("/Login", function (request, response) {
  let id = request.body.id;
  let pw = request.body.pw;
  let sql = "select * from user_table where user_id = ? and user_pw = ? ";
  conn.query(sql, [id, pw], function (err, rows) {
    if (rows.length > 0) {
      console.log("로그인 성공 : " + rows.length);
      response.redirect("http://127.0.0.1:5501/public/03_menu.html");
    } else {
      console.log("로그인 실패 : " + rows.length);
      response.redirect("/");
    }
  });
});

// 2페이지

// get방식 센서데이터(farm_id 수정 필요)
// esp32에서 get방식으로 "http://로컬주소:8080/insertSensor" 에
// 센서데이터(temp, humd, height, rbheight, co2) 보내면
// 컴퓨터 서버에서 값을 받아 req.query로 tempi, humdi, heighti, rbheighti, co2i로 데이터 저장 후
// sql에 값 저장
// (farm_id 수정 필요)
router.get("/insertSensor", function (req, res) {
  console.log("사용자가 보낸 값 : " + req.query.temp);
  console.log("사용자가 보낸 값 : " + req.query.humd);
  console.log("사용자가 보낸 값 : " + req.query.height);
  console.log("사용자가 보낸 값 : " + req.query.co2);
  let tempi = req.query.temp;
  let humdi = req.query.humd;
  let wtheighti = req.query.height;
  let co2i = req.query.co2;

  let sql =
    "insert into sensor_table(sensor_time, farm_id, tem_sensor, hum_sensor, wtuw_sensor, co2_sensor) values(now(),'123',?,?,?,?)";

  conn.query(sql, [tempi, humdi, wtheighti, co2i], function (err, rows) {
    if (!err) {
      console.log("입력성공");
    } else {
      console.log("입력실패" + err);
    }
  });
});

// DB에서 가장 최신의 센서 데이터 가져오기(가져온 값들 밖으로 빼기)
// /selectSensor : get방식으로 최신값 보내서 index.ejs에 띄우기
router.get("/selectSensor", function (req, res) {
  let sql =
    "select * from (select * from sensor_table)a order by sensor_time desc limit 1;";

  conn.query(sql, function (err, rows) {
    //console.log(rows);
    if (!err) {
      console.log("조회성공");
      console.log(rows[0].tem_sensor);
      let tems = rows[0].tem_sensor;
      let humds = rows[0].hum_sensor;
      let wtuws = rows[0].wtuw_sensor;
      let co2s = parseInt(rows[0].co2_sensor);
      res.render("15_main.ejs", {
        tem: tems,
        humd: humds,
        wtuw: wtuws,
        co2: co2s,
      });
    } else {
      console.log("조회실패 : " + err);
    }
  });
});

// '/getSensor' get방식으로 요청들어오는 곳에 최근에 들어온 센서값을 DB에서 불러와서 전송
router.get("/getSensor", function (req, res) {
  let sql =
    "select * from (select * from sensor_table)a order by sensor_time desc limit 1;";
  conn.query(sql, function (err, rows) {
    //console.log(rows);
    if (!err) {
      console.log("조회성공");
      console.log(rows[0].tem_sensor);
      let tems = rows[0].tem_sensor;
      let humds = rows[0].hum_sensor;
      let wtuws = rows[0].wtuw_sensor;
      let co2s = parseInt(rows[0].co2_sensor);
      res.send(rows);
    } else {
      console.log("조회실패 : " + err);
    }
  });
});

// ------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------

// router에 대한 정보를 갖고있는 객체를 외부에서 사용할 수 있게 모듈화
module.exports = router;
