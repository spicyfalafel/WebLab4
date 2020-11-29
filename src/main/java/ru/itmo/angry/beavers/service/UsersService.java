package ru.itmo.angry.beavers.service;
import ru.itmo.angry.beavers.model.User;

import java.util.List;

public interface UsersService {

    User findByLogin(String login);
    void save(User user);
    List<User> getAll();
    User get(Long id);
    void update(User user);
    void delete(Long id);
}
