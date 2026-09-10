package com.auth.service.service;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auth.service.dto.SendOtpRequest;
import com.auth.service.dto.VerifyOtpRequest;
import com.auth.service.entity.OtpVerification;
import com.auth.service.repository.OtpRepository;

import jakarta.transaction.Transactional;
@Service 
public class AuthServiceImpl implements AuthService{
    @Autowired 
    private OtpRepository otpRepository;
    @Autowired 
    private EmailService emailService;
    @Override 
    @Transactional 
    public void sendOtp(SendOtpRequest request){
        String email=request.getEmail().trim().toLowerCase();
        SecureRandom rand=new SecureRandom();
        String otp= String.format("%04d", rand.nextInt(10000));
        otpRepository.deleteByEmail(email);
        OtpVerification verification =OtpVerification.builder()
            .email(email).otp(otp).expiryTime(LocalDateTime.now().plusMinutes(5)).build();
        otpRepository.save(verification);
        emailService.sendOtpEmail(email, otp);
    }
    @Override 
    @Transactional
    public boolean verifyOtp(VerifyOtpRequest request){
        String email=request.getEmail().trim().toLowerCase();
        String otp=request.getOtp().trim();
        Optional<OtpVerification>optionalRecord=otpRepository.findTopByEmailOrderByExpiryTimeDesc(email);
        if(optionalRecord==null){
            return false;
        }
        OtpVerification rec=optionalRecord.get();
        if(rec.getOtp().equals(otp)&&rec.getExpiryTime().isAfter(LocalDateTime.now())){
            otpRepository.deleteByEmail(email);
            return true;
        }
        return false;
    }
}
