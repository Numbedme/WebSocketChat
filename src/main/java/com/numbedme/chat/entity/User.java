package com.numbedme.chat.entity;

import lombok.Data;

import javax.persistence.*;


@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String login;
    private String image;
}
