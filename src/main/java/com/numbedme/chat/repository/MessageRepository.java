package com.numbedme.chat.repository;

import com.numbedme.chat.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface MessageRepository extends JpaRepository<Message, Long>{
}
