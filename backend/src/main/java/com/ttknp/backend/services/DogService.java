package com.ttknp.backend.services;

import com.ttknp.backend.entities.Dog;
import com.ttknp.jdbccustomservice.jdbc.select.JdbcSelectHelper;
import com.ttknp.jdbccustomservice.jdbc.update.JdbcInsertUpdateDeleteHelper;
import com.ttknp.valiadationcustomservice.validation.ValidateHelperService;
import com.ttknp.webcustomservice.exception.ContentNotAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DogService {

    private final JdbcSelectHelper<Dog> jdbcSelectHelper;
    private final JdbcInsertUpdateDeleteHelper<Dog> jdbcInsertUpdateDeleteHelper;

    @Autowired
    public DogService(JdbcSelectHelper<Dog> jdbcSelectHelper, JdbcInsertUpdateDeleteHelper<Dog> jdbcInsertUpdateDeleteHelper) {
        this.jdbcSelectHelper = jdbcSelectHelper;
        this.jdbcInsertUpdateDeleteHelper = jdbcInsertUpdateDeleteHelper;
    }

    public List<Dog> getDogs() {
        return jdbcSelectHelper.selectAll(Dog.class);
    }

    public Dog getDog(long did) {
        if (ValidateHelperService.isNotEmptyObject(did)) {
            if (jdbcSelectHelper.selectCount(Dog.class,"did",did) > 0) {
                return jdbcSelectHelper.selectOne(Dog.class,"did",did);
            } else {
                throw new ContentNotAllowed( new RuntimeException("The did doesn't exist"));
            }
        } else {
            throw new ContentNotAllowed( new RuntimeException("The did shouldn't be empty"));
        }
    }

    public Boolean addDog(Dog dog) {
        if (dog.getBid() != null && ValidateHelperService.isNotEmptyObject(dog.getBid())) {
            try {
                return jdbcInsertUpdateDeleteHelper.insertOne(Dog.class,dog) > 0;
            } catch (IllegalAccessException e) {
                throw new ContentNotAllowed(e);
            }
        } else {
            throw new ContentNotAllowed( new RuntimeException("The bid shouldn't be empty"));
        }
    }

    public Boolean removeDog(long did) {
        if (ValidateHelperService.isNotEmptyObject(did)) {
            try {
                return jdbcInsertUpdateDeleteHelper.deleteOne(Dog.class, "did", did) > 0;
            } catch (IllegalAccessException e) {
                throw new ContentNotAllowed(e);
            }
        } else {
            throw new ContentNotAllowed( new RuntimeException("The did shouldn't be empty"));
        }
    }
}
