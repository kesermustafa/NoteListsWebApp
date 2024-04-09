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

const setBackToDefault = () => {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "Add";
};

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
  displayAlert("Deleted successfully", "danger");
  setBackToDefault();
};

const editItem = (e) => {
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling; // kardes elementi sectik

  //tiklanilan elemanin p etiket degeri input a attik
  grocery.value = editElement.innerText;

  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "Edit";
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
    displayAlert("Created successfully", "success");
    container.classList.add("show-container");

    // local storage ekleme yap
    addToLocalStorage(id, value);

    setBackToDefault();
  } else if (value !== "" && editFlag) {
    editElement.innerText = value;
    displayAlert("Updated successfully", "success");
    setBackToDefault();
  }
};

const clearItem = () => {
  const items = document.querySelectorAll(".grocery-item");

  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }

  container.classList.remove("show-container");
  displayAlert("List deleted successfully", "danger");
  setBackToDefault();
};

const addToLocalStorage = (id, value) => {
  const grocery = { id, value };

  let items = getLocalStorage();
  items.push(grocery);

  localStorage.setItem("list", JSON.stringify(items));
};

const getLocalStorage = () => {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
};

form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItem);
