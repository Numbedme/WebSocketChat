package com.numbedme.chat.controller;

import com.numbedme.chat.entity.File;
import com.numbedme.chat.entity.Image;
import com.numbedme.chat.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller()
@RequestMapping("/files")
public class FileController {

    final FileService fileService;

    @Autowired
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping(value = "/images/{fileName:.+}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    @ResponseBody
    public ResponseEntity<byte[]> serveImage(@PathVariable String fileName) {
        Image img = fileService.findImageByName(fileName);
        return new ResponseEntity<>(img.getBytes(), HttpStatus.OK);
    }

    @PostMapping(value = "/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> handleImageUpload(@RequestParam("image") MultipartFile file) throws IOException {
        Image image = fileService.handleImageUpload(file);
        return ResponseEntity.ok(image);
    }

    @GetMapping(value = "/{fileName:.+}", produces = MediaType.ALL_VALUE)
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String fileName) {
        File file = fileService.findFileByName(fileName);
        ByteArrayResource resource = new ByteArrayResource(file.getBytes());

        return ResponseEntity.ok().contentLength(file.getBytes().length).contentType(MediaType.parseMediaType("application/octet-stream")).body(resource);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file) throws IOException {
        File res = fileService.handleFileUpload(file);
        return ResponseEntity.ok(res);
    }
}
