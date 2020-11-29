package ru.itmo.angry.beavers.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.itmo.angry.beavers.model.Point;
import ru.itmo.angry.beavers.repository.PointsRepository;

import java.util.ArrayList;
import java.util.List;


@Slf4j
@Service
public class PointsServiceImpl implements PointsService{

    @Autowired
    private PointsRepository repository;


    @Override
    public void save(Point point) {
        log.info("saved " + point);
        repository.save(point);
    }

    @Override
    public List<Point> getAll() {
        log.info("getAll()");
        return repository.findAll();
    }

    @Override
    public Point get(Long id) {
        log.info("get " + id);
        return repository.getOne(id);
    }

    @Override
    public void delete(Long id) {
        log.info("delete " + id);
        repository.deleteById(id);
    }

    @Override
    public List<Point> getAllPointsForUser(Long id) {
        List<Point> res = new ArrayList<>();
        repository.findAll().stream()
                .filter(i -> i.getId().equals(id)).findFirst()
                .ifPresent(res::add);
        return res;
    }
}
