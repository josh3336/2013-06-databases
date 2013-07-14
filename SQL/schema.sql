#CREATE DATABASE chat;

USE chatjosh;

CREATE TABLE messages (
  username varchar(15),
  message varchar(200)
);

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
