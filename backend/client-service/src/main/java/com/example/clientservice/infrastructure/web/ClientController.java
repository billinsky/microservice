package com.example.clientservice.infrastructure.web;

import com.example.clientservice.application.dto.ClientDTO;
import com.example.clientservice.application.service.ClientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @GetMapping
    public List<ClientDTO> getAll() {
        return clientService.getAllClients();
    }

    @GetMapping("/{id}")
    public ClientDTO getById(@PathVariable String id) {
        return clientService.getClientById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ClientDTO create(@Valid @RequestBody ClientDTO clientDTO) {
        return clientService.createClient(clientDTO);
    }

    @PutMapping("/{id}")
    public ClientDTO update(@PathVariable String id, @Valid @RequestBody ClientDTO clientDTO) {
        return clientService.updateClient(id, clientDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) {
        clientService.deleteClient(id);
    }
}
