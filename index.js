const dropdown = document.getElementsByClassName("#dropdown");
const albumImage = document.querySelector("#album-image");
const albumTitle = document.querySelector("#title");
const releaseHeader = document.querySelector("#year-released");
const description = document.querySelector("#description");
const albumInfo = document.querySelector("#album-info");
const albumList = document.querySelector(`#album-list`);
const reviewForm = document.querySelector("#review-form");
const reviewList = document.querySelector("#review-list");
const likeBtn = document.querySelector("#likes");
const likeAmount = document.querySelector("#amount");
const changeCursor = document.querySelector("#album-image");
let reviews = [];

const fetchData = () => {
    fetch(`http://localhost:3000/albums`)
      .then((response) => response.json())
      .then((albums) => {
        albums.forEach((album) => displayAlbum(album));
        displayAlbumInfo(albums[0]);
      });
  };
  fetchData();

  const displayAlbum = (album) => {
    const albumTag = document.createElement("option");
    albumTag.textContent = album.title;
    albumTag.value = album.id;
    albumList.appendChild(albumTag);
  };

  const displayAlbumInfo = (album) => {
    albumTitle.dataset.albumId = album.id;
    likeAmount.textContent = album.likes;
    reviewList.textContent = "";
    reviews = album.reviews;
    album.reviews.forEach(addReview);
    albumImage.src = album.image;
    albumTitle.textContent = album.title;
    releaseHeader.textContent = album.release_year;
    description.textContent = album.description;
  };

  const handleSelection = (e) => {
    const selectedId = parseInt(e.target.value);
    if (selectedId) {
      fetch(`http://localhost:3000/albums/${selectedId}`)
      .then((response) => response.json())
      .then((album) => displayAlbumInfo(album))
      .catch((error) => alert(error));
  }
};

albumList.addEventListener("change", handleSelection);
const addReview = (review) => {
  const li = document.createElement("li");
  li.textContent = review;
  reviewList.append(li);
};

reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const review = e.target.review.value;
    addReview(review);
  e.target.reset();
  sendReviews(review);
});

const sendReviews = (review) => {
    const currentAlbum = document.querySelector("#title").dataset;
    const currentId = currentAlbum.albumId;
    reviews.push(review);