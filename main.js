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


