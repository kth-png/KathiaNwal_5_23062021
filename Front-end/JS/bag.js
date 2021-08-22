let nBag = document.querySelector("#product-info");
let totalToPay = document.querySelector("#totalToPay");

//si le panier est vide afficher le panier est vide
if (
  productSaveInLocalStorage === null ||
  productSaveInLocalStorage.length == 0
) {
  localStorage.removeItem("produit");
  localStorage.removeItem("totalPrice");
  const panierVide = `
    <div id="product-infos" class="product-infos empty">
    <div> Le panier est vide <div>
    </div>
    `;
  nBag.innerHTML = panierVide;
  totalToPay.innerHTML = null;
  document.getElementById("totalToPay").style.display = "none";
  document.getElementById("product-info").style.marginBottom = "0";
  document.getElementById("product-infos").style.marginBottom = "0";
}

//sinon afficher le contenu du localstorage
else {
  let bagLayout = [];
  for (j = 0; j < productSaveInLocalStorage.length; j++) {
    let container = document.querySelector("#container-product-bag");

    let info = createNode("div");
    append(container, info);
    info.classList.add("product-infos");

    let productInBagName = createNode("p");
    append(info, productInBagName);
    productInBagName.classList.add("name");
    productInBagName.setAttribute("id", "linkToProductPage");
    productInBagName.innerHTML = productSaveInLocalStorage[j].productName;

    //ajouter un lien vers la page de l'article sélectionné
    const productPageRedirection = `produit.html?id=${productSaveInLocalStorage[j].myId}`;
    productInBagName.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location = productPageRedirection;
    });

    let productInBagOption = createNode("p");
    append(info, productInBagOption);
    productInBagOption.classList.add("option");
    productInBagOption.innerHTML = productSaveInLocalStorage[j].optionSelected;

    let productInBagQty = createNode("p");
    append(info, productInBagQty);
    productInBagQty.innerHTML = productSaveInLocalStorage[j].quantity;

    let productInBagPrice = createNode("p");
    append(info, productInBagPrice);
    productInBagPrice.classList.add("price");

    //calcul du prix total par article et affichage dans la page panier
    productInBagPrice.innerHTML = `${
      productSaveInLocalStorage[j].price * productSaveInLocalStorage[j].quantity
    } €`;
    let pricesInBag =
      productSaveInLocalStorage[j].price *
      productSaveInLocalStorage[j].quantity;
    bagLayout.push(pricesInBag);

    //calcul du prix total du panier et affichage dans la page panier
    let sum = 0;
    for (let l = 0; l < bagLayout.length; l++) {
      sum += bagLayout[l];
      localStorage.setItem("totalPrice", JSON.stringify(sum));
    }
    let totalPrice = document.querySelector(".totalPrice");
    totalPrice.innerHTML = `${sum} €`;

    //écoute du bouton vider le panier et suppression du panier
    const clearCart = document.querySelector(".deleteAll");
    clearCart.addEventListener("click", (del) => {
      del.stopPropagation();
      del.preventDefault();
      localStorage.clear();
      location.reload();
    });

    //création et écoute du bouton pour supprimer un article du panier
    //?récupération de l'index de l'objet sélectionné
    let productInCartIndex = productSaveInLocalStorage.indexOf(
      productSaveInLocalStorage[j]
    );
    let btnBag = createNode("button");
    append(info, btnBag);
    btnBag.classList.add("btn-bag");
    btnBag.innerHTML = "Supprimer";
    btnBag.addEventListener("click", (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      productSaveInLocalStorage.splice(productInCartIndex, 1);
      localStorage.setItem(
        "produit",
        JSON.stringify(productSaveInLocalStorage)
      );
      location.reload();
    });
  }
}

//Affichage du formulaire de validation de commande
//selection de l'élément du DOM où s'affichera le formulaire
const positionElement = document.querySelector("main");
const displayValidationForm = () => {
  const formStructure = `
  <div class="div-order-form" id="formOrder">
  <h3>Remplissez le formulaire pour valider la commande</h3>
  <form action="" id="form1" class="formDetails">
  <div class="validation-input"><label for="firstName">Prénom :</label>
  <input type="text" name="prénom" id="firstName" value="Votre prénom" required></div>

  <div class="validation-input"><label for="name">Nom :</label>
  <input type="text" name="nom" id="lastName" value="Votre nom" required></div>

  <div class="validation-input"><label for="mobile">Téléphone :</label>
  <input type="tel" name="mobile" id="telephone" value="Votre numéro de téléphone"></div>

  <div class="validation-input"><label for="address" name="adresse">Adresse de livraison :</label>
  <textarea name="adresse" id="address" value="Votre adresse" cols="30" rows="5"></textarea></div>

  <div class="validation-input"><label for="city">Ville :</label>
  <input type="text" name="ville" id="city" value="Ville" required></div>

  <div class="validation-input"><label for="email">E-mail :</label>
  <input type="email" name="email" id="email" value="Votre adresse mail" required></div>

  <div class="validation-input"><label for="deliveryDate">Date de livraison souhaitée :</label>
  <input type="date" name="deliveryDate" id="deliveryDate"></div>

  <button class="submitButton" form="form1" type="submit">Commander</button>
</form>
</div>`;

  //injection du HTML
  positionElement.insertAdjacentHTML("beforeend", formStructure);
};

