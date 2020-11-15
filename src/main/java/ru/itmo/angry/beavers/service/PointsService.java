package ru.itmo.angry.beavers.service;

import ru.itmo.angry.beavers.model.Point;

import java.util.List;

public interface PointsService {

    void save(Point point);
    List<Point> getAll();
    Point get(Long id);
    //void update(Point point);
    void delete(Long id);
}
