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
                $("#tasks").append("<li>" + tasks[i] +
                ` <button class="btnDoneCurrent">✓</button>` + 
                ` <button class="btnRemoveCurrent">X</button>` +
                `</li>`);
            }
        
            done.forEach(el => {
                $("#done").append("<li>" + el + 
                ` <button class="btnRevertCurrent">↺</button>` +
                "</li>");
            });
    }

    $("#btn-add").on("click", function(){
        inputVal = $("#inputTask").val();
        
        if (inputVal == "") {
            alert('Enter a task');
        } else {
            tasks.push(inputVal);
            saveCurrentTasksToLocal();

            $("#tasks").append("<li>" + inputVal +
            ` <button class="btnDoneCurrent">✓</button>` + 
            ` <button class="btnRemoveCurrent">X</button>` +
            `</li>`);
        }
        $("#inputTask").val(""); //Clear the current added task from the input.       
    });

    $("#inputTask").keydown(function (e) { 
        if (e.which == 13) {
            $("#btn-add").click();
        }
    });

    $("body").on("click",".btnRemoveCurrent", function(e){
        let currentTask = $(this).closest("li").text().match(/[\W\s\w]+(?= \W)/m).join(); //Regex to select the task name (every char, symbol and/or spaces) just before button
        let index = tasks.indexOf(currentTask);
        tasks.splice(index,1);

        saveCurrentTasksToLocal();

        $(this).closest("li").remove();
    });
    
    $("body").on("click",".btnDoneCurrent", function () {
       
        taskDone = $(this).closest("li").text().match(/[\W\s\w]+(?= \W)/m).join(); //Regex to select the task name (every char, symbol and/or spaces) just before button

        done.push(taskDone);
        saveDoneTasksToLocal();
        let index = tasks.indexOf(taskDone);
        tasks.splice(index,1);
        saveCurrentTasksToLocal();
        
        $(this).closest("li").remove();
        checkDoneTasks();
    })

    $("body").on("click", ".btnRevertCurrent", function () {
    
        inputVal = $(this).closest("li").text().match(/[\W\s\w]+(?= \W)/m).join(); //Regex to select the task name (every char, symbol and/or spaces) just before button

        tasks.push(inputVal);
        saveCurrentTasksToLocal();
        
        $("#tasks").append("<li>" + inputVal +
        ` <button class="btnDoneCurrent">✓</button>` + 
        ` <button class="btnRemoveCurrent">X</button>` +
        `</li>`);

        //Remove from done:
        let index = done.indexOf(inputVal);
        done.splice(index,1);
        saveDoneTasksToLocal();

        $(this).closest("li").remove();
        checkDoneTasks();
    });
    
    function checkDoneTasks() {
        $("#done").html(""); // Remove the current tasks, to avoid overwritting content.

        done.forEach(el => {
            $("#done").append("<li>" + el + 
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

    $("#btn-clearAll").on("click", function (e) {
        done = [];
        $("#done").html("");
        tasks = [];
        $("#tasks").html("");
        localStorage.clear();   
    });