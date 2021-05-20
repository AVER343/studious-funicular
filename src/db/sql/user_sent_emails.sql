CREATE TABLE USER_SENT_EMAILS(
id            SERIAL       PRIMARY KEY ,
email  VARCHAR(100)  ,
USER_ID BIGINT, 
generated_on TIMESTAMP DEFAULT now(),
OTP_TRIED_FOR SMALLINT CHECK(OTP_TRIED_FOR<5) DEFAULT 0,
OTP_ACTIVE BOOLEAN DEFAULT TRUE
);