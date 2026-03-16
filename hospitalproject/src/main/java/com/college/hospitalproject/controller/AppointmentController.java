package com.college.hospitalproject.controller;

import com.college.hospitalproject.model.Appointment;
import com.college.hospitalproject.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Book Appointment
    @PostMapping("/book")
    public Appointment bookAppointment(@RequestBody Appointment appointment) {
        return appointmentService.bookAppointment(appointment);
    }

    // Patient Appointment History
    @GetMapping("/patient/{patientId}")
    public List<Appointment> getPatientAppointments(@PathVariable Long patientId) {
        return appointmentService.getPatientAppointments(patientId);
    }

    // Doctor Appointment List
    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getDoctorAppointments(@PathVariable Long doctorId) {
        return appointmentService.getDoctorAppointments(doctorId);
    }
    // Doctor Approve Appointment
    @PutMapping("/{id}/approve")
    public Appointment approveAppointment(@PathVariable Long id) {
        return appointmentService.approveAppointment(id);
    }

    // Doctor Reject Appointment
    @PutMapping("/{id}/reject")
    public Appointment rejectAppointment(@PathVariable Long id) {
        return appointmentService.rejectAppointment(id);
    }
}