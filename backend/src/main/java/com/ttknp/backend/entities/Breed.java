package com.ttknp.backend.entities;

import org.springframework.data.relational.core.mapping.Table;

@Table(name = "breeds")
public class Breed {

    private Long bid;
    private String breed;

    public Breed(Long bid, String breed) {
        this.bid = bid;
        this.breed = breed;
    }

    public Breed() {
    }

    public Long getBid() {
        return bid;
    }

    public void setBid(Long bid) {
        this.bid = bid;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("Breed{");
        sb.append("bid=").append(bid);
        sb.append(", breed='").append(breed).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
