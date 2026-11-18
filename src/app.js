const formulaire = document.getElementById("form-intervention");
const liste = document.getElementById("liste-interventions");
const champEquipement = document.getElementById("equipement");
const champTechnicien = document.getElementById("technicien");
const champDate = document.getElementById("date");

const CLE_STOCKAGE = "interventions";

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

function afficherInterventions() {
    liste.innerHTML = "";
    interventions.forEach(function (intervention) {
        const element = document.createElement("li");
        element.textContent = intervention.date + " - " + intervention.equipement
            + " (technicien : " + intervention.technicien + ")";
        liste.appendChild(element);
    });
}

formulaire.addEventListener("submit", function (evenement) {
    evenement.preventDefault();

    interventions.push({
        id: Date.now(),
        equipement: champEquipement.value.trim(),
        technicien: champTechnicien.value.trim(),
        date: champDate.value
    });

    sauvegarderInterventions();
    afficherInterventions();
    formulaire.reset();
});

afficherInterventions();