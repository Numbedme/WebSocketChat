package com.numbedme.chat.service;

import com.numbedme.chat.entity.File;
import com.numbedme.chat.entity.Image;
import com.numbedme.chat.repository.FileRepository;
import com.numbedme.chat.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class FileService {

    private static final String DATE_PATTERN = "yyyyMMddHHmmssSSS";
    private static final String FORMAT_STRING = "image%s%s";
    private static final String FILE_NAME_FORMAT = "appFile%s.%s";


    private final ImageRepository repository;
    private final FileRepository fileRepository;

    @Autowired
    public FileService(ImageRepository repository, FileRepository fileRepository) {
        this.repository = repository;
        this.fileRepository = fileRepository;
    }

    public Image handleImageUpload(MultipartFile file) throws IOException {
        Image image = new Image();
        image.setBytes(file.getBytes());
        image.setType(file.getContentType());
        image.setName(String.format(FORMAT_STRING,
                DateTimeFormatter.ofPattern(DATE_PATTERN).format(LocalDateTime.now()),
                Math.random()));
        repository.save(image);
        return image;
    }

    public Image findImageByName(String filename) {
        return repository.findByName(filename);
    }

    public File findFileByName(String filename) {
        return fileRepository.findFileByName(filename);
    }

    public File handleFileUpload(MultipartFile mfile) throws IOException {
        File file = new File();
        file.setBytes(mfile.getBytes());
        file.setName(String.format(FILE_NAME_FORMAT, System.currentTimeMillis(), mfile.getOriginalFilename().split("\\.")[1]));
        fileRepository.save(file);
        return file;
    }
}
