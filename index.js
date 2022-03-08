    let tasks = [];
    let done = [];
    let inputVal = "";
    let inputIndex = 0;
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
        
        taskDone = $(this).closest("li").text().match(/\w+(?=\s)/m).join();
        done.push(taskDone);
        let index = tasks.indexOf(taskDone);
        tasks.splice(index,1);
        
        $(this).closest("li").remove();
        checkDoneTasks();
    })
    
    function checkDoneTasks() {
        $("#done").html(""); // Remove the current content, to avoid overwritting content.
        done.forEach(el => {
            // console.log($("#done").val());
            $("#done").append("<li>" + el + 
            //` <button class="btnRevertCurrent">↺</button>` +
            "</li>");
        });
        
    }

    

