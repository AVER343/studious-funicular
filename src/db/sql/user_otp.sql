CREATE  TABLE USER_OTP(
id            SERIAL       PRIMARY KEY        ,
user_role     VARCHAR(64) UNIQUE   ,
FOREIGN KEY(id) REFERENCES USERS(id)
);