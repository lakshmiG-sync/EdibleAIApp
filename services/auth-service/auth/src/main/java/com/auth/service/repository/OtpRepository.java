package com.auth.service.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.auth.service.entity.*;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository 
public interface OtpRepository extends JpaRepository<OtpVerification,Long>{
    Optional<OtpVerification>findTopByEmailOrderByExpiryTimeDesc(String email);
    void deleteByEmail(String email);
}
