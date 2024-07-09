const imageContainer = document.getElementById("image-container");
let pageNumber = 1;
const imagesPerPage = 10;

async function getImages(page, limit) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`
    );
    const images = await response.json();
    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

function renderImages(images) {
  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.url;
    imgElement.alt = image.title;
    imageContainer.appendChild(imgElement);
  });
}

async function loadImages() {
  const images = await getImages(pageNumber, imagesPerPage);
  renderImages(images);
  pageNumber++;
}

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadImages();
  }
});

document.addEventListener("DOMContentLoaded", loadImages);
