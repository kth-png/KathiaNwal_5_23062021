const page = "produit.html";
const ul = document.getElementById("furnitures");
let url = "http://localhost:3000/api/furniture";

//Call API pour récupérer tous les articles

fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    let furnitures = data;
    //Boucle de récupération des données
    for (let f = 0; f < furnitures.length; f++) {
      //création des éléments pour afficher les données
      let link = createNode("a");
      link.href = `${page}?id=${furnitures[f]._id}`;
      link.classList.add("fig-width");
      append(ul, link);
      let figure = createNode("figure");
      figure.classList.add("home-figure");
      link.addEventListener("click", (ev) => {
        ev.stopPropagation();
      });

      figure.setAttribute("id", `"${furnitures[f]._id}"`);
      append(link, figure);

      let img = createNode("img");
      img.classList.add("card-img-top");
      append(figure, img);
      img.src = furnitures[f].imageUrl;

      //Modification de la taille des images
      img.height = "280";
      img.width = "325";

      let figcaption = createNode("figcaption");
      figcaption.classList.add("article-info");
      append(figure, figcaption);

      let p = createNode("p");
      p.classList.add("card-title");
      append(figcaption, p);
      p.innerHTML = furnitures[f].name;

      let span = createNode("span");
      span.classList.add("card-text");
      append(figcaption, span);
      span.innerHTML = `${Math.ceil(furnitures[f].price / 100)} €`;

      // création d'un bouton pour ajouter l'article au panier directement de la page d'accueil
      let homeAddToCart = createNode("button");
      homeAddToCart.classList.add("btn-add-to-cart");
      append(figure, homeAddToCart);
      homeAddToCart.innerHTML = "Ajouter au panier";
      homeAddToCart.addEventListener("click", (e) => {
        e.preventDefault();
        // Mettre la selection dans une variable
        let selectFromHomepage = {
          productName: furnitures[f].name,
          myId: furnitures[f]._id,
          optionSelected: furnitures[f].varnish[0],
          quantity: 1,
          price: furnitures[f].price / 100,
        };
        //---------------Local storage---------------

        //fonction message de confirmation
        const confirmMessage = () => {
          if (
            window.confirm(`Votre sélection: ${selectFromHomepage.quantity} ${furnitures[f].name} option: ${selectFromHomepage.optionSelected}, a été ajoutée au panier
                [OK] voir le panier
                [ANNULER] continuer votre shopping`)
          ) {
            window.location.href = "bag.html";
          }
        };
        if (productSaveInLocalStorage != null) {
          addLocalStorage(selectFromHomepage);
          confirmMessage();
        } else {
          productSaveInLocalStorage = [];
          addLocalStorage(selectFromHomepage);
          confirmMessage();
        }
      });
    }
  })
  //Message d'erreur
  .catch(function (error) {
    console.log(error);
    const errorPage = "404.html";
    window.location = errorPage;
  });
