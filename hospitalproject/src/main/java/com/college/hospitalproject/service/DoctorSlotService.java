package com.college.hospitalproject.service;

import com.college.hospitalproject.model.DoctorSlot;
import com.college.hospitalproject.repository.DoctorSlotRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorSlotService {

    private final DoctorSlotRepository slotRepository;

    public DoctorSlotService(DoctorSlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    public DoctorSlot addSlot(DoctorSlot slot) {
        slot.setBooked(false);
        slot.setAvailable(true);
        return slotRepository.save(slot);
    }

    public List<DoctorSlot> getAvailableSlots(Long doctorId) {
        return slotRepository.findByDoctorIdAndBookedFalse(doctorId);
    }
}