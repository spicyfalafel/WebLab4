package ru.itmo.angry.beavers.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class PasswordConfig {


    /*
     BCrypt, however, will internally generate a random salt instead.
     This is important to understand because
     it means that each call will have a different result,
     and so we need to only encode the password once.
     */

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}
