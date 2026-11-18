const formulaire = document.getElementById("form-intervention");
const liste = document.getElementById("liste-interventions");
const champEquipement = document.getElementById("equipement");
const champTechnicien = document.getElementById("technicien");
const champDate = document.getElementById("date");
const champStatut = document.getElementById("statut");

const CLE_STOCKAGE = "interventions";
const STATUTS = ["À planifier", "En cours", "Terminée"];

let interventions = chargerInterventions();

function chargerInterventions() {
    try {
        return JSON.parse(localStorage.getItem(CLE_STOCKAGE)) || [];
    } catch (erreur) {
        return [];
    }
}

function sauvegarderInterventions() {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(interventions));
}

function creerSelectStatut(intervention) {
    const select = document.createElement("select");

    STATUTS.forEach(function (statut) {
        const option = document.createElement("option");
        option.value = statut;
        option.textContent = statut;
        select.appendChild(option);
    });

    // Les interventions enregistrées avant cette fonctionnalité n'ont pas de statut
    select.value = intervention.statut || STATUTS[0];

    select.addEventListener("change", function () {
        intervention.statut = select.value;
        sauvegarderInterventions();
    });

    return select;
}

function afficherInterventions() {
    liste.innerHTML = "";
    interventions.forEach(function (intervention) {
        const element = document.createElement("li");

        const texte = document.createElement("span");
        texte.textContent = intervention.date + " - " + intervention.equipement
            + " (technicien : " + intervention.technicien + ") ";

        element.appendChild(texte);
        element.appendChild(creerSelectStatut(intervention));
        liste.appendChild(element);
    });
}

formulaire.addEventListener("submit", function (evenement) {
    evenement.preventDefault();

    const equipement = champEquipement.value.trim();
    const technicien = champTechnicien.value.trim();

    if (equipement === "" || technicien === "") {
        alert("Veuillez renseigner l'equipement et le technicien.");
        return;
    }

    interventions.push({
        id: Date.now(),
        equipement: equipement,
        technicien: technicien,
        date: champDate.value,
        statut: champStatut.value
    });

    sauvegarderInterventions();
    afficherInterventions();
    formulaire.reset();
});

afficherInterventions();