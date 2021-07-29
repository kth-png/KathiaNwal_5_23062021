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
let url = 'http://localhost:3000/api/furniture'

//Call API pour récupérer tous les articles

fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    let furnitures = data
    //Boucle de récupération des données
    for (furniture of furnitures) {
      //création des éléments pour afficher les données
      let link = createNode("a")
      link.href = `${page}?id=${furniture._id}`
      link.classList.add('fig-width')
      append(ul, link)
      let figure = createNode('figure')
      
      figure.setAttribute("id",`"${furniture._id}"`)
      append(link, figure)
      
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
      span.innerHTML = `${Math.ceil(furniture.price / 100)} €`
    }
  })
  //Message d'erreur
  .catch(function (error) {
    console.log(error)
  })
