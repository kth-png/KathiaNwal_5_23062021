let nBag = document.querySelector('#product-info')
let totalToPay = document.querySelector('#totalToPay')

//si le panier est vide afficher le panier est vide
if (productSaveInLocalStorage === null) {
  const panierVide = `
    <div id="product-infos" class="product-infos empty">
    <div> Le panier est vide <div>
    </div>
    `
  nBag.innerHTML = panierVide
  totalToPay.innerHTML = null
  document.getElementById('totalToPay').style.display = 'none'
  document.getElementById('product-info').style.marginBottom = '0'
  document.getElementById('product-infos').style.marginBottom = '0'
}

//sinon afficher le contenu du localstorage
else {
  let bagLayout = []
  for (j = 0; j < productSaveInLocalStorage.length; j++) {
    let container = document.querySelector('#container-product-bag')

    let info = createNode('div')
    append(container, info)
    info.classList.add('product-infos')

    let productInBagName = createNode('p')
    append(info, productInBagName)
    productInBagName.classList.add('name')
    productInBagName.innerHTML = productSaveInLocalStorage[j].productName

    let productInBagOption = createNode('p')
    append(info, productInBagOption)
    productInBagOption.classList.add('option')
    productInBagOption.innerHTML = productSaveInLocalStorage[j].optionSelected

    let productInBagQty = createNode('p')
    append(info, productInBagQty)
    productInBagQty.innerHTML = productSaveInLocalStorage[j].quantity

    let productInBagPrice = createNode('p')
    append(info, productInBagPrice)
    productInBagPrice.classList.add('price')

    //calcul du prix total par article et affichage dans la page panier
    productInBagPrice.innerHTML = `${
      productSaveInLocalStorage[j].price * productSaveInLocalStorage[j].quantity
    } €`
    let pricesInBag =
      productSaveInLocalStorage[j].price * productSaveInLocalStorage[j].quantity
    bagLayout.push(pricesInBag)

    //calcul du prix total du panier et affichage dans la page panier
    let sum = 0
    for (let l = 0; l < bagLayout.length; l++) {
      sum += bagLayout[l]
      localStorage.setItem('totalPrice', JSON.stringify(sum))
    }
    let totalPrice = document.querySelector('.totalPrice')
    totalPrice.innerHTML = `${sum} €`

    //créer un bouton de redirection vers la page de l'article 
    let btnBag = createNode('button')
    append(info, btnBag)
    btnBag.classList.add('btn-bag')
    btnBag.innerHTML = "voir l'article"
    const productPageRedirection = `produit.html?id=${productSaveInLocalStorage[j].myId}`
    btnBag.addEventListener('click', () => {
      window.location.href = productPageRedirection
    })

    //écoute du bouton vider le panier et suppression du panier
    const clearCart = document.querySelector('.deleteAll')
    clearCart.addEventListener('click', (del) => {
      del.stopPropagation()
      del.preventDefault()
      localStorage.clear()
      location.reload()
    })
  }
}

//Affichage du formulaire de validation de commande
//selection de l'élément du DOM où s'affichera le formulaire
const positionElement = document.querySelector('main')
const displayValidationForm = () => {
  const formStructure = `
  <div class="div-order-form" id="formOrder">
  <h3>Remplissez le formulaire pour valider la commande</h3>
  <form action="" class="formDetails">
  <div class="validation-input"><label for="name">Nom :</label>
  <input type="text" name="nom" id="nom" value="Votre nom" required></div>

  <div class="validation-input"><label for="firstName">Prénom :</label>
  <input type="text" name="prénom" id="prenom" value="Votre prénom" required></div>

  <div class="validation-input"><label for="email">E-mail :</label>
  <input type="email" name="email" id="mail" value="Votre adresse mail" required></div>

  <div class="validation-input"><label for="mobile">Téléphone :</label>
  <input type="tel" name="mobile" id="telephone" value="Votre numéro de téléphone" required></div>

  <div class="validation-input"><label for="adresse" name="adresse">Adresse de livraison :</label>
  <textarea name="adresse" id="adresse" value="Votre adresse" cols="30" rows="5"></textarea></div>

  <div class="validation-input"><label for="deliveryDate">Date de livraison souhaitée :</label>
  <input type="date" name="deliveryDate" id="deliveryDate" required></div>

  <button class="submitButton">Commander</button>
</form>
</div>`

  //injection du HTML
  positionElement.insertAdjacentHTML('beforeend', formStructure)
}

