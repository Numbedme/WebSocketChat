package com.numbedme.chat.service;

import com.numbedme.chat.entity.Chat;
import com.numbedme.chat.entity.File;
import com.numbedme.chat.entity.Message;
import com.numbedme.chat.entity.Type;
import com.numbedme.chat.repository.ChatRepository;
import com.numbedme.chat.repository.FileRepository;
import com.numbedme.chat.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    private final ChatRepository chatRepository;

    private final SimpMessagingTemplate template;

    private final String TOPIC_URI = "/topic/chat/";


    @Autowired
    public MessageService(MessageRepository messageRepository,
                          ChatRepository chatRepository,
                          SimpMessagingTemplate template) {
        this.messageRepository = messageRepository;
        this.chatRepository = chatRepository;
        this.template = template;
    }

    public Message addMessageToChat(String chatName, Message message) throws IOException {
        messageRepository.save(message);
        Chat chat = chatRepository.findByName(chatName);
        chat.addMessage(message);
        chatRepository.save(chat);
        this.template.convertAndSend(TOPIC_URI + chatName, message);
        return message;
    }
}
