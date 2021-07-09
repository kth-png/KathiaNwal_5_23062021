//Fonction création d'un nouvel élément dans le DOM
function createNode(element) {
  return document.createElement(element)
}
//Fonction nest d'un élément "el" à l'élément "parent"
function append(parent, el) {
  return parent.appendChild(el)
}

const ul = document.getElementById('furnitures')
const url = 'http://localhost:3000/api/furniture'
//Call API 
fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    let furnitures = data
    console.log(furnitures)
    //Pour chaque furniture dans furnitures, on créer un élément de liste qui retourne <img>, "name" et "price" correspondant
    return furnitures.map(function (furniture) {
      let li = createNode('li')
      let img = createNode('img')
      let span = createNode('span')
      img.src = furniture.imageUrl
      span.innerHTML = `${furniture.name} prix : ${furniture.price} €`
      append(li, img)
      append(li, span)
      append(ul, li)
      span.style.fontWeight = 'bold'
    })
  })
  //on enregistre les erreurs potentielles sur la console
  .catch(function (error) {
    console.log(error)
  })
