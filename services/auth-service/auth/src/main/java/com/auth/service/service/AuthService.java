package com.auth.service.service;
import com.auth.service.dto.SendOtpRequest;
import com.auth.service.dto.VerifyOtpRequest;

public interface AuthService {
    void sendOtp(SendOtpRequest request);
    boolean verifyOtp(VerifyOtpRequest request);
}
