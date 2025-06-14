//your code here
const images = [
  "img1", "img2", "img3", "img4", "img5"
];

let selectedImages = [];
let selectedElements = [];

const container = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("para");

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Load images
function loadImages() {
  const imagesCopy = [...images];
  const duplicate = imagesCopy[Math.floor(Math.random() * imagesCopy.length)];
  const tiles = [...imagesCopy, duplicate];
  shuffle(tiles);

  tiles.forEach((imgClass, index) => {
    const img = document.createElement("img");
    img.classList.add(imgClass);
    img.setAttribute("data-class", imgClass);
    img.addEventListener("click", () => selectImage(img));
    container.appendChild(img);
  });
}

function selectImage(img) {
  if (selectedImages.length >= 2 || selectedElements.includes(img)) return;

  img.classList.add("selected");
  selectedImages.push(img.getAttribute("data-class"));
  selectedElements.push(img);

  resetBtn.style.display = "inline-block";

  if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

resetBtn.addEventListener("click", () => {
  container.innerHTML = "";
  selectedImages = [];
  selectedElements = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  message.innerText = "";
  loadImages();
});

verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";
  if (selectedImages[0] === selectedImages[1]) {
    message.innerText = "You are a human. Congratulations!";
  } else {
    message.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

// Initial load
loadImages();
