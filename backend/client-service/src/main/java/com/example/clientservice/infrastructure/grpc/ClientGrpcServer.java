package com.example.clientservice.infrastructure.grpc;

import com.example.clientservice.domain.model.Client;
import com.example.clientservice.infrastructure.repository.ClientRepository;
import com.example.commonproto.ClientIdRequest;
import com.example.commonproto.ClientResponse;
import com.example.commonproto.ClientServiceGrpc;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;

@GrpcService
@RequiredArgsConstructor
public class ClientGrpcServer extends ClientServiceGrpc.ClientServiceImplBase {

    private final ClientRepository clientRepository;

    @Override
    public void getClientById(ClientIdRequest request, StreamObserver<ClientResponse> responseObserver) {
        Client client = clientRepository.findById(request.getId()).orElse(null);
        if (client != null) {
            ClientResponse response = ClientResponse.newBuilder()
                    .setId(client.getId())
                    .setNom(client.getNom())
                    .setPrenom(client.getPrenom())
                    .setTelephone(client.getTelephone())
                    .setAdresse(client.getAdresse() != null ? client.getAdresse() : "")
                    .build();
            responseObserver.onNext(response);
        } else {
            responseObserver.onError(new RuntimeException("Client not found"));
        }
        responseObserver.onCompleted();
    }
}
