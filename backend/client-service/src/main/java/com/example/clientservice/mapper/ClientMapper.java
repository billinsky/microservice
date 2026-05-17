package com.example.clientservice.mapper;

import com.example.clientservice.application.dto.ClientDTO;
import com.example.clientservice.domain.model.Client;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ClientMapper {
    ClientDTO toDTO(Client client);
    Client toEntity(ClientDTO clientDTO);
}
