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
    private PointsRepository pointsRepository;


    @Override
    public void save(Point point) {
        log.info("saved " + point);
        pointsRepository.save(point);
    }

    @Override
    public List<Point> getAll() {
        log.info("getAll()");
        return pointsRepository.findAll();
    }

    @Override
    public Point get(Long id) {
        log.info("get " + id);
        return pointsRepository.getOne(id);
    }

    @Override
    public void delete(Long id) {
        log.info("delete " + id);
        pointsRepository.deleteById(id);
    }

    @Override
    public List<Point> getAllPointsForUser(Long id) {
        List<Point> res = new ArrayList<>();
        pointsRepository.findAll().stream()
                .filter(point -> point.getId().equals(id)).forEach(res::add);
        return res;
    }
}
