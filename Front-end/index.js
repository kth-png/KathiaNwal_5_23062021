//Fonction création d'un nouvel élément dans le DOM
function createNode(element) {
  return document.createElement(element)
}
//Fonction nest d'un élément "el" à l'élément "parent"
function append(parent, el) {
  return parent.appendChild(el)
}
//Fonction de redirection
function redirect() {
  document.location.href = page
}
const page = 'produit.html'
const ul = document.getElementById('furnitures')
const url = 'http://localhost:3000/api/furniture'

//Call API pour récupérer tous les articles

fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    let furnitures = data
    //Boucle de récupération des données
    for (furniture of furnitures) {
      //création des éléments pour afficher les données
      let figure = createNode('figure')
      figure.classList.add('fig-width')
      append(ul, figure)
      let given_id = furniture._id
      figure.addEventListener('click', function (e) {
        urlId = `http://localhost:3000/api/furniture/${given_id}`

        //CALL API pour récupérer chaque article individuellement
        fetch(urlId)
          .then((resp) => resp.json())
          .then(function (data) {
            //Création des éléments pour afficher les données récupérées
            let container = document.querySelector('#main')
            let artContainer = createNode('main')
            let body = document.querySelector('body')
            //Remplacement d'un élément de la page d'acceuil par les nouveaux éléments crées
            body.replaceChild(artContainer, container)

            let div = createNode('div')
            append(artContainer, div)
            div.classList.add('container', 'mt-5', 'center')

            let divTitle = createNode('div')
            divTitle.classList.add('divTitle')
            append(div, divTitle)

            let title = createNode('h2')
            append(divTitle, title)
            title.innerHTML = data.name

            let idNum = createNode('span')
            append(divTitle, idNum)
            idNum.innerHTML = `ID Produit: ${data._id}`

            let divImg = createNode('div')
            divImg.classList.add('divImg', 'artMedia')
            append(div, divImg)

            let img = createNode('img')
            img.classList.add('img-display')
            append(divImg, img)
            img.src = data.imageUrl
            img.height = '350'
            img.width = '350'

            let divPers = createNode('div')
            divPers.classList.add('divPers')
            append(divImg, divPers)

            let artDes = createNode('p')
            append(divPers, artDes)
            artDes.innerHTML = data.description

            let divFin = createNode('div')
            divFin.classList.add('select')
            append(divPers, divFin)
            
            let label = createNode('label')
            label.setAttribute('for', 'perso')
            label.innerHTML = 'Choisissez une finition'
            append(divFin, label)

            let artPers = createNode('select')
            artPers.setAttribute('id', 'perso')
            artPers.setAttribute('name', 'varnish')
            let artPersArr = data.varnish
            append(divFin, artPers)
            //Boucle d'implémentation des options de finition
            for (let i = 0; i < artPersArr.length; i++) {
              let persChoice = createNode('option')
              append(artPers, persChoice)
              persChoice.innerHTML = artPersArr[i]
            }

            let divQty = createNode('div')
            divQty.classList.add('select')
            append(divPers, divQty)

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
            append(divPers, divPrice)

            let price = createNode('h3')
            append(divPrice, price)
            //Affichage du prix en euro, arrondi à l'entier supérieur
            price.innerHTML = `${Math.ceil(data.price / 1000)}€`

            let unit = createNode('span')
            append(divPrice, unit)
            unit.classList.add('unit')
            unit.innerHTML = "Prix à l'unité"
          })
          .catch(function (error) {
            alert(error)
          })
      })

      let img = createNode('img')
      img.classList.add('card-img-top')
      append(figure, img)
      img.src = furniture.imageUrl
      //Modification de la taille des images
      img.height = '280'
      img.width = '325'

      let figcaption = createNode('figcaption')
      figcaption.classList.add('article-info')
      append(figure, figcaption)

      let p = createNode('p')
      p.classList.add('card-title')
      append(figcaption, p)
      p.innerHTML = furniture.name

      let span = createNode('span')
      span.classList.add('card-text')
      append(figcaption, span)
      span.innerHTML = `${Math.ceil(furniture.price / 1000)} €`
    }
  })
  //Message d'erreur
  .catch(function (error) {
    alert(error)
  })
