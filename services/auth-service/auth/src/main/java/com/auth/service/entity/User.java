package com.auth.service.entity;

import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "users")
@Getter 
@Setter
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @Column(nullable=false)
    private String fullName;
    @Column(nullable=false, unique=true)
    private String email;
    @Column(nullable=false)
    private String password;
    private String profilePhotoUrl;
    @Column(nullable=false)
    private boolean isVerified;
    private LocalDateTime createdAt;
    public User(){}
    @PrePersist 
    protected void onCreate(){
        this.createdAt=LocalDateTime.now();
    }
}
