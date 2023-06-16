const { StatusCodes } = require('http-status-codes');
const { MAILER } = require('../config');
const { TicketRepository } = require('../repositories');
const AppError = require('../utils/errors/app-errors');

const ticketRepository = new TicketRepository();

async function sendMail(data) {
    try {
        const response = await MAILER.sendMail({
            from: data.mailFrom,
            to: data.mailTo,
            subject: data.subject,
            text: data.text
        });

        return response;
    } catch (error) {
        throw new AppError('Cannot send mail', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function createTicket(data) {
    try {
        const ticket = await ticketRepository.create(data);
        return ticket;
    } catch (error) {
        throw new AppError('Cannot create Ticket', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getPendingEmails() {
    try {
        const tickets = await ticketRepository.getPendingTickets();
        return tickets;
    } catch (error) {
        throw new AppError('Cannot get pending Emails', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    sendMail,
    createTicket,
    getPendingEmails
};