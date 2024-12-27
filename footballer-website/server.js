const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (for example, images, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Set up Nodemailer transport (SMTP settings)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Your email
    pass: 'your-email-password',   // Your email password (use environment variables for security)
  },
});

// POST route to handle form submission
app.post('/send-message', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Setup email data
  const mailOptions = {
    from: email,
    to: 'israelbekeletulu@gmail.com', // Your email address to receive messages
    subject: subject,
    text: `You have received a message from ${name} (${email}):\n\n${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
    res.status(200).send({ success: true, message: 'Message sent successfully!' });
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
