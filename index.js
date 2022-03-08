    let tasks = [];
    let done = [];
    let inputVal = "";
    let taskDone = "";

    $("#btn-add").on("click", function(){
        inputVal = $("#inputTask").val();

        if (inputVal == "") {
            alert('Enter a task');
        } else {
            tasks.push(inputVal);
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

    $("body").on("click",".btnRemoveCurrent", function(){
        $(this).closest("li").remove();
    });

    $("body").on("click",".btnDoneCurrent", function () {
        //add crossed style:
        $(this).closest("li").toggleClass("crossed");
        //$(this).closest("li").attr("class","crossed");

        //console.log($(this).closest("li").text());
        
        taskDone = $(this).closest("li").text().match(/[\W\s\w]+(?= \W)/m).join(); //Regex to select the task name (every char, symbol and/or spaces) just before button
        //.html().match(/[\s\w]+(?=\s\<)/m).join(); //Regex to select the task text and not the rest of the html info (e.g.: from buttons)
        //console.log(taskDone);
        done.push(taskDone);
        let index = tasks.indexOf(taskDone);
        tasks.splice(index,1);
        
        $(this).closest("li").remove();
        checkDoneTasks();
    })

    $("body").on("click", ".btnRevertCurrent", function () {
    
        //console.log($(this).closest("li").text());
        //Add to active tasks:
        inputVal = $(this).closest("li").text().match(/[\W\s\w]+(?= \W)/m).join(); //Regex to select the task name (every char, symbol and/or spaces) just before button
        //.html().match(/[\s\w]+(?=\s\<)/m).join(); //regex to select the task text and not the rest of the html info (e.g.: from buttons).
        //console.log(inputVal);
        tasks.push(inputVal);
        
        $("#tasks").append("<li>" + inputVal +
        ` <button class="btnDoneCurrent">✓</button>` + 
        ` <button class="btnRemoveCurrent">X</button>` +
        `</li>`);

        //Remove from done:
        let index = done.indexOf(inputVal);
        done.splice(index,1);
        $(this).closest("li").remove();
        checkDoneTasks();
    });

    
    function checkDoneTasks() {
        $("#done").html(""); // Remove the current task, to avoid overwritting content.
        done.forEach(el => {
            // console.log($("#done").val());
            $("#done").append("<li>" + el + 
            ` <button class="btnRevertCurrent">↺</button>` +
            "</li>");
        });
        
    }

    
