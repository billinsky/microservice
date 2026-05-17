package com.example.clientservice.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "clients")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Client {
    @Id
    private String id;
    private String nom;
    private String prenom;
    private String telephone;
    private String adresse;
    private String email;
    private String password;
}
