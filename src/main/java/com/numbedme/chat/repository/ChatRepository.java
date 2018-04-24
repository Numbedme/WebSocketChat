package com.numbedme.chat.repository;

import com.numbedme.chat.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ChatRepository extends JpaRepository<Chat, Long>{
}