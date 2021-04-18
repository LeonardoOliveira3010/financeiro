// ==============ATIVAR MODAL=================//
const Modal = {
    open(){
        document.querySelector('.modal__overlay')
        .classList.add('active')
    },

    close(){
        document.querySelector('.modal__overlay')
        .classList.remove('active')
    }
}

// ============ Criando e adicionando as transações =============== //

// GUARDAR AS INFORMAÇÕES NO LOCALSTORAGE
const Storage = {
    get(){
        return JSON.parse(localStorage.getItem('finance:transactions')) || [] // transforma string em array
    },

    set(transactions){
        // LocalStorage guarda as informações como string
        localStorage.setItem('finance:transactions',
        JSON.stringify(transactions)) // transforma array em string
    },
}

// Dentro do Array existe os objetos das transações realizadas
const transactions = [
    
    // {
    //     description: 'Energia',
    //     amount: 10000,
    //     date: '23/05/2021'
    // },

    // {
    //     description: 'aluguel',
    //     amount: -80000,
    //     date: '23/05/2021'
    // },

    // {
    //     description: 'salario',
    //     amount: -150000,
    //     date: '23/05/2021',
    //     date: '23/05/2021'
    // },

    // {
    //     description: 'app',
    //     amount: -100000,
    //     date: '23/05/2021',
    //     date: '23/05/2021'
    // },

    // {
    //     description: 'app',
    //     amount: 330000,
    //     date: '23/05/2021',
    //     date: '23/05/2021'
    // },
]

// ============ Somando as transações e calculando =============== //
const Transaction = {
    all: Storage.get(),

    // Adicionando a transação utilizando o push
    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },
    // Removendo a transação
    remove(index){
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes(){ 
        let income = 0
        // Pegando os valores do array transactions
        Transaction.all.forEach((transaction) =>{
            // criando a condição false ou true
            if (transaction.amount > 0){
                income += transaction.amount
            }
        })

        return income

    },

    expenses(){ 
        let expense = 0
        // Pegando os valores do array transactions
        Transaction.all.forEach((transaction) =>{
            // criando a condição false ou true
            if (transaction.amount < 0){
                expense += transaction.amount
            }
        })

        return expense
    },

    total(){
        // retornando as transações e fazendo o calculo Total 
        return Transaction.expenses() + Transaction.incomes () 
    },
}

// OBJETO de armazenamento dos dados do HTML
const createTransaction = {

    transactionsContainer: 
    document.querySelector('.data__table tbody'),

    // Adicionar as transações no HTML
    addTransaction(transaction, index) {
        // console.log(transaction)
        // Variavel responsavel por pegar as transações do html
        const tr = document.createElement('tr')
        tr.innerHTML = createTransaction.innerHTMLTransaction(transaction, index)

        tr.dataset.index = index
        
        createTransaction.transactionsContainer.appendChild(tr)
        // console.log(transaction.amount)
    },

    // Criando as transações através do innerHTML
    innerHTMLTransaction(transaction, index) {
        const CSSClass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSClass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><i class="far fa-trash-alt" onclick="Transaction.remove(${index})"></i></td>

        `

        return html
    },

    // Atualizando balanço
    balanceUpdate(){
        let incomeDisplay = document.
        querySelector('#incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.incomes())
        

        let expenseDisplay = document.
        querySelector('#expenseDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.expenses())

        let totalDisplay = document.
        querySelector('#totalDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clear(){
        createTransaction.transactionsContainer.innerHTML = ""
    }
}

// OBJETO especifico para formatas a moeda (verificar com mais calma)
const Utils = {

    // Formatando o valor do formulario
    formatAmount(value){
        value = Number(value) * 100
        // console.log(value)
        return value
    },

    // Formatando a data no formulario
    formatDate(date){
        // Realizando a separação das datas através do /
        const splittedDate = date.split('-')
        return `${splittedDate[2]} / ${splittedDate[1]} / ${splittedDate[0]}`
    }, 

    // Formatando a moeda de forma geral na aplicação
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

// Estruturando o formulario
const Form = {

    // Pegando os dados do HTML
    description: document.querySelector('#description'),
    amount: document.querySelector('#amount'),
    date: document.querySelector('#date'),
    cancel: document.querySelector('.cancel'),
    
    // Pegando os valores do Form
    getValues(){
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
            cancel: Form.value
        }
    },

    //validar campos do formulario
    validateFields(){
        const {description, amount, date} = Form.getValues()
        if(description.trim() === "" || 
            amount.trim() === "" || 
            date.trim() === "") 
            {throw new Error ('Por favor, preencha todos os campos seu animal')}
    },

    // Formatar valores do formulario
    formatValues(){
        let {description, amount, date} = Form.getValues()

        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)
        return {
            description,
            amount,
            date,
        }
    },

    // Salvar transações
    saveTransaction(transaction){
        Transaction.add(transaction)
    },

    // Limpar formulario
    clearTransaction(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },
 
    // Enviando as funcionalidades para o formulario
    submit(event){
        event.preventDefault()

        try {
            Form.validateFields()

            const transaction = Form.formatValues()

            Form.saveTransaction(transaction)

            Form.clearTransaction()
            
            Modal.close()
        }
        catch(error){
            alert(error.message)
        }
   
    }
}

// Iniciando e reiniciando a aplicação
const App = {
    init(){
        Transaction.all.forEach((transaction) =>{
            createTransaction.addTransaction(transaction)
        })

        createTransaction.balanceUpdate()

        Storage.set(Transaction.all)
    },

    reload(){
        createTransaction.clear()
        App.init()
    }
}

App.init()

Transaction.remove()
