package ru.itmo.angry.beavers.model;

import lombok.*;

import javax.persistence.*;


@Table(name = "points")
@Entity
@Data
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
public class
Point {
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    @SequenceGenerator(name="point_generator",
            sequenceName = "point_seq", allocationSize=50)
    private Long id;

    @Column(nullable = false)
    private Double x;

    @Column(nullable = false)
    private Double y;

    @Column(nullable = false)
    private Double r;

    @Column(nullable = false)
    private boolean inArea;

    @Column(nullable = false)
    private String queryTime;

    @ManyToOne(cascade = CascadeType.ALL)
    private User user;
}
