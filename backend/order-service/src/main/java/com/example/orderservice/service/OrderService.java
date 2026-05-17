package com.example.orderservice.service;

import com.example.commonproto.ClientResponse;
import com.example.orderservice.dto.ClientDTO;
import com.example.orderservice.dto.OrderDTO;
import com.example.orderservice.grpc.ClientGrpcClient;
import com.example.orderservice.mapper.OrderMapper;
import com.example.orderservice.model.Order;
import com.example.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final ClientGrpcClient clientGrpcClient;

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::enrichOrder)
                .collect(Collectors.toList());
    }

    public OrderDTO getOrderById(String id) {
        return orderRepository.findById(id)
                .map(this::enrichOrder)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    private OrderDTO enrichOrder(Order order) {
        OrderDTO dto = orderMapper.toDTO(order);
        try {
            ClientResponse clientResponse = clientGrpcClient.getClient(order.getClientId());
            dto.setClient(ClientDTO.builder()
                    .id(clientResponse.getId())
                    .nom(clientResponse.getNom())
                    .prenom(clientResponse.getPrenom())
                    .telephone(clientResponse.getTelephone())
                    .adresse(clientResponse.getAdresse())
                    .build());
        } catch (Exception e) {
            // Log error or set dummy client
        }
        return dto;
    }

    public OrderDTO createOrder(OrderDTO orderDTO) {
        Order order = orderMapper.toEntity(orderDTO);
        order.setDate(LocalDateTime.now());
        return enrichOrder(orderRepository.save(order));
    }

    public OrderDTO updateOrder(String id, OrderDTO orderDTO) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setNumero(orderDTO.getNumero());
        order.setMontant(orderDTO.getMontant());
        order.setClientId(orderDTO.getClientId());
        return enrichOrder(orderRepository.save(order));
    }

    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }
}
