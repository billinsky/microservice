package com.example.orderservice.grpc;

import com.example.commonproto.ClientIdRequest;
import com.example.commonproto.ClientResponse;
import com.example.commonproto.ClientServiceGrpc;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.stereotype.Service;

@Service
public class ClientGrpcClient {

    @GrpcClient("client-service")
    private ClientServiceGrpc.ClientServiceBlockingStub clientServiceStub;

    public ClientResponse getClient(String clientId) {
        ClientIdRequest request = ClientIdRequest.newBuilder().setId(clientId).build();
        return clientServiceStub.getClientById(request);
    }
}
