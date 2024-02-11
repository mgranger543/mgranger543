const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Static Files
app.use(express.static('public')); // Assume your HTML files are in 'public' directory

// Email Route
app.post('/send', (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Subject: ${req.body.subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    // Nodemailer setup (example using Gmail)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'michael.p.granger@gmail.com',  
            pass: 'g00dp8ssw0rd'     
        }
    });

    let mailOptions = {
        from: '"Nodemailer Contact" <michael.p.granger@gmail.com>',
        to: 'michael.p.granger@gmail.com', // receiver
        subject: 'Node Contact Request',
        text: 'Hello world?',
        html: output
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.send('Email has been sent');
    });
});

app.listen(port, () => console.log(`Server started on port ${port}`));