package com.example.orderservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDTO {
    private String id;
    private String numero;
    private LocalDateTime date;
    private Double montant;
    private String clientId;
    private ClientDTO client; // Enriched data
}
