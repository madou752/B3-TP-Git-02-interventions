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
        date: champDate.value
    });

    sauvegarderInterventions();
    afficherInterventions();
    formulaire.reset();
});

afficherInterventions();