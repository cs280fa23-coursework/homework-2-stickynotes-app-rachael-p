
import NotesWall from "./NotesWall.js";

class StickyNotesApp {
    constructor() {
        this.wall = new NotesWall();
        this.clickCount = 0;
    }

    // Render the sticky notes 
    renderNotes() {
        const wallElement = document.getElementById("notes-wall");
        wallElement.innerHTML = "";

        for (let k = 0; k < this.wall.length; k++) { 
            // sticky note background
            const noteElement = document.createElement("div");
            noteElement.className = "relative w-40 h-40 p-0 m-2 overflow-y-auto transition-transform transform bg-yellow-200 shadow-lg note hover:scale-105";
            // trash icon button
            const trashButton = document.createElement("button");
            trashButton.className = "absolute w-5 h-5 leading-5 text-center transition-opacity opacity-0 cursor-pointer delete-btn top-1 right-1 hover:opacity-100";
            trashButton.textContent = "🗑";
            // displayed text
            const noteText = document.createElement("div");
            noteText.className = "p-4 note-text";
            noteText.textContent = this.wall.getNote(k).text;
            noteText.style.whiteSpace = "pre";  // preserve whitespace in the note
            // textarea for editing
            const noteTextArea = document.createElement("textarea");
            noteTextArea.className = "absolute top-0 left-0 hidden w-full h-full p-4 transition-transform transform bg-yellow-300 shadow-xl resize-none outline-rose-700 outline-offset-0 note-edit note hover:scale-105";
            noteTextArea.textContent = this.wall.getNote(k).text;

            noteElement.addEventListener("click", this.handleNoteClick.bind(this));

            noteElement.appendChild(trashButton);
            noteElement.appendChild(noteText);
            noteElement.appendChild(noteTextArea);
            wallElement.appendChild(noteElement);
        }
    }


    // Handle if user presses enter to add a new note
    handleNewNoteKeyDown(event) {
        if (event.key === "Enter" && !event.shiftKey && event.target.value.trim() !== '') {
            event.preventDefault();  // stop textarea from entering a newline when enter is pressed
            this.wall.addNote(event.target.value.trim());
            event.target.value = "";
            this.renderNotes();
        }
    }

    // Handle if user clicks on note to delete or edit the note
    handleNoteClick(event) {
        if (event.target.textContent === "🗑"){  // deleting a note
            this.wall.deleteNote(event.currentTarget.innerText.slice(2).trim());
            this.renderNotes();
        }

        this.clickCount++;
        if (this.clickCount === 2) {  // editing a note
            this.clickCount = 0;
            if (event.target.classList.contains("note-text")) {
                const oldText = event.target.textContent;
                event.target.classList.add("hidden");
                let noteTextArea = event.currentTarget.querySelector(".note-edit");
                noteTextArea.classList.remove("hidden");
                noteTextArea.addEventListener("keydown", this.handleEditNoteEnter.bind(this, oldText))  // this is how to pass arguments with bind and addEventListener 
                document.getElementsByTagName("html")[0].addEventListener("click", this.handleEditNoteClick.bind(this, oldText, event.currentTarget.querySelector(".note-edit")));
            }
        }
    }

    // Process editing a note when press enter
    handleEditNoteEnter(oldText, event) {  // see above about passing arguments if event is one of them (it should go last)
        if (event.key === "Enter" && !event.shiftKey && event.target.value.trim() !== '') {
            event.preventDefault();  // stop textarea from entering a newline when enter is pressed
            let newText = event.target.value.trim();
            this.wall.editNote(oldText, newText);
            this.renderNotes();
        }
    }

    // Process editing a note when click outside the note
    handleEditNoteClick(oldText, noteTextArea, event) {
        if (!(event.target.matches(".note,.note-text,.note-edit,delete-btn"))){
            this.clickCount = 0;
            let newText = noteTextArea.value.trim();
            this.wall.editNote(oldText, newText);
            this.renderNotes();
        }
    }

    init() {
        document.getElementById("new-note").addEventListener("keydown", this.handleNewNoteKeyDown.bind(this));
        this.renderNotes();
    }
}

export default StickyNotesApp;

// if reading properties of undefined, usually it's because you have to bind "this"