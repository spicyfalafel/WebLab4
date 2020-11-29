package ru.itmo.angry.beavers.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.itmo.angry.beavers.model.User;
import ru.itmo.angry.beavers.repository.UsersRepository;

import java.util.List;

@Slf4j
@Service
public class UsersServiceImpl implements UsersService {

    @Autowired
    private UsersRepository repository;


    @Override
    public User findByLogin(String login) {
        log.info("findByLogin " + login);
        return repository.findByLogin(login);
    }

    @Override
    public void save(User user) {
        repository.save(user);
        log.info("saved " + user);
    }

    @Override
    public List<User> getAll() {
        log.info("getAll()");
        return repository.findAll();
    }

    @Override
    public User get(Long id) {
        log.info("get " + id);
        return repository.getOne(id);
    }

    @Override
    public void update(User user) {
        log.info("update " + user);

    }

    @Override
    public void delete(Long id) {
        log.info("delete " + id);
        repository.deleteById(id);
    }
}
