package com.auracoffee.management.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String toEmail, String otpCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Aura Coffee - Mã OTP xác thực đổi mật khẩu");
        message.setText(
                "Chào bạn,\n\n" +
                "Bạn (hoặc ai đó) đã yêu cầu đổi mật khẩu cho tài khoản Aura Coffee.\n\n" +
                "Mã OTP xác thực của bạn là: " + otpCode + "\n\n" +
                "Mã này có hiệu lực trong 5 phút. Vui lòng không chia sẻ mã này với bất kỳ ai.\n\n" +
                "Nếu bạn không yêu cầu đổi mật khẩu, vui lòng bỏ qua email này.\n\n" +
                "Trân trọng,\n" +
                "Đội ngũ Aura Coffee"
        );
        mailSender.send(message);
    }
}