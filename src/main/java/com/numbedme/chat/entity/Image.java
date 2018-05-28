package com.numbedme.chat.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Image {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;
    @Lob
    private byte[] bytes;
}
