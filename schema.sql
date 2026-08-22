-- database-wide general user table (main table)
CREATE TABLE IF NOT EXISTS `tbl_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `acc_email` VARCHAR(255) NOT NULL UNIQUE,
  `acc_name` VARCHAR(32) NOT NULL UNIQUE,
  `acc_password` VARCHAR(255) NOT NULL,
  `is_verified` TINYINT(1) DEFAULT 0,
  `verify_code` VARCHAR(6) DEFAULT NULL,
  `verify_expires` DATETIME DEFAULT NULL,
  `reset_code` VARCHAR(6) DEFAULT NULL,
  `reset_expires` DATETIME DEFAULT NULL,

  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE tbl_users ADD COLUMN IF NOT EXISTS is_verified TINYINT(1) DEFAULT 0;
ALTER TABLE tbl_users ADD COLUMN IF NOT EXISTS verify_code VARCHAR(6) DEFAULT NULL;
ALTER TABLE tbl_users ADD COLUMN IF NOT EXISTS verify_expires DATETIME DEFAULT NULL;
ALTER TABLE tbl_users ADD COLUMN IF NOT EXISTS reset_code VARCHAR(6) DEFAULT NULL;
ALTER TABLE tbl_users ADD COLUMN IF NOT EXISTS reset_expires VARCHAR(6) DEFAULT NULL;

-- shgabb clicker tables
-- prefix: shg_
-- user_ for everything related to users, not the game's own data

-- cloud save table (actual savefiles saved as standalone files)
CREATE TABLE IF NOT EXISTS `shg_user_saves` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
--  `save_slot` INT DEFAULT 1,
  `savefile_ref` VARCHAR(64) NOT NULL,
  `updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `tbl_users`(`id`) ON DELETE CASCADE
);

-- user activity / playercount table
CREATE TABLE IF NOT EXISTS `shg_user_activity` (
  `user_id` INT PRIMARY KEY,
  `last_activity` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `tbl_users`(`id`) ON DELETE CASCADE
);