import {schemas} from "../schemas";
import * as config from "../libs/config";
const nodemailer = require('nodemailer');

export default class MailHelper {
    user_id;
    user;
    defaultEmail;

    constructor() {
        this.defaultEmail = config.email;
    }

    public async setUser(user_id?: number) {
        let user = await schemas.User.findByPrimary(user_id);
        if (!user) {
            throw `User not found: ${user_id}`;
        }
        this.user = user;
        this.user_id = user_id;
    }

    private async sendMail(mail) {
        let chosen = this.defaultEmail;
        console.log("Email", this.defaultEmail, chosen);
        if (!chosen) {
            throw "system have not been set up or supporter mail can not be found";
        }

        var user = chosen.username;
        var pass = chosen.password;
        var host = chosen.host;

        var smtpConfig = {
            host: host,
            port: chosen.port || 587,
            secure: chosen.secure || false,
            auth: {user: user, pass: pass}
        };
        var transporter = nodemailer.createTransport(smtpConfig);
        var mailOptions = {
            from: `"BK Elearning System" <${user}>`,
            to: mail.to,
            subject: mail.subject,
            text: mail.text,
            html: mail.html
        };
        return transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }

    public async sendForgotPasswordMail(to: string, code: string) {

        let content = `Mã khôi phục cho tài khoản của bạn tại BK Elearning System: ${code} <br>Lưu ý: Mã này chỉ tồn tại trong vòng 5 phút sau khi cấp`;
        let content_text = content.replaceAll("<br>", "");

        let forgotMail = {
            to: to,
            subject: `[BK Elearning System] Mã khôi phục mật khẩu`,
            text: content_text,
            html: content
        };
        return this.sendMail(forgotMail);
    }

    public async sendActivateCode(to: string, code: string) {
        let content = `Mật mã kích hoạt cho tài khoản của bạn tại BK Elearning System: ${code}`;
        let content_text = content.replaceAll("<br>", "");

        let activationMail = {
            to: to,
            subject: `[BK Elearning System] Mã kích hoạt tài khoản`,
            text: content_text,
            html: content
        };

        return this.sendMail(activationMail);
    }
};
