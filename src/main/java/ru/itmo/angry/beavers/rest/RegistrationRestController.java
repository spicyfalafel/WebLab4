package ru.itmo.angry.beavers.rest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.itmo.angry.beavers.model.Role;
import ru.itmo.angry.beavers.model.User;
import ru.itmo.angry.beavers.service.UsersService;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Collections;

@RestController
@Slf4j
public class RegistrationRestController {

    @Autowired
    private UsersService usersService;
    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody @Valid User newUser) {
        if (usersService.findByLogin(newUser.getLogin()) != null) {
            log.error("login already exist " + newUser.getLogin());
            return new ResponseEntity<>(newUser, HttpStatus.CONFLICT);
        }
        newUser.setActive(true);
        newUser.setRoles(Collections.singleton(Role.USER));
        usersService.save(newUser);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    /*@PostMapping("/login")
    public Principal user(Principal principal) {
        log.info("user logged "+principal);
        return principal;
    }*/
}