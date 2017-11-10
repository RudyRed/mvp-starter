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
   `id_primary_type` INTEGER NOT NULL,
   `id_secondary_type` INTEGER NULL DEFAULT NULL,
   `back_sprite` VARCHAR(200) NOT NULL DEFAULT 'NULL',
   `front_sprite` VARCHAR(200) NULL DEFAULT NULL,
   `pokedex_entry` VARCHAR(200) NULL DEFAULT NULL,
   `speed` INTEGER NOT NULL,
   `special_defense` INTEGER NOT NULL,
   `special_attack` INTEGER NOT NULL,
   `defense` INTEGER NOT NULL,
   `attack` INTEGER NOT NULL,
   `hp` INTEGER NOT NULL,
   PRIMARY KEY (`id`)
 );

 -- ---
 -- Table 'moves'
 --
 -- ---

 DROP TABLE IF EXISTS `moves`;

 CREATE TABLE `moves` (
   `id` INTEGER NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(20) NULL DEFAULT NULL,
   `damage_class` VARCHAR(20) NOT NULL,
   `power` INTEGER NULL DEFAULT NULL,
   `accuracy` INTEGER NOT NULL,
   `id_type` INTEGER NOT NULL,
   PRIMARY KEY (`id`)
 );

 -- ---
 -- Table 'pokemon_moves'
 --
 -- ---

 DROP TABLE IF EXISTS `pokemon_moves`;

 CREATE TABLE `pokemon_moves` (
   `id` INTEGER NOT NULL AUTO_INCREMENT,
   `id_pokemon` INTEGER NOT NULL,
   `id_moves` INTEGER NOT NULL,
   PRIMARY KEY (`id`)
 );

 -- ---
 -- Foreign Keys
 -- ---

 ALTER TABLE `weaknesses` ADD FOREIGN KEY (id_attack_type) REFERENCES `type` (`id`);
 ALTER TABLE `weaknesses` ADD FOREIGN KEY (id_defense_type) REFERENCES `type` (`id`);
 ALTER TABLE `super_effective` ADD FOREIGN KEY (id_attack_type) REFERENCES `type` (`id`);
 ALTER TABLE `super_effective` ADD FOREIGN KEY (id_defense_type) REFERENCES `type` (`id`);
 ALTER TABLE `pokemon` ADD FOREIGN KEY (id_primary_type) REFERENCES `type` (`id`);
 ALTER TABLE `pokemon` ADD FOREIGN KEY (id_secondary_type) REFERENCES `type` (`id`);
 ALTER TABLE `moves` ADD FOREIGN KEY (id_type) REFERENCES `type` (`id`);
 ALTER TABLE `pokemon_moves` ADD FOREIGN KEY (id_pokemon) REFERENCES `pokemon` (`id`);
 ALTER TABLE `pokemon_moves` ADD FOREIGN KEY (id_moves) REFERENCES `moves` (`id`);

 -- ---
 -- Table Properties
 -- ---

 -- ALTER TABLE `type` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 -- ALTER TABLE `weaknesses` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 -- ALTER TABLE `super_effective` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 -- ALTER TABLE `pokemon` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 -- ALTER TABLE `moves` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 -- ALTER TABLE `pokemon_moves` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

 -- ---
 -- Test Data
 -- ---

 -- INSERT INTO `type` (`id`,`name`) VALUES
 -- ('','');
 -- INSERT INTO `weaknesses` (`id`,`id_attack_type`,`id_defense_type`,`immune`) VALUES
 -- ('','','','');
 -- INSERT INTO `super_effective` (`id`,`id_attack_type`,`id_defense_type`) VALUES
 -- ('','','');
 -- INSERT INTO `pokemon` (`id`,`name`,`id_primary_type`,`id_secondary_type`,`back_sprite`,`front_sprite`,`pokedex_entry`,`speed`,`special_defense`,`special_attack`,`defense`,`attack`,`hp`) VALUES
 -- ('','','','','','','','','','','','','');
 -- INSERT INTO `moves` (`id`,`name`,`damage_class`,`power`,`accuracy`,`id_type`) VALUES
 -- ('','','','','','');
 -- INSERT INTO `pokemon_moves` (`id`,`id_pokemon`,`id_moves`) VALUES
 -- ('','','');
