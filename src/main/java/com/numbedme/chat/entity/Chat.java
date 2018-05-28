package com.numbedme.chat.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String password;

    @ManyToMany
    private List<User> users;

    @OneToMany(fetch = FetchType.EAGER)
    private List<Message> messages;

    public void addMessage(Message msg){
        messages.add(msg);
    }
}
