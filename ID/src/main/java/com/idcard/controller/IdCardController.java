package com.idcard.controller;

import com.idcard.model.IdCard;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/idcard")
public class IdCardController {

    @PostMapping("/generate")
    public ResponseEntity<IdCard> generateIdCard(@RequestBody IdCard idCard) {
        // Here you would typically:
        // 1. Validate the input
        // 2. Process the photo
        // 3. Generate a unique ID
        // 4. Store the data in a database
        // 5. Return the generated ID card

        // For now, we'll just return the received data
        return ResponseEntity.ok(idCard);
    }
} 