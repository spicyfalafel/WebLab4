package ru.itmo.angry.beavers.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.itmo.angry.beavers.model.Point;

public interface PointsRepository extends JpaRepository<Point, Long> {
}
