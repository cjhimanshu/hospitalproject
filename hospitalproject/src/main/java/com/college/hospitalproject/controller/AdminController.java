package com.college.hospitalproject.controller;

import com.college.hospitalproject.repository.AppointmentRepository;
import com.college.hospitalproject.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;

    public AdminController(UserRepository userRepository,
                           AppointmentRepository appointmentRepository) {

        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @GetMapping("/analytics")
    public Map<String,Object> analytics(){

        Map<String,Object> data = new HashMap<>();

        data.put("totalUsers", userRepository.count());
        data.put("totalAppointments", appointmentRepository.count());

        return data;
    }
    @GetMapping("/dashboard")
    public Map<String,Object> dashboard(){

        Map<String,Object> data = new HashMap<>();

        data.put("totalUsers", userRepository.count());
        data.put("totalAppointments", appointmentRepository.count());

        return data;
    }
}