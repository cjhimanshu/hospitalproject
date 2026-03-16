package com.college.hospitalproject.controller;

import com.college.hospitalproject.model.DoctorSlot;
import com.college.hospitalproject.service.DoctorSlotService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/slots")
public class DoctorSlotController {

    private final DoctorSlotService slotService;

    public DoctorSlotController(DoctorSlotService slotService) {
        this.slotService = slotService;
    }

    // Doctor add slot
    @PostMapping("/add")
    public DoctorSlot addSlot(@RequestBody DoctorSlot slot) {
        return slotService.addSlot(slot);
    }

    // Patient view slots
    @GetMapping("/doctor/{doctorId}")
    public List<DoctorSlot> getSlots(@PathVariable Long doctorId) {
        return slotService.getAvailableSlots(doctorId);
    }
}