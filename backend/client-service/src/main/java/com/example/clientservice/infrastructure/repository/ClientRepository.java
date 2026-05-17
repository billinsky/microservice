package com.example.clientservice.infrastructure.repository;

import com.example.clientservice.domain.model.Client;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ClientRepository extends MongoRepository<Client, String> {
    Optional<Client> findByEmail(String email);
}
