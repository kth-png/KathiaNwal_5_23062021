//Fonction création d'un nouvel élément dans le DOM
function createNode(element) {
  return document.createElement(element)
}

//Fonction nest d'un élément "el" à l'élément "parent"
function append(parent, el) {
  return parent.appendChild(el)
}

//fonction ajout de produits sélectionnés au local storage
let productSaveInLocalStorage = JSON.parse(localStorage.getItem('produit'))
const addLocalStorage = (obj) => {
  productSaveInLocalStorage.push(obj)
  localStorage.setItem('produit', JSON.stringify(productSaveInLocalStorage))
}

//Remplir les champs du formulaire avec les données enregistrées dans le local storage
//transformer la chaine de caractère en objet javascript
const dataLocalStorage = JSON.parse(localStorage.getItem('userInfos'))

//fonction pour remplir les champs du formulaire avec les données stockées dans le local storage
function fillWithDatasInLocalStorage(key) {
  document.querySelector(`#${key}`).value = dataLocalStorage[key]
}
