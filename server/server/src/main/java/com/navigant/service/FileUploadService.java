package com.navigant.service;

import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service interface for file upload operations.
 */
public interface FileUploadService {

    /**
     * Uploads a file to the specified folder.
     * 
     * @param file   The file to upload.
     * @param folder The target folder.
     * @return The URL of the uploaded file.
     * @throws IOException If the upload fails.
     */
    String uploadFile(MultipartFile file, String folder) throws IOException;
}
