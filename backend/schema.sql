-- OTP User Login / Checkout
-- MySQL 8.0+
-- Database: otp_user_login

CREATE DATABASE IF NOT EXISTS otp_user_login
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE otp_user_login;


-- =========================================================
-- Registered users
-- =========================================================

CREATE TABLE IF NOT EXISTS user_user (
    id BIGINT NOT NULL AUTO_INCREMENT,
    email VARCHAR(254) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    login_code VARCHAR(6) NOT NULL,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6) NOT NULL,

    PRIMARY KEY (id),
    UNIQUE KEY user_user_email_unique (email)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


-- =========================================================
-- Checkout information
-- =========================================================

CREATE TABLE IF NOT EXISTS user_checkout (
    id BIGINT NOT NULL AUTO_INCREMENT,
    email VARCHAR(254) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    shipping_address LONGTEXT NOT NULL,
    created_at DATETIME(6) NOT NULL,
    user_id BIGINT NULL,

    PRIMARY KEY (id),

    KEY user_checkout_user_id_idx (user_id),

    CONSTRAINT user_checkout_user_id_fk
        FOREIGN KEY (user_id)
        REFERENCES user_user (id)
        ON DELETE SET NULL
        ON UPDATE RESTRICT
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;