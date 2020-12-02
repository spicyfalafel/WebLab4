package ru.itmo.angry.beavers.rest;

import com.monitorjbl.json.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.itmo.angry.beavers.model.Point;
import ru.itmo.angry.beavers.model.User;
import ru.itmo.angry.beavers.service.PointsService;
import ru.itmo.angry.beavers.service.UsersService;

import javax.validation.Valid;
import java.util.List;

import static com.monitorjbl.json.Match.match;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/api/users/")
public class UsersRestController {

    @Autowired
    PointsService pointsService;

    @Autowired
    UsersService usersService;

    @GetMapping(value = "{id}/points/")
    public ResponseEntity<List<Point>> getPointsForUser(@PathVariable final Long id) {
        if(id == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<Point> points = pointsService.getAllPointsForUser(id);
        if(points.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(points, HttpStatus.OK);
    }

    @GetMapping("{id}/points/{pointId}")
    public ResponseEntity<Point> getPointById(@PathVariable("id") Long id,
                                              @PathVariable("pointId")Long pointId){
        if(pointId == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Point point = pointsService.getAllPointsForUser(id).stream().filter(p -> p.getId().equals(pointId))
                .findFirst().orElse(null);
        if(point==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(point, HttpStatus.OK);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Long id){
        if(id == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        User user = usersService.get(id);
        if(user == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        //exclude expensive field
        JsonView.with(user).onClass(User.class, match().exclude("points"));
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> all = this.usersService.getAll();
        if(all.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        JsonView.with(all).onClass(User.class, match().exclude("points"));
        return new ResponseEntity<>(all, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<User> deleteUser(@PathVariable("id") Long id) {
        if(id == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        User user = usersService.get(id);
        if(user==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        usersService.delete(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<User> saveUser(@RequestBody @Valid User user){
        HttpHeaders headers = new HttpHeaders();
        if(user == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if(usersService.findByLogin(user.getLogin()) !=null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        this.usersService.save(user);
        return new ResponseEntity<>(user, headers, HttpStatus.CREATED);
    }


    @PostMapping("{userId}/points/")
    public ResponseEntity<Point> savePoint(@RequestBody @Valid Point point, @PathVariable Long userId){
        HttpHeaders headers = new HttpHeaders();
        if(userId == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if(point == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        this.pointsService.save(point);
        return new ResponseEntity<>(point, headers, HttpStatus.CREATED);
    }

}
