// ==============ATIVAR MODAL=================//
const activeModal = () =>{
    const newTransaction = document.querySelector('.button')
    const active = document.querySelector('.modal__overlay')

    newTransaction.addEventListener('click', () =>{
        active.classList.toggle('active')
    })
}

activeModal()

// =============DESATIVAR MODAL=================//
const desactiveModal = () =>{
    const cancelTransaction = document.querySelector('.cancelar')
    const active = document.querySelector('.modal__overlay')
    cancelTransaction.addEventListener('click', ()=>{
        active.classList.toggle('active')
     })

}

desactiveModal()