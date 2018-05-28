package com.numbedme.chat.repository;

import com.numbedme.chat.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long>{

    Image findByName(String name);
}
