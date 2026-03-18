package com.college.hospitalproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;

import com.college.hospitalproject.model.User;
import com.college.hospitalproject.model.Role;
import com.college.hospitalproject.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@SpringBootApplication
public class HospitalprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(HospitalprojectApplication.class, args);
	}

	@Bean
	CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder){

		return args -> {

			Optional<User> existingAdmin = userRepository.findByEmail("admin@hospital.com");

			if(existingAdmin.isEmpty()){
				User admin=new User();

				admin.setName("System Admin");
				admin.setEmail("admin@hospital.com");
				admin.setPassword(passwordEncoder.encode("admin123"));
				admin.setRole(Role.ADMIN);
				admin.setPhone("9999999999");
				admin.setGender("Other");
				admin.setDateOfBirth("1990-01-01");
				admin.setBloodGroup("O+");
				admin.setAddress("Hospital Administration Office");
				admin.setEmergencyContact("9999999999");

				userRepository.save(admin);

				System.out.println("Admin Created");
			} else {
				User admin = existingAdmin.get();
				if(admin.getPassword() != null && !admin.getPassword().startsWith("$2a$") && !admin.getPassword().startsWith("$2b$") && !admin.getPassword().startsWith("$2y$")){
					admin.setPassword(passwordEncoder.encode(admin.getPassword()));
					userRepository.save(admin);
					System.out.println("Admin Password Upgraded");
				}
			}

		};

	}

}
