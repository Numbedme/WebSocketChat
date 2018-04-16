package com.numbedme.chat.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class MessagingController {

    private final SimpMessagingTemplate template;

    @Autowired
    public MessagingController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("/message/{roomId}")
    public void onRecieveMessage(String message, @DestinationVariable String roomId){
        this.template.convertAndSend("/topic/chat/" + roomId, message);
    }
}
