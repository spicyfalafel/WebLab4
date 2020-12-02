package ru.itmo.angry.beavers.rest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.itmo.angry.beavers.model.Graph;
import ru.itmo.angry.beavers.model.Point;
import ru.itmo.angry.beavers.service.PointsService;
import javax.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/points/")
public class PointsRestController {

    @Autowired
    private PointsService pointsService;

    @GetMapping("{id}")
    public ResponseEntity<Point> getPoint(@PathVariable("id") Long id){
        if(id == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Point p = pointsService.get(id);
        if(p == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Point>> getAllPoints(){
        List<Point> all = this.pointsService.getAll();
        if(all.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(all, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Point> deletePoint(@PathVariable("id") Long id) {
        if(id == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Point p = pointsService.get(id);
        if(p==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        pointsService.delete(id);
        return new ResponseEntity<>(p, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Point> savePoint(@RequestBody @Valid Point point){
        HttpHeaders headers = new HttpHeaders();
        if(point == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Graph graph = new Graph();
        point.setInArea(graph.isInArea(point));
        this.pointsService.save(point);
        return new ResponseEntity<>(point, headers, HttpStatus.CREATED);
    }
}
