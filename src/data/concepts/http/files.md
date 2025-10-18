The Files class in Utopia HTTP provides comprehensive file upload handling with validation, security checks, and file operations. It ensures secure file handling while providing a simple API for common file operations.

File uploads are automatically processed and validated, with support for file type checking, size limits, and secure file storage. The system prevents common security issues like path traversal attacks and ensures files are stored safely.

## Code Example

```php
<?php

use Utopia\Http\Http;
use Utopia\Http\Request;
use Utopia\Http\Response;
use Utopia\Http\Files;

// Handle single file upload
Http::post('/upload')
    ->inject('request')
    ->inject('response')
    ->action(function(Request $request, Response $response) {
        $files = $request->getFiles();
        
        if (empty($files)) {
            $response->setStatusCode(400)->json(['error' => 'No files uploaded']);
            return;
        }
        
        $file = $files[0]; // First uploaded file
        
        // Validate file
        if ($file->getSize() > 5 * 1024 * 1024) { // 5MB limit
            $response->setStatusCode(400)->json(['error' => 'File too large']);
            return;
        }
        
        // Check file type
        $allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!in_array($file->getType(), $allowedTypes)) {
            $response->setStatusCode(400)->json(['error' => 'Invalid file type']);
            return;
        }
        
        // Generate secure filename
        $extension = pathinfo($file->getName(), PATHINFO_EXTENSION);
        $filename = uniqid() . '.' . $extension;
        $uploadPath = '/uploads/' . $filename;
        
        // Move file to secure location
        if ($file->moveTo($uploadPath)) {
            $response->json([
                'message' => 'File uploaded successfully',
                'filename' => $filename,
                'size' => $file->getSize(),
                'type' => $file->getType()
            ]);
        } else {
            $response->setStatusCode(500)->json(['error' => 'Upload failed']);
        }
    });

// Handle multiple file uploads
Http::post('/upload-multiple')
    ->inject('request')
    ->inject('response')
    ->action(function(Request $request, Response $response) {
        $files = $request->getFiles();
        $uploadedFiles = [];
        
        foreach ($files as $file) {
            // Validate each file
            if ($file->getSize() > 2 * 1024 * 1024) { // 2MB per file
                continue; // Skip oversized files
            }
            
            $filename = uniqid() . '_' . $file->getName();
            $uploadPath = '/uploads/' . $filename;
            
            if ($file->moveTo($uploadPath)) {
                $uploadedFiles[] = [
                    'originalName' => $file->getName(),
                    'filename' => $filename,
                    'size' => $file->getSize(),
                    'type' => $file->getType()
                ];
            }
        }
        
        $response->json([
            'message' => 'Files processed',
            'uploaded' => count($uploadedFiles),
            'files' => $uploadedFiles
        ]);
    });

// File operations
Http::get('/files/{filename}')
    ->param('filename', '', new Text(255), 'File name')
    ->inject('response')
    ->action(function(string $filename, Response $response) {
        $filePath = '/uploads/' . $filename;
        
        if (!file_exists($filePath)) {
            $response->setStatusCode(404)->json(['error' => 'File not found']);
            return;
        }
        
        // Get file information
        $fileInfo = [
            'name' => $filename,
            'size' => filesize($filePath),
            'type' => mime_content_type($filePath),
            'modified' => date('Y-m-d H:i:s', filemtime($filePath))
        ];
        
        $response->json($fileInfo);
    });
```

## Additional Information

The Files class provides secure file upload handling with built-in validation and security checks. It prevents common security issues and provides a simple API for file operations while ensuring files are stored safely.
