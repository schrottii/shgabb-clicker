-- server ID (1, 2, 3) ~ acc_name ~ acc_password ~ extras (including: ingame_name, ingame_id & other relevant things) ~ save

-- general user table (main table)
CREATE TABLE IF NOT EXISTS `tbl_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `acc_name` VARCHAR(32) NOT NULL UNIQUE,
  `acc_password` VARCHAR(255) NOT NULL,

  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- cloud save table (actual savefiles saved as standalone files)
CREATE TABLE IF NOT EXISTS `tbl_user_saves` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `save_slot` INT DEFAULT 1,
  `savefile_ref` VARCHAR(64) NOT NULL,
  `updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `tbl_users`(`id`) ON DELETE CASCADE
);

-- user activity / playercount table
CREATE TABLE IF NOT EXISTS `tbl_user_activity` (
  `user_id` INT PRIMARY KEY,
  `last_activity` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `tbl_users`(`id`) ON DELETE CASCADE
);