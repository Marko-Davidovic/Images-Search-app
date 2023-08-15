// this is access to API key
const accessKey = "4HojzJ1D43zNRBYzSy5hKqkY09b7j_Y6zJhDi2YImgY";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-card");
const showMoreButtonEl = document.getElementById("show-btn");

let inputData = "";
let page = 1;

// main function for search Images
async function searchImages() {
  inputData = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  // fatching data
  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }
  //console.log(data);

  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWrapper);
  });

  page++;
  // show button after search
  if (page > 1) {
    showMoreButtonEl.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission
  page = 1;
  searchImages();
  //formEl.reset(); // Reset the form fields 
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});