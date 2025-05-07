package com.idcard.model;

import lombok.Data;

@Data
public class IdCard {
    private String fullName;
    private String employeeId;
    private String department;
    private String position;
    private String photo;
    private String companyLogo;
    private String validUntil;
} 