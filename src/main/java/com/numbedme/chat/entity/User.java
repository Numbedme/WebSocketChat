package com.numbedme.chat.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;


@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String login;
    private String imageName;
    private Date creationDate;

    @ManyToMany
    private List<Chat> chats;
}
