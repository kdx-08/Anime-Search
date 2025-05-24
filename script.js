const searchTerm = document.querySelector("#search-term");
const submitBtn = document.querySelector("#submit");
const searchForm = document.querySelector("#search-form");
const resultContainer = document.querySelector(".result-container");

const showLoading = () => {
  submitBtn.disabled = true;
  submitBtn.innerHTML = "Searching...";
};

const hideLoading = () => {
  submitBtn.disabled = false;
  submitBtn.innerHTML = "Search";
};

const appendResult = (objects) => {
  resultContainer.innerHTML = "";
  console.log(objects);
  if (objects.length === 0) {
    const message = document.createElement("H3");
    message.innerText = "No results found!";
    resultContainer.append(message);
  } else {
    try {
      for (let object of objects) {
        if (object.images.jpg.large_image_url) {
          let img = new Image();
          img.src = object.images.jpg.large_image_url;
          const newResult = document.createElement("DIV");
          const resultImage = document.createElement("IMG");
          const resultDesc = document.createElement("DIV");
          const title =
            object.title_english === null ? object.title : object.title_english;
          resultDesc.innerHTML = `<p><b>Title: </b><a target="_blank" href=${object.url}>${title}</a></p>
          <p><b>Score: </b>${object.score}</p>`;
          resultImage.src = object.images.jpg.large_image_url;
          newResult.append(resultImage);
          newResult.append(resultDesc);
          newResult.classList.add("result-item");
          resultContainer.append(newResult);
        }
      }
    } catch (e) {
      console.log("Error", e);
    }
  }
  hideLoading();
};

const search = async (term) => {
  showLoading();
  try {
    const url = `https://api.jikan.moe/v4/anime?sfw&q=${term}`;
    await axios.get(url).then(function (data) {
      appendResult(data.data.data);
    });
  } catch (e) {
    console.log("Error", e);
  }
};

submitBtn.addEventListener("click", (e) => {
  search(searchTerm.value);
});
