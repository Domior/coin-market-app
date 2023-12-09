const nodemailer = require('nodemailer');

const handleError = require('../helpers/handleError');
const sendResponse = require('../helpers/sendResponse');
const STATUSES = require('../constants/statuses');
const { ERRORS, SUCCESS } = require('../constants/text');

class NodemailerService {
  static sendMailViaGmail(res, mailOptions) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    transporter.sendMail({ from: process.env.NODEMAILER_EMAIL, ...mailOptions }, (error, info) => {
      if (error) {
        handleError(res, STATUSES.INTERNAL_SERVER_ERROR, ERRORS.SOMETHING_IS_WRONG_WITH_EMAIL_SERVICE);
      } else {
        sendResponse(res, STATUSES.OK, { message: SUCCESS.RESET_PASSWORD_LINK_SENT });
      }
    });
  }
}

module.exports = NodemailerService;
