package com.mechayaki.backend.auth;

import com.mechayaki.backend.auth.dto.AuthResponse;
import com.mechayaki.backend.auth.dto.LoginRequest;
import com.mechayaki.backend.auth.dto.RegisterRequest;
import com.mechayaki.backend.user.Role;
import com.mechayaki.backend.user.User;
import com.mechayaki.backend.user.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository users, PasswordEncoder passwordEncoder) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(RegisterRequest req) {
        if (req.name == null || req.name.isBlank()) throw new IllegalArgumentException("Name is required");
        if (req.email == null || req.email.isBlank()) throw new IllegalArgumentException("Email is required");
        if (req.password == null || req.password.length() < 6) throw new IllegalArgumentException("Password must be at least 6 characters long");
        if (req.role == null) req.role = Role.COSTUMER;

        if (users.existsByEmailIgnoreCase(req.email)) {
            throw new IllegalArgumentException("Email is already registered");
        }

        User u = new User();
        u.setName(req.name.trim());
        u.setEmail(req.email);
        u.setPasswordHash(passwordEncoder.encode(req.password));
        u.setRole(req.role);

        User saved = users.save(u);
        return new AuthResponse(saved.getId(), saved.getName(), saved.getEmail(), saved.getRole());
    }

    public AuthResponse login(LoginRequest req) {
        if (req.email == null || req.email.isBlank()) throw new IllegalArgumentException("Email is required");
        if (req.password == null || req.password.isBlank()) throw new IllegalArgumentException("Password is required");

        User u = users.findByEmailIgnoreCase(req.email.trim())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!passwordEncoder.matches(req.password, u.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        return new AuthResponse(u.getId(), u.getName(), u.getEmail(), u.getRole());
    }
}
