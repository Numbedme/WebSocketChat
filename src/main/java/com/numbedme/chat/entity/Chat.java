package com.numbedme.chat.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Chat {
    @Id
    @GeneratedValue
    private Long id;
    private String name;

    @OneToMany
    private List<User> users;

    @OneToMany
    private List<Message> messages;
}
