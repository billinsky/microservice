package com.example.clientservice.application.service;

import com.example.clientservice.application.dto.ClientDTO;
import com.example.clientservice.mapper.ClientMapper;
import com.example.clientservice.domain.model.Client;
import com.example.clientservice.infrastructure.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;

    public List<ClientDTO> getAllClients() {
        return clientRepository.findAll().stream()
                .map(clientMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ClientDTO getClientById(String id) {
        return clientRepository.findById(id)
                .map(clientMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Client not found"));
    }

    public ClientDTO createClient(ClientDTO clientDTO) {
        Client client = clientMapper.toEntity(clientDTO);
        return clientMapper.toDTO(clientRepository.save(client));
    }

    public ClientDTO updateClient(String id, ClientDTO clientDTO) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found"));
        client.setNom(clientDTO.getNom());
        client.setPrenom(clientDTO.getPrenom());
        client.setTelephone(clientDTO.getTelephone());
        client.setAdresse(clientDTO.getAdresse());
        client.setEmail(clientDTO.getEmail());
        return clientMapper.toDTO(clientRepository.save(client));
    }

    public void deleteClient(String id) {
        clientRepository.deleteById(id);
    }
}
