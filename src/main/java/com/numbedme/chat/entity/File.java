package com.numbedme.chat.entity;


import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Lob
    private byte[] bytes;
}
