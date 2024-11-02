import data from "../../data/products.js";
import { createProducts, sortProducts } from "../app.js";


window.addEventListener('DOMContentLoaded', () => {
    showCategoryProducts()
})

function showCategoryProducts(){
    const container = document.querySelector(".container-div")
    const category = localStorage["category"]
    const section = `
        <section class="category">
            <h1>${category}</h1>
            <div class="product-grid">

            </div>
        </section>
    `
    container.insertAdjacentHTML("beforeend",section)
    const categoryProducts = []
    data.products.forEach(e => {
        if(e.category === category){
            categoryProducts.push(e)
        }
    })
    sortProducts(categoryProducts)
    createProducts(categoryProducts, ".product-grid")

}