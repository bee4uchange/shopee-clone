const view = document.querySelector('.productDetail');
let imgs = {};
let params = new URLSearchParams(location.search);
const id = params.get('id');
let df = 1;

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
    const imgList = data.imgList;
    console.log(imgList);
    const html = `<div class="left">
    <div class="image">
        <img src="${data.image}" alt="" id="main-img">
        <div class="slider">
            <img src="${data.image}" alt="" class="sm-img choosed">
            ${imgList.map((item) => `
                <img src=${item} alt="" class="sm-img"></img>
            `).join('')}
        </div>
    </div>
</div>

<div class="right">
    <p class="title">
        ${data.title}
    </p>

    <div class="rating">
        <div class="saleNo"><strong>${data.rating.count}</strong> <span>Đã bán</span></div>
        <div class="likeNo">
        <i class="far fa-heart" id="likeIcon"></i>
        Đã thích (${data.rating.like})</div>
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
                <button class="adjustButton" id="minusBtn">-</button>
                <input type="text" value=${df} id="quantityBox">
                <button class="adjustButton" id="plusBtn">+</button>
            </div>
            <span class="qLeft">762 sản phẩm có sẵn</span>
        </div>

        <div class="buttonGr">
            <button class="btn-add">
            <i class="fas fa-cart-plus"></i>
            Thêm Vào Giỏ Hàng</button>
            <button class="btn-buy">Mua Ngay</button>
        </div>
    </div>
</div>`


    view.innerHTML += html;

    const slider = document.querySelectorAll('.sm-img');
    slider.forEach(img => {
        img.addEventListener('mouseenter', imgChange);
    });
    
    const quantityBox = document.querySelector('#quantityBox');
    const minusBtn = document.querySelector('#minusBtn');
    const plusBtn = document.querySelector('#plusBtn');


    function onChangeValue(e) {
        const valueInput = e.currentTarget.value;
        console.log(valueInput);
        df = valueInput;
    }

    quantityBox.addEventListener('change', onChangeValue);

    function onMinusClick() {
        df--;
        if (df === 0) {
            minusBtn.disabled = true;
        } else {
            quantityBox.value = df;
        }
    }
    minusBtn.addEventListener('click', onMinusClick);

    function onPlusClick() {
        df++;
        if (df) {
            minusBtn.disabled = false;
            quantityBox.value = df;
        }
    }
    plusBtn.addEventListener('click', onPlusClick);
}

async function start() {
    const dataFetch = await fetch(`/products/${id}/view`, {method: 'POST'});
    const productData = await dataFetch.json();
    createProductDetail(productData);
}

start();