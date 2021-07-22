const container = document.querySelector('#article')

fetch(urlId)
.then((resp) => resp.json())
.then(function(data){
  let div = createNode('div')
  append(container, div)

  let img = createNode('img')
  append(div, img)
  img.src = data.imageUrl

  let title = createNode('h1')

  let idNum = createNode('span')

  let artDes = createNode('p')

  let choice = createNode('select')

  let qtyChoice = createNode('option')

  let artPers = createNode('select')

  let persChoice = createNode('option')
})