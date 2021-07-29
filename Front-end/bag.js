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
   /* bagLayout =
      bagLayout +
      `
    <div class="recap">
        <div> ${productSaveInLocalStorage[j].productName} ${productSaveInLocalStorage[j].optionSelected} ${productSaveInLocalStorage[j].prix} € </div>
    </div>
    `*/
   // if (j === productSaveInLocalStorage.length) {
       let container = document.querySelector("#container-product-bag")
       let info = createNode("div")
       append(container, info)
       info.classList.add("product-infos")
        let productInBagName = createNode("p")
        append(info, productInBagName)
        productInBagName.classList.add("name")
        productInBagName.innerHTML = productSaveInLocalStorage[j].productName
        let productInBagOption = createNode("p")
        append(info, productInBagOption)
        productInBagOption.classList.add("option")
        productInBagOption.innerHTML = productSaveInLocalStorage[j].optionSelected
       let productInBagQty = createNode("p")
       append(info, productInBagQty)
       productInBagQty.innerHTML = productSaveInLocalStorage[j].quantity
        let productInBagPrice = createNode("p")
        append(info, productInBagPrice)
        productInBagPrice.classList.add("price")
        productInBagPrice.innerHTML = `${productSaveInLocalStorage[j].price} €`
   // }
  }
}
