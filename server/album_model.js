const Pool = require("pg").Pool;

const pool = new Pool({
  user: "vinyl",
  host: "localhost",
  database: "vinyl",
  password: "vinyl",
  port: 5432,
});

const getAlbums = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM albums ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const findAlbumsByArtist = (artist) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM albums WHERE artist LIKE $1",
      ["%" + artist + "%"],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const createAlbum = (body) => {
  return new Promise(function (resolve, reject) {
    const { artist, title, year, condition, thumb } = body;

    pool.query(
      "INSERT INTO albums (artist, title, year, condition, thumb) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [artist, title, year, condition, thumb],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(
          `A new album has been added added: ${JSON.stringify(results.rows[0])}`
        );
      }
    );
  });
};

const deleteAlbum = (albumId) => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(albumId);

    pool.query("DELETE FROM albums WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Album deleted with ID: ${id}`);
    });
  });
};

module.exports = {
  getAlbums,
  createAlbum,
  deleteAlbum,
  findAlbumsByArtist,
};
