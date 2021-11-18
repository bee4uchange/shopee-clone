const view = document.querySelector('.productDetail');
let imgs = {};
let params = new URLSearchParams(location.search);
const id = params.get('id');

function imgChange(event) {
    const slider = document.querySelectorAll('.sm-img');
    const mainImg = document.querySelector('#main-img');
    slider.forEach(i => {
        i.classList.remove('choosed');
    });
    const img = event.currentTarget;
    img.classList.add('choosed');
    mainImg.src = img.src;
}

function createProductDetail(data) {
    const html = `<div class="left">
    <div class="image">
        <img src="${data.image}" alt="" id="main-img">
        <div class="slider">
            <img src="${data.image}" alt="" class="sm-img choosed">
            <img src="https://cf.shopee.vn/file/bec48cfb3ba6c4119a3385622c4ec2bb_tn" alt="" class="sm-img">
            <img src="https://cf.shopee.vn/file/9b8a7e0633a97617da8b71b0b9517602_tn" alt="" class="sm-img">
        </div>
    </div>
</div>

<div class="right">
    <p class="title">
        ${data.title}
    </p>

    <div class="rating">
        <div class="saleNo"><strong>${data.rating.count}</strong> <span>Đã bán</span></div>
        <div class="likeNo">Đã thích (${data.rating.like})</div>
    </div>

    <div class="price">
        <span>đ${data.price}</span>
    </div>

    <div class="buy">
        <div class="shipInfo">
            <span>Vận chuyển</span>
            <div class="freeShip">
                <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/1cdd37339544d858f4d0ade5723cd477.png"
                    alt="">
                Miễn phí vận chuyển
            </div>
        </div>

        <div class="quantity">
            <span>Số lượng</span>
            <div class="inputBox">
                <button class="adjustButton">-</button>
                <input type="text" value="1" id="quantityBox">
                <button class="adjustButton">+</button>
            </div>
            <span class="qLeft">762 sản phẩm có sẵn</span>
        </div>

        <div class="buttonGr">
            <button class="btn-add">Thêm Vào Giỏ Hàng</button>
            <button class="btn-buy">Mua Ngay</button>
        </div>
    </div>
</div>`


    view.innerHTML += html;

    const slider = document.querySelectorAll('.sm-img');
    slider.forEach(img => {
        img.addEventListener('mouseenter', imgChange);
    });
}

async function start() {
    const dataFetch = await fetch(`/products/${id}/view`, {method: 'POST'});
    const productData = await dataFetch.json();
    createProductDetail(productData);
}

start();