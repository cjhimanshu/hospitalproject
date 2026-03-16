package com.college.hospitalproject.ai;

import org.springframework.stereotype.Service;

@Service
public class SymptomService {

    public String checkSymptom(String symptom) {

        symptom = symptom.toLowerCase();

        if(symptom.contains("fever")) {
            return "Possible Viral Infection. Consult General Physician.";
        }

        if(symptom.contains("cough")) {
            return "Possible Respiratory Infection. Consult Pulmonologist.";
        }

        if(symptom.contains("chest pain")) {
            return "Possible Heart Issue. Consult Cardiologist.";
        }

        if(symptom.contains("headache")) {
            return "Possible Migraine or Stress. Consult Neurologist.";
        }

        return "Symptom unclear. Please consult General Physician.";
    }
}