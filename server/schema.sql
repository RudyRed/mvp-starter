DROP DATABASE IF EXISTS pokedex;
--
CREATE DATABASE pokedex;
--
USE pokedex;
--
-- CREATE TABLE items (
--   id int NOT NULL AUTO_INCREMENT,
--   quantity integer NOT NULL,
--   description varchar(50) NOT NULL,
--   PRIMARY KEY (ID)
-- );

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

 -- ---
 -- Globals
 -- ---

 -- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
 -- SET FOREIGN_KEY_CHECKS=0;

 -- ---
 -- Table 'type'
 --
 -- ---
 -- ---
 -- Globals
 -- ---

 -- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
 -- SET FOREIGN_KEY_CHECKS=0;

 -- ---
 -- Table 'type'
 --
 -- ---
 -- ---
 -- Globals
 -- ---

 -- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
 -- SET FOREIGN_KEY_CHECKS=0;

 -- ---
 -- Table 'type'
 --
 -- ---
 -- ---
 -- Globals
 -- ---

 -- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
 -- SET FOREIGN_KEY_CHECKS=0;

 -- ---
 -- Table 'type'
 --
 -- ---

 DROP TABLE IF EXISTS `type`;

 CREATE TABLE `type` (
   `id` INTEGER NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(10) NOT NULL DEFAULT 'NULL',
   PRIMARY KEY (`id`)
 );

 -- ---
 -- Table 'weaknesses'
 --
 -- ---

 DROP TABLE IF EXISTS `weaknesses`;

 CREATE TABLE `weaknesses` (
   `id` INTEGER NOT NULL AUTO_INCREMENT,
   `id_attack_type` INTEGER NOT NULL,
   `id_defense_type` INTEGER NOT NULL,
   `immune` INT NOT NULL DEFAULT 0,
   PRIMARY KEY (`id`)
 );

 -- ---
 -- Table 'super_effective'
 --
 -- ---

 DROP TABLE IF EXISTS `super_effective`;

 CREATE TABLE `super_effective` (
   `id` INTEGER NOT NULL AUTO_INCREMENT,
   `id_attack_type` INTEGER NOT NULL,
   `id_defense_type` INTEGER NOT NULL,
   PRIMARY KEY (`id`)
 );

 -- ---
 -- Table 'pokemon'
 --
 -- ---

 DROP TABLE IF EXISTS `pokemon`;

 CREATE TABLE `pokemon` (
   `id` INTEGER NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(20) NOT NULL DEFAULT 'NULL',
   `url` VARCHAR(200) NOT NULL,
   PRIMARY KEY (`id`)
 );

 -- ---
 -- Foreign Keys
 -- ---

 ALTER TABLE `weaknesses` ADD FOREIGN KEY (id_attack_type) REFERENCES `type` (`id`);
 ALTER TABLE `weaknesses` ADD FOREIGN KEY (id_defense_type) REFERENCES `type` (`id`);
 ALTER TABLE `super_effective` ADD FOREIGN KEY (id_attack_type) REFERENCES `type` (`id`);
 ALTER TABLE `super_effective` ADD FOREIGN KEY (id_defense_type) REFERENCES `type` (`id`);

 -- ---
 -- Table Properties
 -- ---

 -- ALTER TABLE `type` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 -- ALTER TABLE `weaknesses` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 -- ALTER TABLE `super_effective` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 -- ALTER TABLE `pokemon` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

 -- ---
 -- Test Data
 -- ---

 -- INSERT INTO `type` (`id`,`name`) VALUES
 -- ('','');
 -- INSERT INTO `weaknesses` (`id`,`id_attack_type`,`id_defense_type`,`immune`) VALUES
 -- ('','','','');
 -- INSERT INTO `super_effective` (`id`,`id_attack_type`,`id_defense_type`) VALUES
 -- ('','','');
 -- INSERT INTO `pokemon` (`id`,`name`,`url`) VALUES
 -- ('','','');
