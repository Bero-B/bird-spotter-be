const format = require('pg-format');
const db = require('../connection');

const seed = ({userData}) => {
  return db.query(`DROP TABLE IF EXISTS caughtBirds;`)
  .then(() => {
    return db.query(`DROP TABLE IF EXISTS birds;`)
  })
  .then(() => {
    return db.query(`DROP TABLE IF EXISTS users;`)
  })
  .then(() => {
    return db.query(`CREATE TABLE users (
      username VARCHAR PRIMARY KEY NOT NULL,
      email VARCHAR NOT NULL,
      points INT DEFAULT 0 NOT NULL
      );`)
  })
  .then(() => {
    return db.query(`CREATE TABLE birds (
      bird_id SERIAL PRIMARY KEY,
      species VARCHAR NOT NULL,
      description VARCHAR NOT NULL
      );`)
    })
  .then(() => {
    return db.query(`CREATE TABLE caughtBirds (
      caughtBird_id SERIAL PRIMARY KEY,
      bird_id INT NOT NULL REFERENCES birds(bird_id),
      username VARCHAR NOT NULL REFERENCES users(username),
      location POINT NOT NULL
      )`)
  })
  .then(() => {
    const formattedUserData = userData.map(({username, email, points }) => [username, email, points])
    const insertUsersData = format(`INSERT INTO users (username, email, points) VALUES %L`, formattedUserData)
    return db.query(insertUsersData)
  })
};

module.exports = seed;
