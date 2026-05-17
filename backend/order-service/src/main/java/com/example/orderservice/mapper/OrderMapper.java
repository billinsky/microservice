package com.example.orderservice.mapper;

import com.example.orderservice.dto.OrderDTO;
import com.example.orderservice.model.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    @Mapping(target = "client", ignore = true)
    OrderDTO toDTO(Order order);
    Order toEntity(OrderDTO orderDTO);
}
