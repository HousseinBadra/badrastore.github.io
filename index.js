import {getproducts} from '/products.js'
let productsarr=getproducts()

const products=document.querySelector('.products')
const filterbtn=document.querySelector('#filtertarget')
const closecart=document.querySelector('.closecart')
const cart=document.querySelector('.cart')
const showcart=document.querySelector('.cart-btn')

showcart.addEventListener('click',()=>{
  cart.classList.remove('d-none')
})
closecart.addEventListener('click',()=>{
  cart.classList.add('d-none')
})


const categorys=getunique(['All',...productsarr.map((elem)=>{
  return elem.category
})])

categorys.forEach((elem)=>{
  let option=document.createElement('option')
  option.textContent=elem
  option.value=elem
  filterbtn.appendChild(option)
})

productsarr.forEach((elem)=>{
  let product=document.createElement('div')
  product.classList.add("card")
  product.classList.add('col-6')
  product.classList.add('col-md-4')
  product.classList.add('col-lg-3')
  product.classList.add('product')
  //
  let productimg=document.createElement('img')
  productimg.src=elem.url
  productimg.classList.add('card-img-top')
  product.appendChild(productimg)
  
  //
  let cardbody=document.createElement('div')
  cardbody.classList.add('card-body')
  //
  cardbody.innerHTML+=`<h5 class="card-title">${elem.name} <span class="badge rounded-pill bg-success">${elem.price}</span></h5>   <p class="card-text">${elem.description}</p>`
  let cardbutton=document.createElement('button')
  cardbutton.textContent='Add to cart'
  cardbutton.classList.add('btn')
  cardbutton.classList.add('btn-primary')
  cardbutton.addEventListener('click',()=>{addtocart(elem)})
  
  cardbody.appendChild(cardbutton)
  product.appendChild(cardbody)
  product.setAttribute('data-category',elem.category)
  product.setAttribute('data-name',elem.name)
  products.appendChild(product)
})

const cartcontainer=document.querySelector('.cart-container')
const addtocart =(x)=>{
if(Array.from(document.querySelectorAll('.cart-item')).some((elem)=>{
    return elem.getAttribute('data-name') == x.name
  })){return}
  const cartitem=document.createElement('div')
  cartitem.setAttribute('data-name',x.name)
  'col-12 col-md-6 col-lg-4 cart-item'.split(' ').forEach((elem)=>{
    cartitem.classList.add(elem)
  })
  let deletebtn=document.createElement('div')
  deletebtn.classList.add('delete-cartitem')
  deletebtn.innerHTML+='<i class="bi bi-x-lg"></i>'
  deletebtn.addEventListener('click',()=>{
    cartcontainer.removeChild(cartitem)
  })
  
  cartitem.innerHTML+=`<div class="cart-item-img">
        <img src="${x.url}">
       </div>   
       <div class="cart-item-content">
         <h2>${x.name} <span class='badge rounded-pill bg-success'>${x.price}</span></h2>
         <p>${x.description}</p>
       </div>`
       cartitem.appendChild(deletebtn)
  cartcontainer.appendChild(cartitem)
}

function getunique(arr){
  let result=[]
  arr.forEach((elem)=>{
    if(result.indexOf(elem)==-1){
      result.push(elem)
    }
  })
  return result
}

filterbtn.addEventListener('change',()=>{filterproducts(filterbtn.value)})



function filterproducts(category){
  let products=Array.from(document.querySelectorAll('.product'))
  if(category == 'All'){
    products.forEach((elem)=>{
    elem.classList.remove('d-none')
    })
    return
  }
  products.forEach((elem)=>{
    if (elem.getAttribute('data-category') !== category){
      elem.classList.add('d-none')
    }
    if(elem.getAttribute('data-category') == category){
      elem.classList.remove('d-none')
    }
  })
}


