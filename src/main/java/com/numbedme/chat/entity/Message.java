package com.numbedme.chat.entity;

import lombok.Data;

import java.util.Date;

@Data
public class Message {
    private Long Id;
    private String message;
    private Date date;
    private User user;
}
