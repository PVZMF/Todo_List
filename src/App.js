function Add(){
    let data = document.querySelector("#TextAdd").value;
    dbTodos =[...dbTodos,
        {
        "data":data,
        "status":false,
        "date":null,
        }];
    render(dbTodos);
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
