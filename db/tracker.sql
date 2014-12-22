CREATE DATABASE tracker;

USE tracker;

CREATE TABLE IF NOT EXISTS `path` (
  id int(11) NOT NULL AUTO_INCREMENT,
  json longtext NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `path` (`id`, `json`) VALUES
(1, '[{"lat" : "58", "lng" : 16},{"lat" : "58", "lng" : 16.1}]'),
(2, '[{"lat" : "58.1", "lng" : 16.2},{"lat" : "58.1", "lng" : 16.3}]');