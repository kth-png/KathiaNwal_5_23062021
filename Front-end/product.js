//récupération de la chaine de caractère dans l'url
const queryString = window.location.search

//extraction de l'id
const urlSearchParams = new URLSearchParams(queryString)
const myId = urlSearchParams.get('id')
//test récupération id
//console.log(myId)

//récupération de l'URL de l'API

const productUrl = `http://localhost:3000/api/furniture/${myId}`
//console.log(productUrl)

//récupération des données du produit sélectionné
fetch(productUrl)
  .then((res) => res.json())
  .then(function (datas) {
    //Création des éléments pour afficher les données récupérées
    let article = document.querySelector('#article')
    article.classList.add('container', 'mt-5', 'center')

    let divTitle = createNode('div')
    divTitle.classList.add('divTitle')
    append(article, divTitle)

    let title = createNode('h2')
    append(divTitle, title)
    title.innerHTML = datas.name

    let divImg = createNode('div')
    divImg.classList.add('divImg', 'artMedia')
    append(article, divImg)

    let img = createNode('img')
    img.classList.add('img-display')
    append(divImg, img)
    img.src = datas.imageUrl
    img.height = '350'
    img.width = '350'

    let divPers = createNode('div')
    divPers.classList.add('divPers')
    append(divImg, divPers)

    let artDes = createNode('p')
    append(divPers, artDes)
    artDes.innerHTML = datas.description

    //Création du formulaire
    let formOrder = createNode('form')
    append(divPers, formOrder)

    let divFin = createNode('div')
    divFin.classList.add('select')
    append(formOrder, divFin)

    let label = createNode('label')
    label.setAttribute('for', 'perso')
    label.innerHTML = 'Choisissez une finition'
    append(divFin, label)

    let artPers = createNode('select')
    artPers.setAttribute('id', 'perso')
    artPers.setAttribute('name', 'varnish')
    let artPersArr = datas.varnish
    append(divFin, artPers)

    //Boucle d'implémentation des options de finition
    for (let i = 0; i < artPersArr.length; i++) {
      let persChoice = createNode('option')
      append(artPers, persChoice)
      persChoice.innerHTML = artPersArr[i]
    }

    let divQty = createNode('div')
    divQty.classList.add('select')
    append(formOrder, divQty)

    let labelQty = createNode('label')
    labelQty.setAttribute('for', 'qty')
    labelQty.innerHTML = 'Quantité'
    append(divQty, labelQty)

    let choice = createNode('select')
    choice.setAttribute('id', 'choice')
    choice.setAttribute('name', 'choices')
    append(divQty, choice)

    //Boucle de création des options de quantité
    for (let i = 1; i <= 10; i += 1) {
      let qtyArr = i
      let qtyChoice = createNode('option')
      append(choice, qtyChoice)
      qtyChoice.innerHTML = qtyArr
    }

    let divPrice = createNode('div')
    divPrice.classList.add('divPrice')
    append(formOrder, divPrice)

    let price = createNode('h3')
    append(divPrice, price)

    //Affichage du prix en euro, arrondi à l'entier supérieur
    price.innerHTML = `${Math.ceil(datas.price / 100)} €`

    let unit = createNode('span')
    append(divPrice, unit)
    unit.classList.add('unit')
    unit.innerHTML = "Prix à l'unité"

    //créer le bouton ajouter au panier
    let button = createNode('button')
    append(formOrder, button)
    button.setAttribute('id', 'addBasket')
    button.innerHTML = 'Ajouter au panier'
    //écouter et ajouter au panier
    let btnAdd = document.querySelector('#addBasket')
    btnAdd.addEventListener('click', (event) => {
      event.preventDefault()
      const choiceForm = artPers.value
      const quantiteSelect = choice.value

      //mettre le choix de l'utilsateur dans une variable
      let productOptions = {
        productName: datas.name,
        myId,
        optionSelected: choiceForm,
        quantity: quantiteSelect,
        price: (datas.price / 100),
      }

      //---------------Local storage---------------
      let productSaveInLocalStorage = JSON.parse(
        localStorage.getItem('produit'),
      )
      //fonction ajout de produits sélectionnés au local storage
      const addLocalStorage = () => {
        productSaveInLocalStorage.push(productOptions)
        localStorage.setItem(
          'produit',
          JSON.stringify(productSaveInLocalStorage),
        )
      }
      //fonction message de confirmation
      const confirmMessage = () => {
        if (
          window.confirm(`Votre sélection: ${quantiteSelect} ${datas.name} option: ${choiceForm}, a été ajoutée au panier
                [OK] voir le panier
                [ANNULER] continuer votre shopping`)
        ) {
          window.location.href = 'bag.html'
        }
      }
      if (productSaveInLocalStorage) {
        addLocalStorage()
        confirmMessage()
      } else {
        productSaveInLocalStorage = []
        addLocalStorage()
        confirmMessage()
      }
    })
    //Modifier le titre de la page en fonction du produit sélectionné
    let pageTitle = document.querySelector('title')
    pageTitle.innerHTML = `OriFurnit : ${datas.name}`
    console.log(pageTitle.innerHTML)
  })
  .catch(function (error) {
    console.log(error)
  })
