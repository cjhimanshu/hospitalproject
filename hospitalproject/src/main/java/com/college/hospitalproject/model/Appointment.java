package com.college.hospitalproject.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="appointment")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long doctorId;

    private Long patientId;

    private Long slotId;

    private LocalDateTime appointmentTime;

    private String status;

    public Appointment(){}

    public Appointment(Long doctorId, Long patientId, Long slotId, LocalDateTime appointmentTime, String status){
        this.doctorId = doctorId;
        this.patientId = patientId;
        this.slotId = slotId;
        this.appointmentTime = appointmentTime;
        this.status = status;
    }

    public Long getId(){ return id; }

    public Long getDoctorId(){ return doctorId; }

    public Long getPatientId(){ return patientId; }

    public Long getSlotId(){ return slotId; }

    public LocalDateTime getAppointmentTime(){ return appointmentTime; }

    public String getStatus(){ return status; }

    public void setDoctorId(Long doctorId){ this.doctorId = doctorId; }

    public void setPatientId(Long patientId){ this.patientId = patientId; }

    public void setSlotId(Long slotId){ this.slotId = slotId; }

    public void setAppointmentTime(LocalDateTime appointmentTime){ this.appointmentTime = appointmentTime; }

    public void setStatus(String status){ this.status = status; }
}