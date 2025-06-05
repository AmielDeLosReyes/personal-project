package com.auth_service.auth_service.rest.repository;

import com.auth_service.auth_service.rest.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUserName(String username);

    boolean existsByUserName(String username);
}
