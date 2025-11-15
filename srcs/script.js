const inputText = document.getElementById("input-text")
const listContainer = document.getElementById("list-container")

function AddTask(event) // pass the event to remove the "?"
{
    /**
     *      By default, submitting a form sends a GET request to the same URL

            [User types "Task"] 
                    v
            <form> submits
                    v
            Browser sends GET request to URL
                    v
            http://127.0.0.1:56740/srcs/?task=Buy+milk
                    v
            Server responds (reloads page)
                    v
            Page refreshes → input cleared → URL shows ?
     */
    event.preventDefault(); // stops sending GET request
    
    if (inputText.value === '')
    {
        const formBackground = document.getElementById("fill-task")
        formBackground.classList.add("shake");

        setTimeout(() => { // Run code after a delay.
            formBackground.classList.remove("shake");
        }, 300); // 300ms -> 0.3s
    }
    else
    {
        let li = document.createElement("li") // create list element
        li.innerHTML = inputText.value
        listContainer.appendChild(li)

        let liRm = document.createElement("span") // create list cross (to remove list element)
        liRm.innerHTML = "\u00d7" // code that represents the cross icon

        li.appendChild(liRm) // append cross to list
        
        inputText.value = "";
    }
}