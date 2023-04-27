const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
const country = "in";
let requestURL;
const options = [
  "general",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

/* function getapidata() {
  fetch(requestURL, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      console.info(res);

      for (let item of res.articles) {
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `<div class="news-image-container">
    <img src="${
      item.urlToImage ||
      "https://d22ueo28hfk252.cloudfront.net/Content/versioned/2.0.0.1/images/version4/promotion_april_23/zenrik_images/newspaper-16826110191532.jpg?v=1682611020"
    }" alt="" /> </div>
    <div class="news-content">
      <div class="news-title">
        ${item.title}
      </div>
      <div class="news-description">
      ${item.description || item.content || ""}
      </div>
      <a href="${item.url}" target="_blank" class="view-button">Read More</a>
    </div>`;
        container.appendChild(card);
      }

      return res;
    });
} */

const generateUI = (articles) => {
  for (let item of articles) {
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `<div class="news-image-container">
    <img src="${
      item.urlToImage ||
      "https://d22ueo28hfk252.cloudfront.net/Content/versioned/2.0.0.1/images/version4/promotion_april_23/zenrik_images/newspaper-16826110191532.jpg?v=1682611020"
    }" alt="" />
    </div>
    <div class="news-content">
      <div class="news-title">
        ${item.title}
      </div>
      <div class="news-description">
      ${item.description || item.content || ""}
      </div>
      <a href="${item.url}" target="_blank" class="view-button">Read More</a>
    </div>`;
    container.appendChild(card);
  }
};
const getapidata = async () => {
  container.innerHTML = "";
  let response = await fetch(requestURL);
  if (!response.ok) {
    alert("Data unavailable at the moment. Please try again later");
    return false;
  }
  let data = await response.json();
  generateUI(data.articles);
};

const selectCategory = (e, category) => {
  let options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });
  requestURL = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getapidata();
};

const createOptions = () => {
  for (let i of options) {
    optionsContainer.innerHTML += `<button class="option ${
      i == "general" ? "active" : ""
    }" onclick="selectCategory(event,'${i}')">${i}</button>`;
  }
};
const init = () => {
  optionsContainer.innerHTML = "";
  getapidata();
  createOptions();
};

window.onload = () => {
  requestURL = `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=f438c7d22a79440783194341a4ca1d7b`;
  init();
};
