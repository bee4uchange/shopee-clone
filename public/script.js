const productGird = document.querySelector("#productGrid");
const api = "/products";

// async function onClick(event) {
//     const id = event.currentTarget.id;
//     location.href = `./view/view.html?id=${id}`;
//     const data = await fetch(`http://localhost:3000/products/${id}/view`);
//     console.log(data);
// }

// async function render(id) {
//     const data = await fetch(`http://localhost:3000/client/${id}`);
// }

function createProductCard(data) {
    data.forEach((element) => {
        const html = `<a class="productCard" href="./view/view.html?id=${element._id}">
                        <img src=${element.image} alt="">
                        <div class="cardBody">
                            <p class="productName">${element.title}</p>
                            <div class="cardBottom">
                                <p class="price">đ${element.price}</p>
                                <p class="saleNo">Đã bán ${element.rating.count}</p>
                            </div>
                        </div>
                    </a>`;
        productGird.innerHTML += html;
    });

    // const cards = document.querySelectorAll(".productCard");
    // for (const card of cards) {
    //     card.addEventListener('click', onClick);
    // }
}

async function start() {
    const dataFetch = await fetch(api);
    const productData = await dataFetch.json();
    createProductCard(productData);
}

start();