if (
  productSaveInLocalStorage == null ||
  productSaveInLocalStorage.length == 0
) {
  if (
    window.confirm(`Votre panier est vide!!!!!
  [OK] Retourner à la page d'accueil
  [ANNULER] Ne rien faire`)
  ) {
    window.location = "index.html";
  }
} else {
  displayValidationForm();
  //récupération du bouton commander
  const btnOrder = document.querySelector(".submitButton");
  btnOrder.addEventListener("click", (f) => {
    f.preventDefault();
    f.stopPropagation();

    //mettre les infos de l'utilisateur dans une variable
    const userInfos = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      telephone: document.querySelector("#telephone").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value,
      deliveryDate: document.querySelector("#deliveryDate").value,
    };
    /***************************Validation du formulaire***********************************/

    //Controle de la validité du nom et du prénom saisi par l'utilisateur
    const regexNameFirstname = (value) => {
      return /^[a-zA-Z\s*-]{3,20}$/.test(value);
    };
    function nameControl() {
      const userName = userInfos.lastName;
      if (regexNameFirstname(userName)) {
        return true;
      } else {
        alert(
          "Le nom doit contenir minimum 3 caractères et ne doit pas dépasser 20 caractères \n Les chiffres et les symnboles ne sont pas autorisés"
        );
        return false;
      }
    }

    function firstnameControl() {
      const userFirstname = userInfos.firstName;
      if (regexNameFirstname(userFirstname)) {
        return true;
      } else {
        alert(
          "Le prénom doit contenir minimum 3 caractères et ne doit pas dépasser 20 caractères \n Les chiffres et les symboles ne sont pas autorisés"
        );
        return false;
      }
    }

    function cityControl() {
      const userCity = userInfos.city;
      if (regexNameFirstname(userCity)) {
        return true;
      } else {
        alert(
          "La ville doit contenir minimum 3 caractères et ne doit pas dépasser 20 caractères \n Les chiffres et les symboles ne sont pas autorisés"
        );
        return false;
      }
    }

    //controle de la validité de l'adresse mail saisie
    const regexEmail = (mail) => {
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      );
    };
    function emailControl() {
      const userEmail = userInfos.email;
      if (regexEmail(userEmail)) {
        return true;
      } else {
        alert("l'adresse mail saisie est invalide");
        return false;
      }
    }

    //controle de la validité du numéro de téléphone
    const regexPhoneNumber = (phonenb) => {
      return /^(01|02|03|04|05|06|08|09)[0-9]{8}/gi.test(phonenb);
    };
    function phonenbControl() {
      const userPhonenb = userInfos.telephone;
      if (regexPhoneNumber(userPhonenb)) {
        return true;
      } else {
        alert(
          "Le numéro de téléphone saisi est invalide \n Veuillez renseigner votre numéro de téléphone français, sans espace et sans symbole de séparation"
        );
        return false;
      }
    }

    //controle de la validité de l'adresse
    const regexAddress = (address) => {
      return /^\d+\s[A-z]+\s[A-z]+/g.test(address);
    };
    function adressControl() {
      const userAddress = userInfos.address;
      if (regexAddress(userAddress)) {
        return true;
      } else {
        alert(
          "Adresse invalide, veuillez saisir une adresse valide \nNuméro suivi du type de la voie et du nom de la voie \nex.: 4 rue Lasègue"
        );
        return false;
      }
    }

    //envoyer les userInfos dans le localStorage si les données saisies sont valides
    if (
      nameControl() &&
      firstnameControl() &&
      cityControl() &&
      emailControl() &&
      phonenbControl() &&
      adressControl()
    ) {
      localStorage.setItem("userInfos", JSON.stringify(userInfos));
      //mettre les produits et les infos du clients présents dans le local storage dans un objet en vue de les envoyer au serveur
      let contact = userInfos;
      const orderFurniture = {
        contact,
        products,
      };

      //envoyer  au serveur

      fetch("http://localhost:3000/api/furniture/order", {
        method: "POST",
        body: JSON.stringify(orderFurniture),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response2) => {
          console.log("response2");
          console.log(response2);
          localStorage.setItem("orderId", response2.orderId);
          
          //supprimer le panier
          localStorage.removeItem('produit')

          //Rediriger l'utilisateur vers la page de confirmation lorsque toutes les infos sont correctes
          window.location = "confirmation.html";

          
        })
        .catch((error) => console.log(error));
    }
  });
  if (dataLocalStorage != null) {
    fillWithDatasInLocalStorage("firstName");
    fillWithDatasInLocalStorage("lastName");
    fillWithDatasInLocalStorage("email");
    fillWithDatasInLocalStorage("telephone");
    fillWithDatasInLocalStorage("city");
    fillWithDatasInLocalStorage("address");
    fillWithDatasInLocalStorage("deliveryDate");
  }
}
