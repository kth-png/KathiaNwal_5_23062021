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
          .then((resp) => resp.json())
          .then(function (data) {
            //Création des éléments pour afficher les données récupérées
            let article = document.querySelector('#article')
            article.classList.add('container', 'mt-5', 'center')

            let divTitle = createNode('div')
            divTitle.classList.add('divTitle')
            append(article, divTitle)

            let title = createNode('h2')
            append(divTitle, title)
            title.innerHTML = data.name

            let divImg = createNode('div')
            divImg.classList.add('divImg', 'artMedia')
            append(article, divImg)

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
        

