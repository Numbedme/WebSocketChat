package com.numbedme.chat.controller;


import com.numbedme.chat.entity.Message;
import com.numbedme.chat.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.util.logging.Logger;

@Controller
public class MessagingController {

    private final MessageService messageService;

    private Logger logger = Logger.getLogger(MessagingController.class.getCanonicalName());

    @Autowired
    public MessagingController(MessageService messageService) {
        this.messageService = messageService;
    }

    @MessageMapping("/message/{chatName}")
    public void onRecieveMessage(Message message, @DestinationVariable String chatName){
        logger.info(message.toString());
        messageService.addMessageToChat(chatName, message);
    }
}
