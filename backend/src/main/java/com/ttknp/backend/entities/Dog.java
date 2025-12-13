package com.ttknp.backend.entities;

import com.ttknp.jdbccustomservice.jdbc.helpers.IgnoreGenerateSQL;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "dogs")
public class Dog {
    private Long did;
    private String sku;
    private String nickname;
    private Short age;
    private Boolean alive;
    private Long bid;
    @IgnoreGenerateSQL
    private Breed breed;

    public Dog(Long did, String sku, String nickname, Short age, Boolean alive, Long bid) {
        this.did = did;
        this.sku = sku;
        this.nickname = nickname;
        this.age = age;
        this.alive = alive;
        this.bid = bid;
    }

    public Dog() {
    }

    public Long getDid() {
        return did;
    }

    public void setDid(Long did) {
        this.did = did;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Short getAge() {
        return age;
    }

    public void setAge(Short age) {
        this.age = age;
    }

    public Boolean getAlive() {
        return alive;
    }

    public void setAlive(Boolean alive) {
        this.alive = alive;
    }

    public Long getBid() {
        return bid;
    }

    public void setBid(Long bid) {
        this.bid = bid;
    }

    public Breed getBreed() {
        return breed;
    }

    public void setBreed(Breed breed) {
        this.breed = breed;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("Dog{");
        sb.append("did=").append(did);
        sb.append(", sku='").append(sku).append('\'');
        sb.append(", nickname='").append(nickname).append('\'');
        sb.append(", age=").append(age);
        sb.append(", alive=").append(alive);
        sb.append(", bid=").append(bid);
        sb.append('}');
        return sb.toString();
    }
}
