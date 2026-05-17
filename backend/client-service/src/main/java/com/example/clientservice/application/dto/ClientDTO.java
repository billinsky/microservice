package com.example.clientservice.application.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClientDTO {
    private String id;
    @NotBlank(message = "Nom is required")
    private String nom;
    @NotBlank(message = "Prenom is required")
    private String prenom;
    @NotBlank(message = "Telephone is required")
    private String telephone;
    private String adresse;
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;
}
