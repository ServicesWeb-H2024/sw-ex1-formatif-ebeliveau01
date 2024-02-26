const sql = require("../config/db.js");

const NetflixSerie = function(netflix_serie) {
    this.show_id = netflix_serie.show_id;
    this.show_type = netflix_serie.show_type;
    this.title = netflix_serie.title;
    this.director = netflix_serie.director;
    this.actors = netflix_serie.actors;
    this.country = netflix_serie.country;
    this.date_added = netflix_serie.date_added;
    this.release_year = netflix_serie.release_year;
    this.rating = netflix_serie.rating;
    this.duration = netflix_serie.duration;
    this.listed_in = netflix_serie.listed_in;
    this.description = netflix_serie.description;
};
NetflixSerie.obtenirPageNetflix = (type,idMin,idMax) => {
    if (type == "film") {
        type = "Movie";
    }
    else if (type == "serie") {
        type = "TV Show";
    }

    return new Promise((resolve, reject) => {
        const requete = `SELECT show_id,title FROM netflix_titles WHERE show_type = ? and show_id between ? and ?`;
        const params = [type,idMin,idMax]

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                reject(erreur);
            }

            if (resultat.length != 0) {
                resolve(resultat);
            }
        });
    });
};

module.exports = NetflixSerie;