package com.college.hospitalproject.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long patientId;

    private Long doctorId;

    private String diagnosis;

    private String prescription;

    private String reportFile;

    private LocalDate date;

    // getters setters
}