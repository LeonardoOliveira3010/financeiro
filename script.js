// ==============ATIVAR MODAL=================//
const activeModal = () =>{
    const newTransaction = document.querySelector('.button')
    const active = document.querySelector('.modal__overlay')

    newTransaction.addEventListener('click', () =>{
        active.classList.toggle('active')
    })
}

activeModal()

// =============DESATIVAR MODAL================= //
const desactiveModal = () =>{
    const cancelTransaction = document.querySelector('.cancelar')
    const active = document.querySelector('.modal__overlay')
    cancelTransaction.addEventListener('click', ()=>{
        active.classList.toggle('active')
     })

}

desactiveModal()

// ============ Criando e adicionando as transações =============== //

// Objeto das transações realizadas
const transactions = [
    {
        id: 1,
        description: 'Energia',
        amount: -10000,
        date: '23/05/2021'
    },

    {
        id: 1,
        description: 'aluguel',
        amount: '-80000',
        date: '23/05/2021'
    },

    {
        id: 1,
        description: 'salario',
        amount: 150000,
        date: '23/05/2021',
        date: '23/05/2021'
    }
]

// OBJETO de armazenamento dos dados do HTML
const createTransaction = {

    transactionsContainer: 
    document.querySelector('.data__table tbody'),

    // Adicionar as transações no HTML
    addTransaction(transaction, index) {
        // console.log(transaction)
        const tr = document.createElement('tr')
        tr.innerHTML = createTransaction.innerHTMLTransaction(transaction)
        
        createTransaction.transactionsContainer.appendChild(tr)
        // console.log(transaction.amount)
    },

    // Criando as transações através do innerHTML
    innerHTMLTransaction(transaction) {
        const CSSClass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSClass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><i class="far fa-trash-alt"></i></td>

        `
        return html
    }
}

// OBJETO especifico para formatas a moeda (verificar com mais calma)
const Utils = {
    formatCurrency(value){
        // Sinal da moeda -
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "") // Expressão regular

        value = Number(value) / 100

        value = value.toLocaleString("pr-BR", {
            style: 'currency',
            currency: "BRL"
        })

        return signal + value
    }
}

transactions.forEach((transaction) =>{
    createTransaction.addTransaction(transaction)
})

