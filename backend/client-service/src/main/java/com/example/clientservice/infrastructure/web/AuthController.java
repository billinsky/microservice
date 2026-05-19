package com.example.clientservice.infrastructure.web;

import com.example.clientservice.application.dto.UserRegistrationDTO;
import com.example.clientservice.domain.model.Client;
import com.example.clientservice.infrastructure.repository.ClientRepository;
import com.example.clientservice.infrastructure.security.JwtProvider;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    @PostMapping("/register")
    public String register(@RequestBody UserRegistrationDTO registrationDTO) {
        Client client = Client.builder()
                .nom(registrationDTO.getNom())
                .prenom(registrationDTO.getPrenom())
                .email(registrationDTO.getEmail())
                .password(passwordEncoder.encode(registrationDTO.getPassword()))
                .build();
        clientRepository.save(client);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {
        Client client = clientRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), client.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtProvider.generateToken(client.getEmail());
        return Map.of("token", token, "email", client.getEmail());
    }

    @Data
    static class LoginRequest {
        private String email;
        private String password;
    }
}
