function Add(){
    let data = document.querySelector("#TextAdd").value;
    let date = document.getElementById("date");
    dbTodos =[...dbTodos,
        {
        "data":data,
        "status":false,
        "date":date.value,
        }];
    render(dbTodos);
}

function updateTable(num){
    let uniqueDate =[];
    if(num){
        let tbody = document.querySelector("#tbody");
        let tr = tbody.children[num-1];
        let date = tr.children[0].innerHTML;
        tr.children[1].innerHTML= dbTodos.filter(elem => elem.date === date).length;
        tr.children[2].innerHTML= dbTodos.filter(elem => elem.date === date && elem.status).length;
        tr.children[3].innerHTML= dbTodos.filter(elem => elem.date === date && !elem.status).length;
       
    }else{
        uniqueDate = dbTodos.filter((item, i, ar) => ar.findIndex(each => each.date === item.date) === i).map(elem=>elem.date);
        let tbody = document.querySelector("#tbody");
        tbody.innerHTML =[];
        uniqueDate.forEach((date,i) => {
        let alltask = dbTodos.filter(elem => elem.date === date);
        let Donetask = dbTodos.filter(elem => elem.date === date && elem.status);
        let NotDonetask = dbTodos.filter(elem => elem.date === date && !elem.status);
        let tr = document.createElement("tr");
        tr.classList.add("border-b");
        let tdtime = document.createElement("td");
        tdtime.classList.add("text-sm","text-gray-900","font-medium","px-6","py-4","whitespace-nowrap");
        tdtime.innerHTML = date;
        let tdAll = document.createElement("td");
        tdAll.classList.add("text-sm","text-gray-900","font-medium","px-6","py-4","whitespace-nowrap");
        tdAll.innerHTML = alltask.length;
        let tdDone = document.createElement("td");
        tdDone.classList.add("text-sm","text-gray-900","font-medium","px-6","py-4","whitespace-nowrap");
        tdDone.innerHTML = Donetask.length;
        let tdNotDone = document.createElement("td");
        tdNotDone.classList.add("text-sm","text-gray-900","font-medium","px-6","py-4","whitespace-nowrap");
        tdNotDone.innerHTML = NotDonetask.length;
        let button = document.createElement("td");
        button.classList.add("inline-block","px-6","py-2.5","bg-green-600","text-white","font-medium","text-xs","leading-tight","uppercase","rounded","shadow-md","hover:bg-blue-700","hover:shadow-lg","focus:bg-blue-700","focus:shadow-lg","focus:outline-none","focus:ring-0","active:bg-blue-800","active:shadow-lg","transition","duration-150","ease-in-out");
        button.innerHTML = "Update";
        button.addEventListener("click",()=>updateTable(i+1));
        tr.append(tdtime,tdAll,tdDone,tdNotDone,button);
        tbody.append(tr);
        })
    }
    
}

function Done(num){
    let listtodos = document.querySelector("#listTodos");
    let todo = listtodos.children[num];
    todo.children[1].classList.toggle("hidden");
    todo.children[2].classList.toggle("hidden");
    dbTodos[num].status = true;
}

function NotDone(num){
    let listtodos = document.querySelector("#listTodos");
    let todo = listtodos.children[num];
    todo.children[1].classList.toggle("hidden");
    todo.children[2].classList.toggle("hidden");
    dbTodos[num].status = false;
    console.log(dbTodos);
}

function Remove(num){
    let listtodos = document.querySelector("#listTodos");
    console.log(num);
    console.log(listtodos.children);
    listtodos.children[num].remove();
    listtodos = document.querySelector("#listTodos");
    dbTodos = dbTodos.filter((elem,key) => key != num);
    render(dbTodos);
}

function DoneTasks(){
    let dbDone = dbTodos.filter(elem => elem.status);
    render(dbDone);
}

function AllTasks(){
    render(dbTodos);
}

function NotDoneTasks(){
    let dbDone = dbTodos.filter(elem => !elem.status);
    render(dbDone);
}

let dbTodos = [];

document.querySelector("#btnAdd").addEventListener('click',()=>Add())

function render(dbTodos){
    let listtodos = document.querySelector("#listTodos");
    listtodos.innerHTML=[];
    dbTodos.forEach((element,i)=>{
        let newtodo = document.createElement('div');
        newtodo.classList.add('flex','mb-4','items-center');
        let p = document.createElement('p');
        p.classList.add('w-full','text-grey-darkest');
        let btnDone = document.createElement('button');
        btnDone.classList.add('hidden','flex-no-shrink','p-2','ml-4','mr-2','border-2','rounded','hover:text-white','text-green','border-green','hover:bg-green');
        btnDone.innerHTML = "Done";
        let btnNotDone = document.createElement('button');
        btnNotDone.classList.add('flex-no-shrink','p-2','ml-4','mr-2','border-2','rounded','hover:text-white','text-grey','border-grey','hover:bg-grey');
        btnNotDone.innerHTML = "NotDone"
        let btnRemove = document.createElement('button');
        btnRemove.classList.add('flex-no-shrink','p-2','ml-2','border-2','rounded','text-red','border-red','hover:text-white','hover:bg-red');
        btnRemove.innerHTML = "Remove"
        if(element.status){
             btnNotDone.classList.add("hidden");
             btnDone.classList.remove("hidden");
        }else{
            btnNotDone.classList.remove("hidden");
            btnDone.classList.add("hidden");
        }
        p.innerHTML = element.data;
        btnDone.addEventListener('click',() => NotDone(i));
        btnNotDone.addEventListener('click',() => Done(i));
        btnRemove.addEventListener('click',() => Remove(i));
        listtodos.append(newtodo);
        newtodo.append(p,btnDone,btnNotDone,btnRemove)
    });
    
}
