var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'test@gmail.com',
        pass: 'test'
    }
});

exports.sendMail = function(mailOptions) {
    transporter.sendMail({
        from: mailOptions.from ? mailOptions.from : 'info@domain.com',
        to: mailOptions.to,
        subject: mailOptions.subject ? mailOptions.subject : 'Message from Domain name',
        text: mailOptions.body,
        attachments: mailOptions.attachments ? mailOptions.attachments : undefined
    }, function(err, info) {
        if(err) {console.log(err); return false; }
        console.log(info);
        return true;
    });
};

exports.sendMailHtml = function(mailOptions) {
    transporter.sendMail({
        from: mailOptions.from ? mailOptions.from : 'info@domain.com',
        to: mailOptions.to,
        subject: mailOptions.subject ? mailOptions.subject : 'Message from Domain name',
        html: mailOptions.body,
        attachments: mailOptions.attachments ? mailOptions.attachments : undefined
    }, function(err, info) {
        if(err) {console.log(err); return false; }
        console.log(info);
        return true;
    });
};