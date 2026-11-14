-- database-wide general user table (main table)
CREATE TABLE IF NOT EXISTS `tbl_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `acc_email` VARCHAR(255) DEFAULT NULL UNIQUE,
  `acc_name` VARCHAR(32) NOT NULL UNIQUE,
  `acc_password` VARCHAR(255) NOT NULL,
  `is_verified` TINYINT(1) DEFAULT 0,
  `verify_code` VARCHAR(6) DEFAULT NULL,
  `verify_expires` DATETIME DEFAULT NULL,
  `reset_code` VARCHAR(6) DEFAULT NULL,
  `reset_expires` DATETIME DEFAULT NULL,
  `pending_email` VARCHAR(255) DEFAULT NULL,

  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE tbl_users ADD COLUMN IF NOT EXISTS is_verified TINYINT(1) DEFAULT 0;
ALTER TABLE tbl_users ADD COLUMN IF NOT EXISTS verify_code VARCHAR(6) DEFAULT NULL;
ALTER TABLE tbl_users ADD COLUMN IF NOT EXISTS verify_expires DATETIME DEFAULT NULL;
ALTER TABLE tbl_users ADD COLUMN IF NOT EXISTS reset_code VARCHAR(6) DEFAULT NULL;
ALTER TABLE tbl_users ADD COLUMN IF NOT EXISTS reset_expires DATETIME DEFAULT NULL;
ALTER TABLE tbl_users MODIFY COLUMN reset_expires DATETIME DEFAULT NULL;
ALTER TABLE tbl_users MODIFY COLUMN acc_email VARCHAR(255) DEFAULT NULL;
ALTER TABLE tbl_users ADD COLUMN IF NOT EXISTS pending_email VARCHAR(255) DEFAULT NULL;

-- shgabb clicker tables
-- prefix: shg_
-- user_ for everything related to users, not the game's own data

-- cloud save table (actual savefiles saved as standalone files, this is for storing data about it like age)
-- id here is not important
CREATE TABLE IF NOT EXISTS `shg_user_saves` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `save_slot` INT DEFAULT 1,
  `file_ref` VARCHAR(16) NOT NULL,
  `save_name` VARCHAR(32),
  `save_hms` VARCHAR(32),
  `updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `tbl_users`(`id`) ON DELETE CASCADE
);

ALTER TABLE shg_user_saves ADD COLUMN IF NOT EXISTS save_slot INT DEFAULT 1;
ALTER TABLE shg_user_saves ADD COLUMN IF NOT EXISTS file_ref VARCHAR(16) NOT NULL;
ALTER TABLE shg_user_saves ADD COLUMN IF NOT EXISTS save_name VARCHAR(32);
ALTER TABLE shg_user_saves ADD COLUMN IF NOT EXISTS save_hms VARCHAR(32);
ALTER TABLE shg_user_saves ADD COLUMN IF NOT EXISTS updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- user activity / playercount table
-- it is its own thing because we want to know active players for this game, not Balnoom accounts overall
CREATE TABLE IF NOT EXISTS `shg_user_activity` (
  `user_id` INT PRIMARY KEY,
  `last_activity` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `tbl_users`(`id`) ON DELETE CASCADE
);