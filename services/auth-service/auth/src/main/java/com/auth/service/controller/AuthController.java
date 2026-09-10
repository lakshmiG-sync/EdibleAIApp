package com.auth.service.controller;

import java.util.Map;
import com.auth.service.service.*;
import com.auth.service.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController 
@RequestMapping ("/api/auth")
@CrossOrigin (origins = "*")
public class AuthController {
    @Autowired 
    private AuthService authService;
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody SendOtpRequest request){
        try{
            authService.sendOtp(request);
            return ResponseEntity.ok(Map.of("message","4-digit OTP sent successfully to"+request.getEmail()));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(Map.of("error",e.getMessage()));
        }
    }
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpRequest request){
        
            boolean isValid = authService.verifyOtp(request);
        if(isValid){
            return ResponseEntity.ok(Map.of("message","OTP Verified succeessfully!"));
        }else{
            return ResponseEntity.badRequest().body(Map.of("error","Invalid or expired OTP"));
        }
    }
}
