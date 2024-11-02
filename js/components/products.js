import data from "../../data/products.js";
import { createProducts, sortProducts } from "../app.js";

window.addEventListener("DOMContentLoaded", () => {
    showFilteredProducts()
})

function showFilteredProducts(){
    const container = document.querySelector(".container-div")
    const section = `
    <section class="category">
        
        <div class="product-grid">

        </div>
    </section>
    `
    container.insertAdjacentHTML("beforeend", section)
    const category = document.querySelector(".category")
    const filteredProducts = data.products.filter(e =>{
        return e.title.toLowerCase().includes(localStorage["search"].toLowerCase())
    })
    if(filteredProducts.length !== 0){
        sortProducts(filteredProducts)
        category.insertAdjacentHTML("afterbegin",`<h1>Товари по запиту "${localStorage["search"]}"</h1>`)
        createProducts(filteredProducts,".product-grid")
    }
    else if(filteredProducts.length === 0){
        document.querySelector(".product-grid").insertAdjacentHTML("beforeend",`<h1>Товарів по вашому запиту "${localStorage["search"]}" не знайдено</h1>`)
    }
    
}