//Message à afficher en cas d'erreur
const errorDiv = document.querySelector("#error");
errorDiv.innerHTML =
  "Toutes nos excuses <br> <br> Les données de la page demandée sont inaccessibles pour le moment <br> <br> Veuillez réessayer dans un instant.";

//tentative de reconnexion à la page d'acceuil toutes les 5 minutes
setTimeout(() => {
  window.location = "index.html";
}, 300000);
