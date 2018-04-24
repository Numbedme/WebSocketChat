package com.numbedme.chat.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Message {
    @Id
    @GeneratedValue
    private Long Id;
    private String message;
    private Date date;
}
