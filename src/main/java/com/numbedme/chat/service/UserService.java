package com.numbedme.chat.service;

import com.numbedme.chat.entity.User;
import com.numbedme.chat.repository.ChatRepository;
import com.numbedme.chat.repository.ImageRepository;
import com.numbedme.chat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserService {

    private static final String FORMAT_STRING = "User%s";

    final ImageRepository imageRepository;
    final UserRepository userRepository;
    final ChatRepository chatRepository;


    @Autowired
    public UserService(ImageRepository imageRepository, UserRepository userRepository, ChatRepository chatRepository) {
        this.imageRepository = imageRepository;
        this.userRepository = userRepository;
        this.chatRepository = chatRepository;
    }

    public User createRandomUser() {
        User user = new User();
        user.setImageName(getRandomImage());
        user.setLogin(getRandomLogin());
        user.setCreationDate(new Date());
        userRepository.save(user);
        return user;
    }

    private String getRandomLogin(){
        return String.format(FORMAT_STRING, System.currentTimeMillis());
    }

    private String getRandomImage(){
        long i = imageRepository.count();
        return imageRepository.findAll().get((int)Math.floor(Math.random() * (i-1)) + 1).getName();
    }
}
