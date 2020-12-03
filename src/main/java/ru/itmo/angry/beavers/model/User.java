package ru.itmo.angry.beavers.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Table(name = "users")
@Entity
@Data
@ToString
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User{

    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    @SequenceGenerator(name="user_generator",
            sequenceName = "user_seq")
    private Long id;

    @Column(nullable = false)
    private String login;

    @Column(nullable = false)
    private String hashPass;

    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Point> points;

    public void addPoint(Point point){
        points.add(point);
    }
}
