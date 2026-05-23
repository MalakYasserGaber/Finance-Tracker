const addTransactionbtn =document.getElementById("addTransaction-btn");
const addbtn =document.getElementById("add-btn");
const cancelbtn =document.getElementById("cancel-btn");
const modal= document.getElementById("modal");
const amount=document.getElementById("amount");
const type=document.getElementById("type");
const category=document.getElementById("category");
const date=document.getElementById("date");
const categoryContainer = document.getElementById("category-container");
const budgetbtn=document.getElementById("edit-budget-btn");
const saveBudgetbtn=document.getElementById("save-budget-btn");
const budgetModal=document.getElementById("budget-modal");
const budgetInput=document.getElementById("budget-input");
const transactionsContainer=document.getElementById("transactions-container");

let balance=0;
let income=0;
let expenses=0;
let budget=0;

const balanceEl=document.getElementById("balance");
const incomeEl=document.getElementById("income");
const expensesEl=document.getElementById("expenses");
const budgetEl=document.getElementById("budget");

balanceEl.textContent=`Balance $${balance}`;
incomeEl.textContent=`Income $${income}`;
expensesEl.textContent=`Expenses $${expenses}`;
budgetEl.textContent=`Budget $${budget}`;


let transactions=[];


//open modal
addTransactionbtn.addEventListener("click", function(){
     modal.style.display="flex";
     date.value= new Date().toISOString().split("T")[0];
     // reset form values
    amount.value = "";
    type.value = "";
    category.value = "";


    // hide category again
    categoryContainer.style.display = "none";})



//close modal (cancelling button no saving)
cancelbtn.addEventListener("click",function(){modal.style.display="none";})


//hiding the category section
type.addEventListener("change", function () {

    if (type.value === "expense") {
        categoryContainer.style.display = "flex";
    } else {
        categoryContainer.style.display = "none";
    }
});



//closing modal with saving

//saving the transaction
function addTransaction(){
    const amountValue= Number(amount.value);
    const typeValue=type.value;

    //checking for empty inputs
    if(!amountValue || amountValue<=0){
        alert("Invalid Amount");
        return;
    }

    if(!typeValue){
        alert("Invalid Type");
        return;
    }

    if(typeValue ==="expense" && !category.value){
        alert("Invalid Category")
        return;
    }

    const transaction={
    id: crypto.randomUUID(),   
    amount:amountValue,
    type:typeValue,
    category: typeValue === "expense" ? category.value: null,
    date: date.value
    };

    transactions.push(transaction);
    console.log(transactions); //to make sure the data is saved in the array for now
    modal.style.display="none";
    
    
    calculateTotals();
    updateDisplay();
    renderTransactions();

}

addbtn.addEventListener("click",addTransaction)


//function updateTotals(amount,type){
//    if(type ==="income"){
//        income+=amount;
//        balance+= amount;
//   }
//    else{
//        expenses+=amount;
//        balance-=amount;
//    }
//}

function calculateTotals(){

    balance = 0;
    income = 0;
    expenses = 0;

    transactions.forEach(transaction => {

        if(transaction.type === "income"){
            income += transaction.amount;
            balance += transaction.amount;
        }

        else{
            expenses += transaction.amount;
            balance -= transaction.amount;
        }

    });

}


function updateDisplay(){
    balanceEl.textContent=`Balance $${balance}`;
    incomeEl.textContent=`Income $${income}`;
    expensesEl.textContent=`Expenses $${expenses}`;
}


budgetbtn.addEventListener("click",function(){budgetModal.style.display="flex"})

function saveBudget(){
    if(!budgetInput.value || Number(budgetInput.value)<=0){
        alert("Invalid Budget");
        return;
    }
    budget=Number(budgetInput.value);
    budgetEl.textContent=`Budget $${budget}`;
    budgetInput.value=""
    budgetModal.style.display="none"

    
}


budgetInput.addEventListener("keydown",function(e){
    if(e.key==="Enter"){
        saveBudget();
    }
})

saveBudgetbtn.addEventListener("click",function(){saveBudget()})


function displayTransactions(transaction){

    const div=document.createElement("div");
    div.classList.add("transaction");
    div.innerHTML = `
        <div>${transaction.amount}</div>
        <div>${transaction.type}</div>
        <div>${transaction.category ? transaction.category : ""}</div>
        <div>${transaction.date}</div>
        <button class="deleteTransactionButton">x</button>
    `;

    div.querySelector(".deleteTransactionButton").addEventListener("click", function () {
        deleteTransaction(transaction.id);
    });

    transactionsContainer.appendChild(div);
}

function deleteTransaction(id){

    transactions = transactions.filter(
        transaction => transaction.id !== id
    );

    calculateTotals();
    updateDisplay();
    renderTransactions();
}

function renderTransactions(){

    transactionsContainer.innerHTML = "";

    transactions.forEach(transaction => {
        displayTransactions(transaction);
    });

}


    
