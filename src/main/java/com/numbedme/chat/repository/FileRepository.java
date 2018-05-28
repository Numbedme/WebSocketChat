package com.numbedme.chat.repository;

import com.numbedme.chat.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Long>{
    File findFileByName(String filename);
}
