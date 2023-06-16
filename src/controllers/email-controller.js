const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const { EmailService } = require('../services');

async function sendMail(req, res) {
    try {
        const response = await EmailService.sendMail({
            mailFrom: req.body.mailFrom,
            mailTo: req.body.mailTo,
            subject: req.body.subject,
            text: req.body.text
        });

        SuccessResponse.message = 'Successfully sent the mail';
        SuccessResponse.data = response;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error; // this error object is (AppError) object
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function createTicket(req, res) {
    try {
        const ticket = await EmailService.createTicket({
            subject: req.body.subject,
            content: req.body.content,
            recipientEmail: req.body.recipientEmail
        });
        SuccessResponse.message = 'Successfully created the ticket';
        SuccessResponse.data = ticket;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log("Error inside controller = ", error);
        ErrorResponse.error = error; // this error object is (AppError) object
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    sendMail,
    createTicket
};