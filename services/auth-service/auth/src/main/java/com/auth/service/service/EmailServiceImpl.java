package com.auth.service.service;

import org.springframework.beans.factory.annotation.*;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired 
    private JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    private String senderEmail;
    @Override 
    public void sendOtpEmail(String toEmail, String otp){
        SimpleMailMessage msg=new SimpleMailMessage();
        msg.setFrom(senderEmail);
        msg.setTo(toEmail);
        msg.setSubject("EdibleAI - Verify Your Account");
        msg.setText("Hello,\n\n"+
        "Your verification code for EdibleAI is: "+otp+"\n\n"+"This code is valid for 5 minutes. Please do not share it with anyone.\n\n"+"- The EdibleAI Team"
        );
        mailSender.send(msg);
    }
}
