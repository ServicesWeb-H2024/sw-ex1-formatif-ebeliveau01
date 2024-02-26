// À ajuster selon la structure
const NetflixSerie = require("../models/netflix-serie.model.js");

exports.obtenirPageNetflix = (req, res) => {
    const type_titre = req.params.type_titre;
    const page = req.query.page;

    if (type_titre != "film" && type_titre != "serie") {
        res.status(400).send({"erreur": `Le type ${type_titre} est invalide`});
        return;
    }

    if (page < 1 && typeof page == "string") {
        res.status(400).send({"erreur": "La page est invalide"});
    }

    const prochainPage = parseInt(page)+1;
    const prochainUrl = "/api/titres/"+type_titre+"?page="+prochainPage;

    NetflixSerie.obtenirPageNetflix(type_titre,(page-1)*10,page*10)
    .then((netflixSerie) => {
        if (netflixSerie.lenght == 0) {
            res.status(400).send({"erreur": "La page est invalide"});
        }

        res.status(200).send({
            "titres" : netflixSerie,
            "filtre" : type_titre,
            "page" : page,
            "url_page_suivante" : prochainUrl
        });
    })
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500).send({"erreur": `Echec lors de la récupération du des données avec le type ${type_titre}`});
    });
};