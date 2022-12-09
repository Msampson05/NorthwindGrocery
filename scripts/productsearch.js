"use strict"

let filterSelect = document.getElementById("filterSelect");
let categorySelect = document.getElementById("categorySelect");
let productTable = document.getElementById("productTable");
let productTableBody = document.getElementById("productTableBody");

window.onload = function () {
    filterSelect.onchange = displayNextDropdown;
    categorySelect.onchange = categoryChosen;

}

function displayNextDropdown() {
    if (filterSelect.value == "searchByCategory") {
        initCategorySelect(categorySelect);
        categorySelect.style.display = "block";
    }
    else if (filterSelect.value == "viewAll") {
        clearTable(productTableBody)
        categorySelect.style.display = "none";
        productTable.style.display = "block";
        fetch(`http://localhost:8081/api/products`)
        .then(response => response.json())
        .then(data => {
            for (let datum of data) {
                let row = productTableBody.insertRow(-1);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                cell1.innerHTML = `<a href="productdetails.html?productId=${datum.productId}">${datum.productName}</a>`;
                cell2.innerHTML = `$${(parseFloat(datum.unitPrice)).toFixed(2)}`;
                cell3.innerHTML = datum.productId;
            }
        })
    }
    else if (filterSelect.value == "selectOne") {
        categorySelect.style.display = "none";
        productTable.style.display = "none";
    }
}

function initCategorySelect(select) {
    select.length = 0;
    let option = new Option("Select a category", "select")
    select.appendChild(option);
    fetch(`http://localhost:8081/api/categories`)
    .then(response => response.json())
    .then(data => {
        for(let datum of data){
            let option = new Option(datum.name, datum.categoryId)
            select.appendChild(option);
        }
    })
}

function categoryChosen() {
    clearTable(productTableBody)
    if(categorySelect.value == "select"){
        productTable.style.display = "none";
    }
    else {
        productTable.style.display = "block";
        fetch(`http://localhost:8081/api/products`)
        .then(response => response.json())
        .then(data => {
            for (let datum of data) {
                if(categorySelect.value == datum.categoryId){
                    let row = productTableBody.insertRow(-1);
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let cell3 = row.insertCell(2);
                    cell1.innerHTML = `<a href="productdetails.html?productId=${datum.productId}">${datum.productName}</a>`;
                    cell2.innerHTML = `$${(parseFloat(datum.unitPrice)).toFixed(2)}`;
                    cell3.innerHTML = datum.productId;
                }
            }
        })
    }
}

function clearTable (table) {
    table.replaceChildren();
}