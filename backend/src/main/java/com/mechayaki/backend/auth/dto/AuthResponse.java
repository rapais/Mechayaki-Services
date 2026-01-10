package com.mechayaki.backend.auth.dto;

import com.mechayaki.backend.user.Role;

public class AuthResponse {
    public Long id;
    public String name;
    public String email;
    public Role role;

    public AuthResponse(Long id, String name, String email, Role role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }
}
