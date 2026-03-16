package com.college.hospitalproject.repository;

import com.college.hospitalproject.model.DoctorSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DoctorSlotRepository extends JpaRepository<DoctorSlot, Long> {

    List<DoctorSlot> findByDoctorIdAndBookedFalse(Long doctorId);

}