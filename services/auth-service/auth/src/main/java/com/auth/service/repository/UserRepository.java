package com.auth.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.auth.service.entity.*;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository 
public interface UserRepository extends JpaRepository<User,Long>{
    Optional<User>findByEmail(String email);
    boolean existsByEmail(String email);
}
