let imgTitle = document.getElementById("card-title");
let imgSrc = document.getElementById("card-image");
let imgLikesCount = document.getElementById("like-count");
let imgCommentList = document.getElementById("comments-list");
//Getting the image, title and the comments (GET METHOD)

function displayImageAndDetails() {
  const imageDetails = fetch("http://localhost:3000/images/1")
    .then((resp) => resp.json())
    .then((data) => renderImageAndDetails(data));
  return imageDetails;
}
displayImageAndDetails();

function renderImageAndDetails(imageDetails) {
  imgTitle.textContent = imageDetails.title;
  imgSrc.src = imageDetails.image;
  imgLikesCount.textContent = `${imageDetails.likes} likes`;
}

// Hiding the image after clicking on the title

function hideImage() {
  document.getElementById("card-title").addEventListener("click", () => {
    let cardImg = document.getElementById("card-image");
    if (cardImg.style.display === "none") {
      cardImg.style.display = "block";
    } else {
      cardImg.style.display = "none";
    }
  });
}
hideImage();

// Changing the image of the dog after clicking on the image

function changeDog() {
  document.getElementById("card-image").addEventListener("click", () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((resp) => resp.json())
      .then((data) => {
        fetch("http://localhost:3000/images/1", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: data.message,
          }),
        });
      });
  });
}
changeDog();

// like button
const toggleHeart = () => {
  const likeButton = document.querySelector("#like-button");

  likeButton.addEventListener("click", (event) => {
    if (likeButton.textContent === "♥") {
      likeButton.textContent = "♡";
    } else {
      likeButton.textContent = "♥";
      likeCounter();
    }
  });
};

let n = 0;
const likeCounter = () => {
  const likeCount = document.querySelector("#like-count");
  n++;
  likeCount.textContent = `${n} likes`;
};

toggleHeart();

//  comment
const ul = document.querySelector("#comments-list");
const commentSection = () => {
  fetch("http://localhost:3000/comments")
    .then((response) => response.json())
    .then((data) => fetchComments(data));
};

const fetchComments = (information) => {
  information.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = `${element.content}`;
    ul.appendChild(li);
    removeComments(li, element.id);
  });
};

commentSection();

const addComments = () => {
  const form = document.querySelector("#comment-form");
  const inputBar = document.querySelector(".comment-input");

  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const li = document.createElement("li");
    li.textContent = inputBar.value;
    ul.appendChild(li);
    postComments(inputBar.value);
    removeComments(li);
  });
};

addComments();

const postComments = (comment) => {
  fetch("http://localhost:3000/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imageId: 1,
      content: `${comment}`,
    }),
  });
};

const removeComments = (listItem, item) => {
  listItem.addEventListener("click", (event) => {
    listItem.remove();
    deleteComments(item);
  });
};

const deleteComments = (itemToDelete) => {
  fetch(`http://localhost:3000/comments/${itemToDelete}`, {
    method: "DELETE",
  });
};
