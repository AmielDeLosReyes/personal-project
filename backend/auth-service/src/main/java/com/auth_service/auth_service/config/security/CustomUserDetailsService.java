package com.auth_service.auth_service.config.security;

import com.auth_service.auth_service.rest.model.entity.UserEntity;
import com.auth_service.auth_service.rest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService  implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByUserName(username);
        if (user == null) {
            throw new UsernameNotFoundException("User Not Found with username: " + username);
        }

        // Convert role to GrantedAuthority
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().name());

        return new User(
                user.getUserName(),
                user.getPassword(),
                List.of(authority)
        );
    }
}