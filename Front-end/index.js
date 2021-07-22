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

//Call API

fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    let furnitures = data
    //Boucle de récupération des données
    for (furniture of furnitures) {
      //création des éléments pour afficher les données
      let figure = createNode('figure')
      figure.classList.add('card', 'fig-width')
      append(ul, figure)
      let given_id = furniture._id
      figure.addEventListener('click', function (e) {
        
        urlId = `http://localhost:3000/api/furniture/${given_id}`
        
        fetch(urlId)
          .then((resp) => resp.json())
          .then(function (data) {
            let container = document.querySelector('#main')
            let artContainer = createNode("main")
            let body = document.querySelector('body')
            body.replaceChild(artContainer, container)

            let div = createNode('div')
            append(artContainer, div)
            div.classList.add('container', 'mt-5')

            let title = createNode('h2')
            append(div, title)
            title.innerHTML = data.name

            let idNum = createNode('span')
            append(div, idNum)
            idNum.innerHTML = data._id

            let img = createNode('img')
            img.classList.add('img-display')
            append(div, img)
            img.src = data.imageUrl

            let artDes = createNode('p')
            append(div, artDes)
            artDes.innerHTML = data.description

            let choice = createNode('select')
            append(div, choice)

            let qtyChoice = createNode('option')
            append(choice, qtyChoice)

            let artPers = createNode('select')
            append(div, artPers)

            let persChoice = createNode('option')
            append(artPers, persChoice)

            let price = createNode('h3')
            append(div, price)
            price.innerHTML = `${Math.ceil(data.price/1000)}€`
          })
          .catch(function (error) {
            alert(error)
          })
          console.log(urlId)
      })

      let img = createNode('img')
      img.classList.add('card-img-top')
      append(figure, img)
      img.src = furniture.imageUrl

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
