const nodemailer = require('nodemailer')

const from = '"Bookworm" <info@bookworm.com>'

const setup = () => {
    return nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "d3b07d03c8bfbc",
            pass: "7659c4407d07ef"
        }
    })
}

exports.sendResetPasswordEmail = user => {
    const transport = setup()
    const email = {
        from,
        to: user.email,
        subject: 'Reset Password',
        text: `To Reset The Password follow the link
            ${user.generateResetPasswordLink()}
        `
    }
    transport.sendMail(email)
}