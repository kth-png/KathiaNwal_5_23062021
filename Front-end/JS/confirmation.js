// récupération des produits stockés dans le local storage
productSaveInLocalStorage = JSON.parse(localStorage.getItem("produit"))

// récupération des infos de l'utilisateur stockés dans le local storage
userInfos = JSON.parse(localStorage.getItem("userInfos"))

//récupération du prix total dans le local storage
totalPrice = JSON.parse(localStorage.getItem("totalPrice"))

//récupération de l'ID commande dans le local storage
orderId = localStorage.getItem("orderId")

//appeler l'emplacement d'affichage 
let confirmContainer = document.querySelector("#confirmContainer")

//afficher le message de remerciemment 
let message = createNode("p")
message.classList.add("confirmation-p")
append(confirmContainer, message)
message.innerHTML = `<span class="userName">${userInfos.firstName}</span>, toute l'équipe de <span class="elogo confirmLogo">Orifurnit</span> vous remercie pour votre achat d'un montant total de <b>${totalPrice}€</b>. <br> <br> L'identifiant de votre commande est: <b>${orderId}</b> <br> <br> A bientôt sur les sites du groupe Orinoco.`