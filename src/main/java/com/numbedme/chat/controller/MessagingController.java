package com.numbedme.chat.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.logging.Logger;

@Controller
public class MessagingController {

    private final SimpMessagingTemplate template;

    private Logger conosle = Logger.getLogger(MessagingController.class.getCanonicalName());

    @Autowired
    public MessagingController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("/message/{roomId}")
    public void onRecieveMessageWithId(String message, @DestinationVariable String roomId){
        conosle.info(message);
        this.template.convertAndSend("/topic/chat/" + roomId, message);
    }

    @MessageMapping("/message")
    public void onRecieveMessage(String message){
        conosle.info(message);
        this.template.convertAndSend("/topic/local", message);
    }
}
