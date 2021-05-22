const sgMail = require('@sendgrid/mail');
const User = require('..');
const emailVerificationTemplate = require('../../../../utils/templates/email-verification');
const accountAuthentication = require('../../../../utils/templates/account-authentication');

async function sendEmailVerificationMail({OTP,email,subject,text,name}){
    let message = '<h2><b>Verification code :<b></h2>'
    let from=process.env.FROM
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
          to: email,
          from,
          subject:subject||'Signup Confirmation !',
          text:text||'Signup Confirmation !',
          html: emailVerificationTemplate({name,message,OTP})
      }
   return await sgMail.send(msg)
}
async function sendAccountVerificationMail({OTP,email,subject,text,name}){
    let message = '<h2><b>Verification code :<b></h2>'
    let from=process.env.FROM
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
          to: email,
          from,
          subject:subject||'Signup Confirmation !',
          text:text||'Signup Confirmation !',
          html: accountAuthentication({name,message,OTP})
      }
   return await sgMail.send(msg)
}
module.exports = {sendEmailVerificationMail,sendAccountVerificationMail}