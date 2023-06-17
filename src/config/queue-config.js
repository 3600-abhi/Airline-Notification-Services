const amqplib = require('amqplib');
const { MESSAGE_QUEUE, RABBITMQ_SERVICE, GMAIL_ID } = require('./server-config');
const { EmailService } = require('../services');

async function connectQueue() {
    try {
        // for making connection instead of http protocol it uses amqp protocol
        // don't need to pass port by default it will select
        const connection = await amqplib.connect(RABBITMQ_SERVICE);

        const channel = await connection.createChannel();

        // for creating queue pass the name of queue inside assertQueue() fn
        await channel.assertQueue(MESSAGE_QUEUE);

        channel.consume(MESSAGE_QUEUE, async (message) => {
            console.log('Recieved : ', message.content.toString());

            const data = JSON.parse(message.content);

            await EmailService.sendMail({
                mailFrom: GMAIL_ID,
                mailTo: data.recipientEmail,
                subject: data.subject,
                text: data.text
            });

            // we need to acknowledge that we have read the msg so pls don't send these msg again
            channel.ack(message);
        });

        console.log('Successfully connected with Message-Queue');
    } catch (error) {
        console.log('Inside queue-config catch block');
        console.log(error);
    }
}

module.exports = {
    connectQueue
}