package com.ttknp.backend.controller;

import com.ttknp.backend.services.BreedService;
import com.ttknp.responsecustomservice.constant.CommonStatus;
import com.ttknp.responsecustomservice.entity.ResponseObject;
import com.ttknp.webcustomservice.annotation.CommonRestAPI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@CommonRestAPI(configPath = {"/api/breed","/api/breeds"}, configOrigins = {"http://localhost:8080","http://localhost:4200"})
public class BreedController {
    private final BreedService service;

    @Autowired
    public BreedController(BreedService service) {
        this.service = service;
    }

    @GetMapping(value = "/selectAll") // !rid parameter is not present in the request
    private ResponseEntity<ResponseObject<?>> retrieveAllModel() {
        return ResponseEntity
                .status((Short) CommonStatus.OK[0])
                .body(ResponseObject.builder()
                        .status((Short) CommonStatus.OK[0])
                        .info((String) CommonStatus.OK[1])
                        .data(service.getBreeds())
                        .build()
                );
    }

    @GetMapping(value = "/selectOne",params = {"pk","!bid"}) // !rid parameter is not present in the request
    private ResponseEntity<ResponseObject<?>> retrieveModel(@RequestParam Long pk) {
        return ResponseEntity
                .status((Short) CommonStatus.OK[0])
                .body(ResponseObject.builder()
                        .status((Short) CommonStatus.OK[0])
                        .info((String) CommonStatus.OK[1])
                        .data(service.getBreed(pk))
                        .build()
                );
    }
}
