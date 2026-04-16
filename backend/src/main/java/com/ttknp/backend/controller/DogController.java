package com.ttknp.backend.controller;

import com.ttknp.backend.entities.Dog;
import com.ttknp.backend.services.DogService;
import com.ttknp.responsecustomservice.constant.CommonStatus;
import com.ttknp.responsecustomservice.entity.ResponseObject;
import com.ttknp.webcustomservice.annotation.CommonRestAPI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CommonRestAPI(configPath = {"/api/dog","/api/dogs"}, configOrigins = {"http://localhost:8081","http://localhost:4200"})
public class DogController {

    private final DogService service;

    @Autowired
    public DogController(DogService service) {
        this.service = service;
    }

    @GetMapping(value = "/selectAll")
    private ResponseEntity<ResponseObject<List<Dog>>> retrieveAllModels() {
        return ResponseEntity
                .status((Short) CommonStatus.OK[0])
                .body(ResponseObject.builder()
                        .status((Short) CommonStatus.OK[0])
                        .info((String) CommonStatus.OK[1])
                        .data(service.getDogs())
                        .build()
                );
    }

    @GetMapping(value = "/selectOne",params = {"pk","!did"}) // !rid parameter is not present in the request
    private ResponseEntity<ResponseObject<?>> retrieveAllModel(@RequestParam Long pk) {
        return ResponseEntity
                .status((Short) CommonStatus.OK[0])
                .body(ResponseObject.builder()
                        .status((Short) CommonStatus.OK[0])
                        .info((String) CommonStatus.OK[1])
                        .data(service.getDog(pk))
                        .build()
                );
    }

    @PostMapping(value = "/insertOne")
    private ResponseEntity<ResponseObject<Boolean>> createModel(@RequestBody Dog dog) {
        return ResponseEntity
                .status((Short) CommonStatus.CREATE[0])
                .body(ResponseObject.builder()
                        .status((Short) CommonStatus.CREATE[0])
                        .info((String) CommonStatus.CREATE[1])
                        .data(service.addDog(dog))
                        .build()
       );
    }

    @DeleteMapping(value = "/deleteOne",params = {"pk","!did"})
    private ResponseEntity<ResponseObject<Boolean>> deleteModel(@RequestParam Long pk) {
        return ResponseEntity
                .status((Short) CommonStatus.ACCEPTED[0])
                .body(ResponseObject.builder()
                        .status((Short) CommonStatus.ACCEPTED[0])
                        .info((String) CommonStatus.ACCEPTED[1])
                        .data(service.removeDog(pk))
                        .build()
                );
    }
}
