let tasks = [];
let tasksString = "";
let done = [];
let doneString = "";
let inputVal = "";
let taskDone = "";
initiate();

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
            document.querySelector("#tasks").insertAdjacentHTML("beforeend","<li>" + tasks[i] +
            ` <button class="btnDoneCurrent">✓</button>` + 
            ` <button class="btnRemoveCurrent">X</button>` +
            `</li>`);
        }
    
        done.forEach(el => {
            document.querySelector("#done").insertAdjacentHTML("beforeend","<li>" + el + 
            ` <button class="btnRevertCurrent">↺</button>` +
            "</li>");
        });
}

document.querySelector("#btn-add").addEventListener("click", function(){
    inputVal = document.querySelector("#inputTask").value;
    
    if (inputVal == "") {
        alert('Enter a task');
    } else {
        tasks.push(inputVal);
        saveCurrentTasksToLocal();

        document.querySelector("#tasks").insertAdjacentHTML("beforeend","<li>" + inputVal +
        ` <button class="btnDoneCurrent">✓</button>` + 
        ` <button class="btnRemoveCurrent">X</button>` +
        `</li>`);
    }
    document.querySelector("#inputTask").value = ""; //Clear the current added task from the input.       
});

document.querySelector("#inputTask").addEventListener("keydown", function (e) { 
    if (e.which == 13) {
        document.querySelector("#btn-add").click();
    }
});

document.querySelector('body').addEventListener('click', function(event) { //An eventListener added to the body but that get executed for specific button's className

    if (event.target.className === 'btnRemoveCurrent') {
        console.log(event.target.closest("li").innerText);
        let currentTask = event.target.closest("li").innerText.match(/[\W\s\w]+(?= \W)/m).join(); //Regex to select the task name (every char, symbol and/or spaces) just before button
        let index = tasks.indexOf(currentTask);
        tasks.splice(index,1);
    
        saveCurrentTasksToLocal();
    
        event.target.closest("li").remove();
    }

    if (event.target.className === "btnDoneCurrent") {
        console.log(event.target.closest("li").innerText);
        taskDone = event.target.closest("li").innerText.match(/[\W\s\w]+(?= \W)/m).join(); //Regex to select the task name (every char, symbol and/or spaces) just before button

        done.push(taskDone);
        saveDoneTasksToLocal();

        let index = tasks.indexOf(taskDone);
        tasks.splice(index,1);

        saveCurrentTasksToLocal();
        
        event.target.closest("li").remove();
        checkDoneTasks();
    }

    if (event.target.className === "btnRevertCurrent") {
        
        inputVal = event.target.closest("li").innerText.match(/[\W\s\w]+(?= \W)/m).join(); //Regex to select the task name (every char, symbol and/or spaces) just before button

        tasks.push(inputVal);
        saveCurrentTasksToLocal();
        
        document.querySelector("#tasks").insertAdjacentHTML("beforeend","<li>" + inputVal +
        ` <button class="btnDoneCurrent">✓</button>` + 
        ` <button class="btnRemoveCurrent">X</button>` +
        `</li>`);

        //Remove from done array:
        let index = done.indexOf(inputVal);
        done.splice(index,1);
        saveDoneTasksToLocal();

        event.target.closest("li").remove();
        checkDoneTasks();
    }

});

function checkDoneTasks() {
    document.querySelector("#done").innerHTML = ""; // Remove the current tasks, to avoid overwritting content.

    done.forEach(el => {
        document.querySelector("#done").insertAdjacentHTML("beforeend","<li>" + el + 
        ` <button class="btnRevertCurrent">↺</button>` +
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