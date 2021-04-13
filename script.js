// ==============ATIVAR MODAL=================//
let newTransaction = document.querySelector('.button')

let active = document.querySelector('.modal__overlay')

newTransaction.addEventListener('click', ()=>{
    active.classList.add('active')
})

// =============DESATIVAR MODAL=================//
let cancelTransaction = document.querySelector('.cancelar')

cancelTransaction.addEventListener('click', ()=>{
   active.classList.add('deactivate')
})

// if(newTransaction != 1){
//     active.classList.add('active')
// }