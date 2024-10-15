let addToy = false;
//constants
const toyCollection = document.querySelector('#toy-collection')
const toyForm = document.querySelector('.add-toy-form')

//Helper functions
function addToys(toy){
  const card = document.createElement(`div`)
  const toyImg = document.createElement('img')
  const nameTag = document.createElement('h2')
  const toyLikes = document.createElement('p')
  const likeButton = document.createElement('button')
  card.className = "card"
  likeButton.className = "like-btn"
  likeButton.textContent = "LIKE!!!!!!!"
  likeButton.id = toy.id
  toyLikes.textContent = `${toy.likes}LIKES!!!!!!` // come back and put the number of likes here
  nameTag.textContent = toy.name
  toyImg.className = "toy-avatar"
  toyImg.src = toy.image
  toyCollection.append(card)
  card.appendChild(toyImg)
  card.appendChild(nameTag)
  card.appendChild(likeButton)
  card.appendChild(toyLikes)
  // card.appendChild()

  likeButton.addEventListener("click", () => addLikes(toy, toyLikes))
}

async function addLikes(toy, toyLikes){
toy.likes++

const response = await fetch(`http://localhost:3000/toys/${toy.id}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json'},
  body: JSON.stringify( { likes: toy.likes } )
})
  toyLikes.textContent = `${toy.likes}LIKES!!!!!!`
}

//Event listeners
toyForm.addEventListener("submit", submitNewToy)

// fetch functions

async function getToys() {
  const response = await fetch('http://localhost:3000/toys')
  const toys = await response.json()
  console.log(toys)

  toys.forEach(addToys)
}
// post fetch 
async function submitNewToy(event) {
  event.preventDefault()
  const toyForm = document.querySelectorAll('input')
  const toyFormOne = toyForm[0]
  const toyFormTwo = toyForm[1]
  const userNameInput = toyFormOne.value
  const userImgInput = toyFormTwo.value

  const response = await fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify ( {name: userNameInput, image: userImgInput, likes: 0 })

  })
  const data = await response.json()
  addToys(data)
  // console.log(data)
  
  // toyForm.reset()
 

  // const toyFormTwo = document.querySelectorAll('input[1]')
  // const userInput = toyForm.forEach(input => console.log(input))
  // console.log(userNameInput)
  // console.log(userImgInput)
}
getToys()





document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
