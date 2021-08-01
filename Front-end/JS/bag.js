//Stockage du contenu du local storage dans une variable productSaveInLocalStorage
let productSaveInLocalStorage = JSON.parse(localStorage.getItem('produit'))

let nBag = document.querySelector('#product-info')
//si le panier est vide afficher le panier est vide
if (productSaveInLocalStorage === null) {
  const panierVide = `
    <div class="product-infos">
    <div> Le panier est vide <div>
    </div>
    `
  nBag.innerHTML = panierVide
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
    productInBagOption.innerHTML = '-'

    let productInBagQty = createNode('p')
    append(info, productInBagQty)
    productInBagQty.innerHTML = 1

    let productInBagPrice = createNode('p')
    append(info, productInBagPrice)
    productInBagPrice.classList.add('price')
    productInBagPrice.innerHTML = `${productSaveInLocalStorage[j].price} €`
    let pricesInBag = productSaveInLocalStorage[j].price
    bagLayout.push(pricesInBag)
    let sum = 0
    for (let l = 0; l < bagLayout.length; l++) {
      sum += bagLayout[l]
    }
    let totalPrice = document.querySelector('.totalPrice')
    totalPrice.innerHTML = `${sum} €`

    let btnBagDelete = createNode('button')
    append(info, btnBagDelete)
    btnBagDelete.classList.add('btn-bag-delete')
    btnBagDelete.innerHTML = 'Supprimer'
    //écoute du bouton supprimer et suppression de l'article sélectionné du panier
   /* btnBagDelete.addEventListener('click', () => {
      let cartArr = JSON.parse(localStorage.produit)
      let btnDeleteItem = document.querySelectorAll('.btn-bag-delete')

    })*/
  }
}
