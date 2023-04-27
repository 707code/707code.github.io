// add new task button
const btn = document.querySelector('.main button');

// Added Tasks container list <ul>
const itemTask = document.querySelector('.tasks');

// Error msg
let msg = document.querySelector(".error .msg");

// New Task input textarea
let newTask = document.querySelector(".main .task");

// Delete icon
let delIcon = document.querySelector("li .del");

// empty list
let emptList = document.querySelector(".empty");






// ფუნქცია ამატებს ახალ ტასკს მასივში
btn.addEventListener('click', () => {
    
    let newToDo = {
        todo: newTask.value,
        checked: false,
    };

    if(newTask.value === "") {
        newTask.value = "";
        newTask.focus();
        return msg.innerHTML = "Please fill new task";
    } else if (todoList.find(item => item.todo === newTask.value)){
        newTask.value = "";
        newTask.focus();
        return msg.innerHTML = " You Added This Before";
    }
    
    msg.innerHTML ="";
    

    todoList.push(newToDo);

    if(todoList.length > 0){
        window.location.reload();
    }
    
    
    displayTasks();
    

    localStorage.setItem("todo", JSON.stringify(todoList));

    newTask.value = "";
    newTask.focus();
});

    

// დამატებული ტასკების გამოტანა html ში
const displayTasks = () => {

    let displayTask ="";

    todoList.forEach((item, index)=>{
        displayTask += `
        <li class="${index}">
            <input type="checkbox" id="item_${index}" ${item.checked ? "checked" : ""}>
            <label for="item_${index}">${item.todo}</label>
            <img class="del" src="img/del.png"/>
        </li>
        `
        itemTask.innerHTML = displayTask;

    })
}

// cheked მნიშვნელობის ამოღება
itemTask.addEventListener("change",function(event){
    let idInput = (event.target.getAttribute("id"));
    let forLabel = itemTask.querySelector("[for="+idInput+"]");
    let valueLabel = forLabel.innerHTML;

    //checked მნიშვნელობის მოძებნა 
    todoList.forEach((item)=>{
        if(item.todo === valueLabel){
            item.checked = !item.checked;
            localStorage.setItem("todo", JSON.stringify(todoList));
        }
    })
});


let todoList= [];

//სტრინგის დაბრუნება მასივად
if(localStorage.getItem("todo")){
    todoList = JSON.parse(localStorage.getItem("todo"));
    displayTasks();
}


//წაშლა
const img = document.querySelectorAll("li .del");

img.forEach(item=>{
    item.addEventListener("click",(e)=>{
      
            const delItem = e.target.closest('li');
            let classId = delItem.className;
            todoList.splice(classId,1);
            delItem.remove()
            localStorage.setItem("todo", JSON.stringify(todoList));

            window.location.reload();
    })
});




      

       
 