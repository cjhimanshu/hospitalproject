package com.college.hospitalproject.controller;

import com.college.hospitalproject.model.User;
import com.college.hospitalproject.service.UserService;
import com.college.hospitalproject.config.Jwtutil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private Jwtutil jwtUtil;

    // ✅ REGISTER
    @PostMapping("/register")
    public String register(@RequestBody User user) {
        userService.register(user);
        return "User Registered Successfully";
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User loggedUser = userService.login(user.getEmail(), user.getPassword());

        if (loggedUser != null) {
            return jwtUtil.generateToken(user.getEmail());
        }

        return "Invalid Email or Password";
    }
}