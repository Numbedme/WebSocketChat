package com.numbedme.chat.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Lob
    private String message;
    private Date date;
    @ManyToOne
    private User user;
}
