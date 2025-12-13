package com.ttknp.backend.services;

import com.ttknp.backend.entities.Breed;
import com.ttknp.jdbccustomservice.jdbc.select.JdbcSelectHelper;
import com.ttknp.jdbccustomservice.jdbc.update.JdbcInsertUpdateDeleteHelper;
import com.ttknp.valiadationcustomservice.validation.ValidateHelperService;
import com.ttknp.webcustomservice.exception.ContentNotAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BreedService {

    private final JdbcSelectHelper<Breed> jdbcSelectHelper;
    private final JdbcInsertUpdateDeleteHelper<Breed> jdbcInsertUpdateDeleteHelper;

    @Autowired
    public BreedService(JdbcSelectHelper<Breed> jdbcSelectHelper, JdbcInsertUpdateDeleteHelper<Breed> jdbcInsertUpdateDeleteHelper) {
        this.jdbcSelectHelper = jdbcSelectHelper;
        this.jdbcInsertUpdateDeleteHelper = jdbcInsertUpdateDeleteHelper;
    }

    public List<Breed> getBreeds() {
        return jdbcSelectHelper.selectAll(Breed.class);
    }

    public Breed getBreed(long bid) {
        if (ValidateHelperService.isNotEmptyObject(bid)) {
            if (jdbcSelectHelper.selectCount(Breed.class,"bid",bid) > 0) {
                return jdbcSelectHelper.selectOne(Breed.class,"bid",bid);
            } else {
                throw new ContentNotAllowed( new RuntimeException("The bid doesn't exist"));
            }
        } else {
            throw new ContentNotAllowed( new RuntimeException("The bid shouldn't be empty"));
        }
    }
}
