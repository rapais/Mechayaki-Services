package com.mechayaki.backend.auth.dto;

import com.mechayaki.backend.user.Role;

public class RegisterRequest {
    public String name;
    public String email;
    public String password;
    public Role role;
    
}
