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
 -- ---
 -- Globals
 -- ---

 -- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
 -- SET FOREIGN_KEY_CHECKS=0;

 -- ---
 -- Table 'pokemon'
 --
 -- ---

 DROP TABLE IF EXISTS `pokemon`;

 CREATE TABLE `pokemon` (
   `id` INTEGER NOT NULL,
   `name` VARCHAR(20) NOT NULL DEFAULT 'NULL',
   `url` VARCHAR(200) NOT NULL,
   PRIMARY KEY (`id`)
 );

 -- ---
 -- Table 'moves'
 --
 -- ---

 DROP TABLE IF EXISTS `moves`;

 CREATE TABLE `moves` (
   `id` INTEGER NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(30) NULL DEFAULT NULL,
   `damage_class` VARCHAR(20) NOT NULL,
   `power` INTEGER NULL DEFAULT NULL,
   `accuracy` INTEGER NOT NULL,
   `type` VARCHAR(20) NOT NULL,
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

 ALTER TABLE `pokemon_moves` ADD FOREIGN KEY (id_pokemon) REFERENCES `pokemon` (`id`);
 ALTER TABLE `pokemon_moves` ADD FOREIGN KEY (id_moves) REFERENCES `moves` (`id`);

 -- ---
 -- Table Properties
 -- ---

 -- ALTER TABLE `pokemon` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 -- ALTER TABLE `moves` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
 -- ALTER TABLE `pokemon_moves` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

 -- ---
 -- Test Data
 -- ---

 -- INSERT INTO `pokemon` (`id`,`name`,`url`) VALUES
 -- ('','','');
 -- INSERT INTO `moves` (`id`,`name`,`damage_class`,`power`,`accuracy`,`type`) VALUES
 -- ('','','','','','');
 -- INSERT INTO `pokemon_moves` (`id`,`id_pokemon`,`id_moves`) VALUES
 -- ('','','');
