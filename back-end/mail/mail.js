const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const path = require('path');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname}/${filename}.pug`, options);
  const inlined = juice(html);
  return inlined;
};

exports.send = async (template, options) => {
  const html = generateHTML(template, options);
  const text = htmlToText.fromString(html);
  const mailOptions = {
    from: 'Alex <noreply@example.com>',
    to: options.address,
    subject: `Your order #${options.number} has been ${options.service}`,
    html,
    text,
  };
  const info = await transport.sendMail(mailOptions);
  return info;
};
