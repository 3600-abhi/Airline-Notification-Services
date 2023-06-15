const express = require('express');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const mailSender = require('./config/email-config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server at PORT : ${ServerConfig.PORT}`);

  const response = await mailSender.sendMail({
    from: ServerConfig.GMAIL_ID,
    to: 'abhishekjaiswal3600@gmail.com',
    subject: 'Flight Ticket Details',
    text: 'Congratulations Abhishek, You have successfully booked your Flight'
  });

  console.log("Mail Response = ", response);
});
