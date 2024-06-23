// console.log("Welcome to notes app. This is app.js");


// If the user adds a note, add it to the localStorage

// showNotes();
console.log(localStorage)
alert("Select the user name from the user select dropdown")
let user = document.getElementById("user");
let dropdownMenuButton = document.getElementById("dropdownMenuButton");
let greet = document.getElementById("greet")
const users = [
    {
        name: "Akshita",
        notes: "[]",
        notes_title: "[]",
    },
    {
        name: "Laala",
        notes: "[]",
        notes_title: "[]",
    },
    {
        name: "Aditi",
        notes: "[]",
        notes_title: "[]",
    }
];
let id_no;
let user123 = localStorage.getItem("user123");

if (!user123) {

    localStorage.setItem("user123", JSON.stringify(users));
}
user.addEventListener("click", (e) => {
    let innerHTML = e.target.innerHTML
    dropdownMenuButton.innerHTML = innerHTML;
    greet.innerHTML = "Welcome To Magic Notes:" + " " + innerHTML
    id_no = e.target.id

    showNotes();


})
let addBtn = document.getElementById("addBtn");
let addTxt = document.getElementById("addTxt");
let notesobj;

addBtn.addEventListener("click", () => {
    let title = prompt("Enter the title of your notes");
    let user123 = (localStorage.getItem("user123"));


    if (user123) {
        const userData = JSON.parse(user123);
        const targetName = ["Akshita", "Laala", "Aditi"];
        const targetObject = userData.find(item => item.name === targetName[id_no]);
        if (targetObject) {

            // Update the "notes" property of the target object
            let notesObj = (JSON.parse(targetObject.notes));
            let notes_title = (JSON.parse(targetObject.notes_title));
            notesObj.push(addTxt.value)
            notes_title.push(title)
            targetObject.notes = JSON.stringify(notesObj)

            targetObject.notes_title = JSON.stringify(notes_title)

            // Convert the JavaScript array of objects back to a JSON string
            const updatedUserDataJSON = JSON.stringify(userData);
            // Store the updated JSON string back in localStorage
            localStorage.setItem("user123", updatedUserDataJSON);
            // Now, "user_data" in localStorage contains the updated data
        }

    }

    // Clear the input field
    addTxt.value = null;

    // Call showNotes to update the displayed notes
    showNotes();

});


// Function to show elements from localStorage
function showNotes() { // Accept notes_title as a parameter
    let user123 = localStorage.getItem("user123");
    let notesElm = document.getElementById("notes");
    if (user123) {
        const userData = JSON.parse(user123);
        const targetName = ["Akshita", "Laala", "Aditi"];
        const targetObject = userData.find(item => item.name === targetName[id_no]);

        if (targetObject) {

            let notesObj = (JSON.parse(targetObject.notes));
            let notes_title = (JSON.parse(targetObject.notes_title));
            let html = "";
            notesObj.forEach(function (element, index) {

                html += `
            <div class="noteCards my-2 mx-2 card " style="width: 18rem; ">
                    <div class="card-body">
                        <h5 class="card-title">${notes_title[index]}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
            });
            if (notesObj.length != 0) {
                notesElm.innerHTML = html;
            } else {
                notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
            }
        }
    }



}

// Function to delete a note
function deleteNote(index) {
    let bool = confirm("Are you sure you want to delete this note?");

    if (bool) {
        // Retrieve notes data and titles from localStorage once
        let user123 = localStorage.getItem("user123");
        if (user123) {
            const userData = JSON.parse(user123);
            const targetName = ["Akshita", "Laala", "Aditi"];
            const targetObject = userData.find(item => item.name === targetName[id_no]);
            if (targetObject) {

                let notesObj = (JSON.parse(targetObject.notes));
                let notes_title = (JSON.parse(targetObject.notes_title));
                // Check if the index is valid
                if (index >= 0 && index < notesObj.length) {
                    // Remove the note and its title
                    notesObj.splice(index, 1);
                    notes_title.splice(index, 1);

                    // Update localStorage with the modified data
                    targetObject.notes = JSON.stringify(notesObj)
                    targetObject.notes_title = JSON.stringify(notes_title)
                    const updatedUserDataJSON = JSON.stringify(userData);
                    // Store the updated JSON string back in localStorage
                    localStorage.setItem("user123", updatedUserDataJSON);
                    // Call showNotes to update the displayed notes
                    showNotes();
                }
            }
        }
    }
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCards")
    console.log(Array.from(noteCards))
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        console.log(cardTxt)
        let shouldDisplay = cardTxt.includes(inputVal);
        console.log(shouldDisplay)

        // Toggle a CSS class for displaying/hiding notes
        element.classList.toggle("hidden", !shouldDisplay);
    })
})
