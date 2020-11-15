package ru.itmo.angry.beavers.model;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "users")
@Entity
@Data
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {

    @Column(nullable = false)
    private String login;

    @Column(nullable = false)
    private String hashPass;

    @Column(nullable = false)
    private String salt;
}
