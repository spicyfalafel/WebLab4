package ru.itmo.angry.beavers.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.itmo.angry.beavers.model.User;

public interface UsersRepository extends JpaRepository<User, Long > {
    User findByLogin(String login);
}
