//! Gerekli HTML elementlerini seç
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");

//* Düzenleme Seçenekleri
let editElement;
let editFlag = false; // Düzenleme modunda olup olmadığını belirtir.
let editID = ""; // Düzenleme yapılan ögenin benzersiz kimliği

// FONKSIYONLAR

const displayAlert = (text, action) => {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
};

// List etiketi icinden eleman silme
const deleteItem = (e) => {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  displayAlert("Basariyla silindi", "danger");
};

const editItem = (e) => {
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling; // kardes elementi sectik
};

const addItem = (e) => {
  e.preventDefault();
  const value = grocery.value; // form icindeki input degeri alindi
  const id = new Date().getTime().toString(); // benzersiz bi ID olusturduk

  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");

    element.innerHTML = `
        <p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>  
    `;

    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);

    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    list.appendChild(element);
    displayAlert("Basariyla eklendi", "success");
    container.classList.add("show-container");
  }
};

form.addEventListener("submit", addItem);
