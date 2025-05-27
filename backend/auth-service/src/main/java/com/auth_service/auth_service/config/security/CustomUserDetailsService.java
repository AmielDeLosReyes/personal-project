package com.auth_service.auth_service.config.security;

import com.auth_service.auth_service.rest.model.UserEntity;
import com.auth_service.auth_service.rest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import java.util.Collections;
@Service
public class CustomUserDetailsService  implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User Not Found with username: " + username);
        }
        return new User(
                user.getUsername(),
                user.getPassword(),
                Collections.emptyList()
        );
    }
}