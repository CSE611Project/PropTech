const nodemailer = require('nodemailer');

// send success email after account approved
function sentEmail(receiver_email, content) {
    //setup the email
    let transporter  = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'umbrella.email.alert@gmail.com',
            pass: 'zxcasdqwe123~'
        }
    });
    let mailOptions = {
        from: 'umbrella.email.alert@gmail.com',
        to: receiver_email,
        subject: 'account application approved',
        html: content
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            return console.log(err);
        }
        else{
            console.log("successful");
        }
        transporter.close();
    });
}

exports.sentEmail = sentEmail;