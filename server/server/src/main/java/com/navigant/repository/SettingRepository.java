package com.navigant.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.navigant.model.Setting;

@Repository
public interface SettingRepository extends MongoRepository<Setting, String> {

}