if (productSaveInLocalStorage != null) {
  displayValidationForm()
  //récupération du bouton commander
  const btnOrder = document.querySelector('.submitButton')
  btnOrder.addEventListener('click', (f) => {
    f.preventDefault()
    f.stopPropagation()

    //mettre les infos de l'utilisateur dans une variable
    const userInfos = {
      nom: document.querySelector('#nom').value,
      prenom: document.querySelector('#prenom').value,
      mail: document.querySelector('#mail').value,
      telephone: document.querySelector('#telephone').value,
      adresse: document.querySelector('#adresse').value,
      deliveryDate: document.querySelector('#deliveryDate').value,
    }
    /***************************Validation du formulaire***********************************/

    //Controle de la validité du nom et du prénom saisi par l'utilisateur
    const regexNameFirstname = (value) => {
      return /^[a-zA-Z\s*-]{3,20}$/.test(value)
    }
    function nameControl() {
      const userName = userInfos.nom
      if (regexNameFirstname(userName)) {
        return true
      } else {
        alert(
          'Le nom doit contenir minimum 3 caractères et ne doit pas dépasser 20 caractères \n Les chiffres et les symnboles ne sont pas autorisés',
        )
        return false
      }
    }

    function firstnameControl() {
      const userFirstname = userInfos.prenom
      if (regexNameFirstname(userFirstname)) {
        return true
      } else {
        alert(
          'Le prénom doit contenir minimum 3 caractères et ne doit pas dépasser 20 caractères \n Les chiffres et les symboles ne sont pas autorisés',
        )
        return false
      }
    }

    //controle de la validité de l'adresse mail saisie
    const regexEmail = (mail) => {
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail,
      )
    }
    function emailControl() {
      const userEmail = userInfos.mail
      if (regexEmail(userEmail)) {
        return true
      } else {
        alert("l'adresse mail saisie est invalide")
        return false
      }
    }

    //controle de la validité du numéro de téléphone
    const regexPhoneNumber = (phonenb) => {
      return /^(01|02|03|04|05|06|08|09)[0-9]{8}/gi.test(phonenb)
    }
    function phonenbControl() {
      const userPhonenb = userInfos.telephone
      if (regexPhoneNumber(userPhonenb)) {
        return true
      } else {
        alert(
          'Le numéro de téléphone saisi est invalide \n Veuillez renseigner votre numéro de téléphone français, sans espace et sans symbole de séparation',
        )
        return false
      }
    }

    //controle de la validité de l'adresse
    const regexAdress = (adress) => {
      return /^\d+\s[A-z]+\s[A-z]+/g.test(adress)
    }
    function adressControl() {
      const userAdress = userInfos.adresse
      if (regexAdress(userAdress)) {
        return true
      } else {
        alert(
          'Adresse invalide, veuillez saisir une adresse valide \nNuméro suivi du type de la voie et du nom de la voie \nex.: 4 rue Lasègue',
        )
        return false
      }
    }

    //création d'un id de commande
    let uniqId = Math.random().toString(36).substring(2, 15)

    //envoyer les userInfos dans le localStorage si les données saisies sont valides
    if (
      nameControl() &&
      firstnameControl() &&
      emailControl() &&
      phonenbControl() &&
      adressControl()
    ) {
      localStorage.setItem('userInfos', JSON.stringify(userInfos))
      
      localStorage.setItem('uniqId', JSON.stringify(uniqId))

      //Rediriger l'utilisateur vers la page de confirmation lorsque toutes les infos sont correctes
      window.location.assign('confirmation.html')
    }

    //mettre les produits et les infos du clients présents dans le local storage dans un objet en vue de les envoyer au serveur
    const dataToServer = {
      productSaveInLocalStorage,
      userInfos,
      uniqId
    }
  
  })
   if (dataLocalStorage != null)
    {fillWithDatasInLocalStorage('nom')
    fillWithDatasInLocalStorage('prenom')
    fillWithDatasInLocalStorage('mail')
    fillWithDatasInLocalStorage('telephone')
    fillWithDatasInLocalStorage('adresse')
    fillWithDatasInLocalStorage('deliveryDate')}
}
