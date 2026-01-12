package com.navigant.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.navigant.service.FileUploadService;

@RestController
@RequestMapping("/api/v1/admin")
public class FileUploadController {

    private final FileUploadService fileUploadService;

    public FileUploadController(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    /**
     * Uploads an image file.
     * Endoint: POST /api/v1/admin/upload/image
     * 
     * @param file The image file.
     * @return Map containing "url".
     * @throws IOException If upload fails.
     */
    @PostMapping(value = "/upload/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        String url = fileUploadService.uploadFile(file, "case-studies"); // Default folder to case-studies for now
        return Map.of("url", url);
    }
}
