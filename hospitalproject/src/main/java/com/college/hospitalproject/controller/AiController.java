package com.college.hospitalproject.controller;

import com.college.hospitalproject.ai.SymptomRequest;
import com.college.hospitalproject.ai.SymptomService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    @Autowired
    private SymptomService symptomService;

    @PostMapping("/check")
    public String checkSymptom(@RequestBody SymptomRequest request) {

        return symptomService.checkSymptom(request.getSymptom());
    }
}