-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

-- user_table Table Create SQL
CREATE TABLE user_table
(
    `user_id`        VARCHAR(25)    NOT NULL    COMMENT '사용자 아이디', 
    `user_pw`        VARCHAR(25)    NOT NULL    COMMENT '사용자 비번', 
    `user_type`      CHAR(1)        NOT NULL    COMMENT '사용자 유형', 
    `user_name`      VARCHAR(25)    NOT NULL    COMMENT '사용자 이름', 
    `user_hp`        VARCHAR(25)    NOT NULL    COMMENT '사용자 연락처', 
    `user_birthday`  DATE           NOT NULL    COMMENT '사용자 생년월일', 
    `user_joindate`  DATE           NOT NULL    COMMENT '사용자 가입일', 
    CONSTRAINT PK_blog_post PRIMARY KEY (user_id)
);

ALTER TABLE user_table COMMENT '사용자 테이블';

CREATE INDEX blog_post_Index_1
    ON user_table(user_id);


-- farm_table Table Create SQL
CREATE TABLE farm_table
(
    `farm_id`     VARCHAR(25)    NOT NULL    COMMENT '농장 아이디', 
    `user_id`     VARCHAR(25)    NOT NULL    COMMENT '사용자 아이디', 
    `farm_name`   VARCHAR(25)    NOT NULL    COMMENT '농장 이름', 
    `farm_plant`  VARCHAR(25)    NULL        COMMENT '농장 작물', 
    `plant_id`    VARCHAR(25)    NOT NULL    COMMENT '작물 아이디', 
    `loc_id`      VARCHAR(25)    NOT NULL    COMMENT '위치 아이디',
    `auto`      CHAR(1)    NOT NULL    DEFAULT '1' COMMENT '위치 아이디', 
    CONSTRAINT PK_blog_post_to_category PRIMARY KEY (farm_id)
);

ALTER TABLE farm_table COMMENT '농장 테이블';

CREATE INDEX blog_post_to_category_Index_2
    ON farm_table(farm_id);

ALTER TABLE farm_table
    ADD CONSTRAINT FK_farm_table_user_id_user_table_user_id FOREIGN KEY (user_id)
        REFERENCES user_table (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- manual_table Table Create SQL
CREATE TABLE manual_table
(
    `farm_id`  VARCHAR(25)       NOT NULL    COMMENT '농장 아이디', 
    `max_tem`  NUMERIC(15, 0)    NOT NULL    COMMENT '최고 온도', 
    `min_tem`  NUMERIC(15, 0)    NOT NULL    COMMENT '최저 온도', 
     PRIMARY KEY (farm_id)
);

ALTER TABLE manual_table COMMENT '수동 설정값';

ALTER TABLE manual_table
    ADD CONSTRAINT FK_manual_table_farm_id_farm_table_farm_id FOREIGN KEY (farm_id)
        REFERENCES farm_table (farm_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- auto_table Table Create SQL
CREATE TABLE auto_table
(
    `plant_id`  VARCHAR(25)       NOT NULL    COMMENT '작물 아이디', 
    `max_tem`   NUMERIC(15, 0)    NOT NULL    COMMENT '최고 온도', 
    `min_tem`   NUMERIC(15, 0)    NOT NULL    COMMENT '최저 온도'
);

ALTER TABLE auto_table COMMENT '자동 설정값';


-- weather_table Table Create SQL
CREATE TABLE weather_table
(
    `weather`    TIMESTAMP         NOT NULL    COMMENT '날씨시간', 
    `loc_id`     VARCHAR(25)       NOT NULL    COMMENT '위치 아이디', 
    `w_max_tem`  NUMERIC(15, 2)    NOT NULL    COMMENT '기상 최고 온도', 
    `w_min_tem`  NUMERIC(15, 2)    NOT NULL    COMMENT '기상 최저 온도', 
    `w_rainval`  NUMERIC(15, 2)    NOT NULL    COMMENT '기상 강수량', 
    `w_rainper`  NUMERIC(15, 2)    NOT NULL    COMMENT '기상 강수확률', 
    `w_hum`      NUMERIC(15, 2)    NOT NULL    COMMENT '기상 습도', 
     PRIMARY KEY (weather)
);

ALTER TABLE weather_table COMMENT '기상 테이블';


-- actuator_table Table Create SQL
CREATE TABLE actuator_table
(
    `act_time`    TIMESTAMP      NOT NULL    COMMENT '액츄에이터 시간', 
    `farm_id`     VARCHAR(25)    NOT NULL    COMMENT '농장 아이디', 
    `wtpump_act`  CHAR(1)        NOT NULL    COMMENT '워터펌프 액츄에이터', 
    `valve_act`   CHAR(1)        NOT NULL    COMMENT '전자밸브 액츄에이터', 
    `ac_act`      CHAR(1)        NOT NULL    COMMENT '적외선 액츄에이터', 
    `o2gen_act`   CHAR(1)        NOT NULL    COMMENT '산소수발생 액츄에이터', 
    `vent_act`    CHAR(1)        NOT NULL    COMMENT '환기장치 액츄에이터', 
    `veyor_act`   CHAR(1)        NOT NULL    COMMENT '컨베이어 액츄에이터', 
    `led_act`     CHAR(1)        NOT NULL    COMMENT 'LED 액츄에이터', 
     PRIMARY KEY (act_time)
);

ALTER TABLE actuator_table COMMENT '액츄에이터 테이블';

ALTER TABLE actuator_table
    ADD CONSTRAINT FK_actuator_table_farm_id_farm_table_farm_id FOREIGN KEY (farm_id)
        REFERENCES farm_table (farm_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- sensor_table Table Create SQL
CREATE TABLE sensor_table
(
    `sensor_time`  TIMESTAMP         NOT NULL    COMMENT '센서 시간', 
    `farm_id`      VARCHAR(25)       NOT NULL    COMMENT '농장 아이디', 
    `tem_sensor`   NUMERIC(15, 2)    NOT NULL    COMMENT '온도 센서', 
    `hum_sensor`   NUMERIC(15, 2)    NOT NULL    COMMENT '습도 센서', 
    `ghum_sensor`  NUMERIC(15, 2)    NOT NULL    COMMENT '토양습도 센서', 
    `wtlv_sensor`  NUMERIC(15, 0)    NOT NULL    COMMENT '수위 센서', 
    `do_sensor`    NUMERIC(15, 2)    NOT NULL    COMMENT '용존산소량 센서', 
     PRIMARY KEY (sensor_time)
);

ALTER TABLE sensor_table COMMENT '전체 센서 테이블';

ALTER TABLE sensor_table
    ADD CONSTRAINT FK_sensor_table_farm_id_farm_table_farm_id FOREIGN KEY (farm_id)
        REFERENCES farm_table (farm_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


--sensor_view Create SQL
CREATE VIEW sensor_view
AS
(
SELECT farm_id, a.tem_sensor, a.hum_sensor 
FROM(select * from sensor_table group by sensor_time, farm_id order by sensor_time desc) a 
GROUP BY a.farm_id
);

--actuator_view Create SQL
CREATE VIEW actuator_view
AS
(
SELECT farm_id, a.ac_act, a.vent_act 
FROM(select * from actuator_table group by act_time, farm_id order by act_time desc) a 
GROUP BY a.farm_id
);