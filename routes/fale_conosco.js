var express = require('express');
var nodemailer = require('nodemailer');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {
  let smtpConfig = {
    host: 'smtp.domain.com',
    port: 587,
    secure: false,
    tls: { rejectUnauthorized: false },
    auth: {
        user: 'faleconosco@servicerio.com',
        pass: 'serviceR!0'
    }
  };

  var message = {
    to: 'faleconosco@servicerio.com',
    from: req.body.email,
    subject: 'Fale Conosco - Website',
    html: '<p>' + req.body.nome + '</p><p>' + req.body.mensagem + '</p>'
  };

  let transporter = nodemailer.createTransport(smtpConfig);

  transporter.verify(function(error, success) {
     if (error) {
          console.log(error);
     } else {
          console.log('Servidor SMTP OK para enviar mensagens!');
     }
  });

  transporter.sendMail(message, function(error, response){
    if(error){
        console.log(error);
        res.end();
    }else{
        console.log("Mensagem enviada");
    }
    transporter.close();
  });
  res.end();
});

module.exports = router;
