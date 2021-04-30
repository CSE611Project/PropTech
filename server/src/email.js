const nodemailer = require("nodemailer");

// send success email after account approved
function sentEmail(receiver_email, content) {
  //setup the email
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "umbrella.email.alert@gmail.com",
      pass: "zxcasdqwe123~",
    },
  });
  let mailOptions = {
    from: "umbrella.email.alert@gmail.com",
    to: receiver_email,
    subject: "account application approved",
    html: content,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(err);
    } else {
      console.log("successful");
    }
    transporter.close();
  });
}

// content is a json string contains receiver, subject, html, and pdf path
function sentEmailWithAttachment(content, callback) {
  let receiver = content.receiver;
  let subject = content.subject;
  let html = content.html;
  let path = content.path;
  //setup the email
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "umbrella.email.alert@gmail.com",
      pass: "zxcasdqwe123~",
    },
  });
  let mailOptions = {
    from: "umbrella.email.alert@gmail.com",
    to: "mdong3@buffalo.edu",
    subject: subject,
    html: html,
    attachments: [
      {
        path: path
      }
    ]
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      callback(false);
    } else {
      console.log("successful");
      callback(true)
    }
    transporter.close();
  });
}

exports.sentEmailWithAttachment = sentEmailWithAttachment;
exports.sentEmail = sentEmail;
