let main = document.getElementById('main');
let secondMain = document.getElementById('secondMain');
let form = document.getElementById('addForm');
let itemList = document.getElementById('items'); 

// main.style.backgroundColor = 'red';
// secondMain.style.backgroundColor = 'blue';
// form.style.backgroundColor = 'green';
let amount = document.getElementById('amount');
let description = document.getElementById('des');
let option = document.getElementById('inputOption');

form.addEventListener('submit',savelocalStorage);

function savelocalStorage(e){
    e.preventDefault();
    let myData = {
        amountData : amount.value , 
        descriptionData : description.value , 
        optionData : option.value 
    }
    
    localStorage.setItem(myData.descriptionData, JSON.stringify(myData));
    // console.log(myData);
    
    showUserOnScreen(myData);
}

function showUserOnScreen(myData){
    // let itemList = document.getElementById('items');
    let newLi = document.createElement('li');
    newLi.className = 'list-group-item';
    let textNode = document.createTextNode(myData.amountData + ' - '+ myData.descriptionData + ' - ' + myData.optionData);
    
    

    //delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm delete';
    deleteBtn.appendChild(document.createTextNode('Delete'));
    deleteBtn.setAttribute('data-name', myData.descriptionData);
    deleteBtn.addEventListener('click', removeItem); 

    //edit button
    let editBtn = document.createElement('button');
    editBtn.className = 'btn btn-primary btn-sm edit';
    editBtn.appendChild(document.createTextNode('Edit'));
    editBtn.setAttribute('data-name-edit', myData.descriptionData);
    editBtn.addEventListener('click', (e) => {
        let li = e.target.parentElement;
        itemList.removeChild(li);
        editItem(myData.descriptionData,myData.amountData,myData.optionData);
    });

    newLi.appendChild(textNode);
    newLi.appendChild(editBtn);
    newLi.appendChild(deleteBtn);
    itemList.appendChild(newLi);
}

function removeItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are You Sure?')){
            let li = e.target.parentElement;
            let deleteLi = li.querySelector('.delete').getAttribute('data-name');
            localStorage.removeItem(deleteLi);
            itemList.removeChild(li);
        }
    }
}

function editItem(descriptionData,amountData,optionData){
    // console.log(amountData);
    // console.log(descriptionData);
    // console.log(optionData);
    amount.value = amountData;
    description.value = descriptionData;
    option.value = optionData;
    
    
    localStorage.removeItem(descriptionData);
    newLi.removeChild(newLi);
    
}