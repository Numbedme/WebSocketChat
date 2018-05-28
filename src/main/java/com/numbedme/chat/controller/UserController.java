package com.numbedme.chat.controller;

import com.numbedme.chat.entity.User;
import com.numbedme.chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/util/users")
public class UserController {


    final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User createRandomUser(){
        return userService.createRandomUser();

    }


}