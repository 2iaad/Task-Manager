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
        
    }
    inputText.value = "";
    saveData();
}

/**
 * event listener for manipulation the list elements:
 *      -> Mark task as done.
 *      -> Delete task.
 */

listContainer.addEventListener( "click",    // first parameter      -> (Event type)
                                function(e) // second parameter    -> (Event handler function with event object "e")
/**
 *  - this function run each time a click occures on the listContainer.
 *  - e object that contains properties (informations about the click), most important one is:
 *        e.target -> the exact element clicked
 */
                                {
                                    if (e.target.tagName === "LI") {            // if user clicked on <li><li/> item (Task)
                                        e.target.classList.toggle("checked")    // .toggle() -> Removes the token from the list if it exists, or adds it to the list if it doesn't. Returns a boolean indicating whether the token is in the list after the operation.
                                    }
                                    else if (e.target.tagName === "SPAN") {     // if user clicked on <span><span/> item (cross)
                                        e.target.parentElement.remove()         // removes the parent of the <span><span/>, which is <li><li/>
                                    }
                                    saveData();
                                },
                                false)      // third parameter     -> (useCapture = false (event bubbling))


/**
 *  localStorage -> browser feature that lets you store data locally (in your browser) even after refreshing or closing the page.
 */
                                
function    saveData()
{
    localStorage.setItem("data", listContainer.innerHTML)
}

function    updateData()
{
    listContainer.innerHTML = localStorage.getItem("data");
}

/**
 * update the list each time the page is refreshed
 */

updateData();