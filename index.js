let productsarr=[
  {
    name:'Face mask',
    price:'1.99$',
    category:'protective equipment',
    description:'Always wear a facemask for your safety',
    url:'facemask.jpg'
  }, 
  {
    name:'Guitar',
    price:'69.99$',
    category:'Musical intruments',
    description:'A high quality guitar for a great musician',
    url:'guitar.jpg'
  },
    {
    name:'Harry Poter book',
    price:'15.99$',
    category:'Book',
    description:'Reading a book never hurts specially Harry Poter',
    url:'harrypoter.jpg'
  },  {
    name:'Honey bottle',
    price:'24.99$',
    category:'Food',
    description:'Delicious honey that will make you eat your fingers',
    url:'honey.jpg'
  },  {
    name:'Iphone 12',
    price:'799.99$',
    category:'Technology',
    description:'Iphone 12 is the perfect phone for you',
    url:'iphone12.jpg'
  },  {
    name:'Jalab sirup',
    price:'9.99$',
    category:'Food',
    url:'jalab.png',
    description:'The best drink for ramadan'
  },  {
    name:'The product book',
    price:'14.99$',
    category:'Book',
    url:'productbook.jpg',
    description:'The book to learn product managment'
  },  {
    name:'Smart TV',
    price:'699.99$',
    category:'Technology',
    url:'smarttv.jpg',
    description:'A big screen TV so you can have fun'
  },  {
    name:'Tablet',
    price:'239.99$',
    category:'Technology',
    description:'A great tablet for a cheap price',
    url:'tablet1.jpg'
  },  {
    name:'Toyota car',
    price:'12999.99$',
    category:'Car',
    description:'The best car for you',
    url:'toyota.jpg'
  },
    {
    name:'Dates',
    price:'4.99$',
    category:'Food',
    description:'Dates tastes the best',
    url:'dates.jpg'
  },  {
    name:'Tesla madel X',
    price:'29999.99$',
    category:'Car',
    description:'Drive safely in the best electrical car',
    url:'tesla.jpg'
  }
  
  ]


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


