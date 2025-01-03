let addToy = false;

const toyForm = document.querySelector(".add-toy-form")
const toyCollection = document.querySelector("#toy-collection");

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

function fetchToys() {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
        const card = document.createElement('div');
        card.classList.add('card');

        const h2 = document.createElement('h2');
        h2.textContent = toy.name;

        const img = document.createElement('img');
        img.src = toy.image;
        img.classList.add('toy-avatar');

        const p = document.createElement('p');
        p.textContent = `${toy.likes} Likes`;

        const likeButton = document.createElement('button');
        likeButton.classList.add('like-btn');
        likeButton.id = toy.id;
        likeButton.textContent = "Like ❤️";

        likeButton.addEventListener('click', (event) => {
          const currentLikes = parseInt(p.textContent);
          const newNumberOfLikes = currentLikes + 1;
          
          fetch(`http://localhost:3000/toys/${toy.id}`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              "likes": newNumberOfLikes
            })
          })
          .then(response => response.json())
          .then(updatedToy => {
            p.textContent = `${updatedToy.likes} Likes`;
          })
        })

        card.append(h2, img, p, likeButton);

        toyCollection.appendChild(card);
      })
    })
}

fetchToys();

toyForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const toyName = event.target.name.value;
  const toyImage = event.target.image.value;

  const toyData = {
    name: toyName,
    image: toyImage,
    likes: 0,
  };

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyData),
  })
    .then(response => response.json())
    .then(newToy => {
      const card = document.createElement('div');
      card.classList.add('card');

      const h2 = document.createElement('h2');
      h2.textContent = newToy.name;

      const img = document.createElement('img');
      img.src = newToy.image;
      img.classList.add('toy-avatar');

      const p = document.createElement('p');
      p.textContent = `${newToy.likes} Likes`;

      const likeButton = document.createElement('button');
      likeButton.classList.add('like-btn');
      likeButton.id = newToy.id;
      likeButton.textContent = "Like ❤️";

      likeButton.addEventListener('click', (event) => {
        const currentLikes = parseInt(p.textContent);
        const newNumberOfLikes = currentLikes + 1;
        
        fetch(`http://localhost:3000/toys/${newToy.id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "likes": newNumberOfLikes
          })
        })
        .then(response => response.json())
        .then(updatedToy => {
          p.textContent = `${updatedToy.likes} Likes`;
        })
      })

      card.append(h2, img, p, likeButton);

      toyCollection.appendChild(card);

      event.target.reset();
    })
})