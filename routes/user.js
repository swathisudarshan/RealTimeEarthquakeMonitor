
/*
 * GET users listing.
 */

function sendEmail(req,res)
{
	var email_add = req.body.email;
	var name = req.body.name;
	var message = req.body.message;
	console.log(message);
	var mailer = require("nodemailer");
    
    var smtpTransport = mailer.createTransport("SMTP",{
        service: "gmail",
        auth: {
            user: "catacalysm.disaster@gmail.com",
            pass: "C@t@c@lysm"
        }
    });
    var from = name + " <"+email_add+">";
    var mail = {
        from: from,
        to: "catacalysm.disaster@gmail.com",
        subject: "Feedback from "+from,
        text: message,
        html: message
    };

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
        	console.log("Error: " + error);
        	res.end("error");
        }else{
            console.log("Message sent: " + response.message);
        	res.end("success");
        }        
    });
    smtpTransport.close();
}

exports.sendEmail = sendEmail;