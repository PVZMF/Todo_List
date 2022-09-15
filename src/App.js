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
    updateTable(0);
}

function updateTable(num){
    let uniqueDate =[];
    if(num){
        let tbody = document.querySelector("#tbody");
        let tr = tbody.children[num-1];
        let date = tr.children[0].innerHTML;

        let alltask = dbTodos.filter(elem => elem.date === date).length;
        let Donetask = dbTodos.filter(elem => elem.date === date && elem.status).length;
        let NotDonetask = dbTodos.filter(elem => elem.date === date && !elem.status).length;
        if(alltask === Donetask){
            tr.classList.add("bg-green-100","border-green-200");
        }
        else if(alltask-Donetask>Donetask){
            tr.classList.add("bg-red-100","border-red-200");
        }else if(alltask-Donetask<Donetask){
            tr.classList.add("bg-blue-100","border-blue-200");
        }
        tr.children[1].innerHTML= dbTodos.filter(elem => elem.date === date).length;
        tr.children[2].innerHTML= dbTodos.filter(elem => elem.date === date && elem.status).length;
        tr.children[3].innerHTML= dbTodos.filter(elem => elem.date === date && !elem.status).length;
       
    }else{
        uniqueDate = dbTodos.filter((item, i, ar) => ar.findIndex(each => each.date === item.date) === i).map(elem=>elem.date);
        let tbody = document.querySelector("#tbody");
        tbody.innerHTML =[];
        uniqueDate.forEach((date,i) => {
        let alltask = dbTodos.filter(elem => elem.date === date).length;
        let Donetask = dbTodos.filter(elem => elem.date === date && elem.status).length;
        let NotDonetask = dbTodos.filter(elem => elem.date === date && !elem.status).length;
        let tr = document.createElement("tr");
        tr.classList.add("border-b");
        if(alltask === Donetask){
            tr.classList.add("bg-green-100","border-green-200");
        }
        else if(alltask-Donetask>Donetask){
            tr.classList.add("bg-red-100","border-red-200");
        }else if(alltask-Donetask<Donetask){
            tr.classList.add("bg-blue-100","border-blue-200");
        }
        let tdtime = document.createElement("td");
        tdtime.classList.add("text-sm","text-gray-900","font-medium","px-6","py-4","whitespace-nowrap");
        tdtime.innerHTML = date;
        let tdAll = document.createElement("td");
        tdAll.classList.add("text-sm","text-gray-900","font-medium","px-6","py-4","whitespace-nowrap");
        tdAll.innerHTML = alltask;
        let tdDone = document.createElement("td");
        tdDone.classList.add("text-sm","text-gray-900","font-medium","px-6","py-4","whitespace-nowrap");
        tdDone.innerHTML = Donetask;
        let tdNotDone = document.createElement("td");
        tdNotDone.classList.add("text-sm","text-gray-900","font-medium","px-6","py-4","whitespace-nowrap");
        tdNotDone.innerHTML = NotDonetask;
        let button = document.createElement("td");
        button.classList.add("mt-3","inline-block","px-6","py-2","bg-green-600","text-white","font-medium","text-xs","leading-tight","uppercase","rounded","shadow-md","hover:bg-blue-700","hover:shadow-lg","focus:bg-blue-700","focus:shadow-lg","focus:outline-none","focus:ring-0","active:bg-blue-800","active:shadow-lg","transition","duration-150","ease-in-out");
        button.innerHTML = "Update";
        button.addEventListener("click",()=>updateTable(i+1));
        tr.append(tdtime,tdAll,tdDone,tdNotDone,button);
        tbody.append(tr);
        })
    }
    
}

function Done(num){
    dbTodos[num].status = true;
    if(document.querySelector("#flexSwitchCheckChecked1").checked){
        AllTasks();
    }
    else if(document.querySelector("#flexSwitchCheckChecked2").checked){
        DoneTasks();
    }else{
        NotDoneTasks();
    }
}

function NotDone(num){
    dbTodos[num].status = false;
    if(document.querySelector("#flexSwitchCheckChecked1").checked){
        AllTasks();
    }
    else if(document.querySelector("#flexSwitchCheckChecked2").checked){
        DoneTasks();
    }else{
        NotDoneTasks();
    }
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
    let dbNotDone = dbTodos.filter(elem => !elem.status);
    render(dbNotDone);
}
let keyup = "";
function Search(e){
    if(e.key ==="Backspace"){
        keyup = keyup.slice(0, keyup.length - 1)
    }else{
        keyup += e.key;
    }
    let finddbTodos = dbTodos.filter(elem => elem.data.includes(keyup));
    render(finddbTodos);
}
let dbTodos = [];

document.querySelector("#btnAdd").addEventListener('click',()=>Add());
document.querySelector("#search").addEventListener("keyup",(e)=> Search(e));
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

function DeletTable(){
    dbTodos = [];
    AllTasks();
    updateTable(0);
}