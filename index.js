let tasks = [];
let tasksString = "";
let done = [];
let doneString = "";
let inputVal = "";
let taskDone = "";
initiate();
let editMode = 0;

function initiate() {
    if (localStorage.getItem("tasks")) {
        tasksString = localStorage.getItem("tasks");
        tasks = JSON.parse(tasksString);
    }

    if (localStorage.getItem("done")) {
        doneString = localStorage.getItem("done");
        done = JSON.parse(doneString);
    }  
    
    for (let i = 0; i < tasks.length; i++) {
        document.querySelector("#tasks").insertAdjacentHTML("beforeend","<li><button class='btnDoneCurrent'>✓</button><label>"
            + tasks[i] + '</label>' +
        ` <button class='btnEditCurrent'>✎</button>` + 
        ` <button class="btnRemoveCurrent">X</button>` +
        `</li>`);
    }
    
    done.forEach(el => {
        document.querySelector("#done").insertAdjacentHTML("beforeend","<li><label>" + el + 
        ` </label><button class="btnRevertCurrent">↺</button>` +
        ` <button class="btnRemoveDoneCurrent">X</button>` +
        "</li>");            
    });

}

document.querySelector("#btn-add").addEventListener("click", function(){
    inputVal = document.querySelector("#inputTask").value;
    
    if (inputVal == "") {
        alert('Enter a task');
    } else {
        inputVal = inputVal.match(/[\w\s,;'"\(\).\-\+\$]+/).join().toLowerCase();
        tasks.push(inputVal);
        saveCurrentTasksToLocal();

        document.querySelector("#tasks").insertAdjacentHTML("beforeend","<li><button class='btnDoneCurrent'>✓</button><label>" + inputVal +
        ` </label><button class="btnEditCurrent">✎</button>` + 
        ` <button class="btnRemoveCurrent">X</button>` +
        `</li>`);
    }
    document.querySelector("#inputTask").value = ""; //Clear the current added task from the input.       
});

document.querySelector("#inputTask").addEventListener("keydown", function (e) { 
    if (e.key == 'Enter') {
        document.querySelector("#btn-add").click();
    }
});

document.querySelector('body').addEventListener('click', function(event) { //An eventListener added to the body but that get executed for specific button's className

    //console.log(event.target.className); //Uncomment to debug.
    
    if (event.target.className === 'btnRemoveCurrent') {
        let el = event.target.closest("li");
        let currentTask = el.querySelector("label").innerText.toLowerCase();

        let index = tasks.indexOf(currentTask);
        console.log(index);

        if (tasks.includes(currentTask)) {
            tasks.splice(index,1);
        }

        saveCurrentTasksToLocal();
   
        el.remove();
    }

    if (event.target.className === 'btnRemoveDoneCurrent') {
        let el = event.target.closest("li");
        let currentTask = el.querySelector("label").innerText.toLowerCase();

        let index = done.indexOf(currentTask);
        console.log(currentTask, index);

        if (done.includes(currentTask)) {
            done.splice(index,1);
        }

        saveDoneTasksToLocal();

        el.remove();
    }

    if (event.target.className === "btnDoneCurrent") {
        console.log(event.target);
        // taskDone = event.target.closest("li").innerText.match(/[\w\W]+(?=\n\W)/m).join(); //Regex to select the task name (every char, symbol and/or spaces) just before button
        taskDone = event.target.nextSibling.innerText.toLowerCase();

        done.push(taskDone);
        saveDoneTasksToLocal();

        let index = tasks.indexOf(taskDone);
        tasks.splice(index,1);

        saveCurrentTasksToLocal();
        
        event.target.closest("li").remove();
        checkDoneTasks();
    }

    if (event.target.className === "btnRevertCurrent") {
        
        // console.log(event.target.previousSibling);
        // inputVal = event.target.closest("li").innerText.match(/[\w\W]+(?=\n\W)/m).join(); //Regex to select the task name (every char, symbol and/or spaces) just before button
        inputVal = event.target.previousSibling.innerText.toLowerCase();

        tasks.push(inputVal);
        saveCurrentTasksToLocal();
        
        document.querySelector("#tasks").insertAdjacentHTML("beforeend","<li><button class='btnDoneCurrent'>✓</button><label>" + inputVal +
        ` </label><button class="btnEditCurrent">✎</button>` + 
        ` <button class="btnRemoveCurrent">X</button>` +
        `</li>`);
        
        //Remove from done array:
        let index = done.indexOf(inputVal);
        done.splice(index,1);
        saveDoneTasksToLocal();

        event.target.closest("li").remove();
        checkDoneTasks();
    }

    if (event.target.className !== 'edit' && editMode === 1){

        tasks = [];
            document.querySelectorAll('#tasks label').forEach (el => {
                el.setAttribute("contentEditable", false);
                el.innerText = el.innerText.match(/[\w\s,;'"\(\).\-\+\$]+/).join(); //Remove special characters in edition of task. To avoid sending weird HTML messages.
                tasks.push(el.innerText.toLowerCase());
                el.setAttribute("class", '');
            });
        saveCurrentTasksToLocal();
        editMode = 0;
        
    }
    
    let el = event.target.previousElementSibling;
    if (event.target.className === "btnEditCurrent") {
        el.setAttribute("contentEditable", true);
        el.focus();
        el.classList.toggle("edit");
        editMode = 1;
    }

});

function checkDoneTasks() {
    document.querySelector("#done").innerHTML = ""; // Remove the current tasks, to avoid overwritting content.
    
    done.forEach(el => {
        document.querySelector("#done").insertAdjacentHTML("beforeend","<li><label>" + el + 
        ` </label><button class="btnRevertCurrent">↺</button>` +
        ` <button class="btnRemoveDoneCurrent">X</button>` +
        "</li>");
    });
}

function saveCurrentTasksToLocal() {
    tasksString = JSON.stringify(tasks);
    localStorage.setItem(`tasks`, tasksString);
}

function saveDoneTasksToLocal() {
    doneString = JSON.stringify(done);
    localStorage.setItem(`done`, doneString);
}

document.querySelector("#btn-clearAll").addEventListener("click", function (e) {
    done = [];
    document.querySelector("#done").innerHTML = "";
    tasks = [];
    document.querySelector("#tasks").innerHTML = "";
    localStorage.clear();   
});
