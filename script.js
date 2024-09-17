 document.addEventListener('DOMContentLoaded', loadNotes);

 const createBtn = document.querySelector(".btn");

 createBtn.addEventListener("click", function() {
    createNote();
});

function createNote(noteText = '') {
    let noteContainer = document.querySelector('.note-container');
    
 
    if (!noteContainer) {
        noteContainer = document.createElement('div');
        noteContainer.classList.add('note-container');
        document.body.appendChild(noteContainer);
    }

    const noteWrapper = document.createElement('div');
    noteWrapper.classList.add('note-wrapper');

    const notesOperation = document.createElement('div');
    notesOperation.classList.add('notes-operation');

    const editButton = document.createElement('button');
    const editImg = document.createElement('img');
    editImg.src = 'img/edit.png';
    editImg.alt = 'edit';
    editImg.classList.add('edit');
    editButton.appendChild(editImg);


    const deleteButton = document.createElement('button');
    const deleteImg = document.createElement('img');
    deleteImg.src ='img/delete.png';
    deleteImg.alt = 'delete';
    deleteImg.classList.add('delete');
    deleteButton.appendChild(deleteImg);

    deleteButton.addEventListener('click', function() {
      noteWrapper.remove();
      saveNotes();
    });

    editButton.addEventListener('click', function(){
      const inputBox = noteWrapper.querySelector('.input-box');
      inputBox.contentEditable = "true";
      inputBox.focus();
      inputBox.addEventListener('blur', function(){
      inputBox.contentEditable = "false";
      saveNotes();

      });
    });

    notesOperation.appendChild(editButton);
    notesOperation.appendChild(deleteButton);


    const boxDiv = document.createElement('div');
    boxDiv.classList.add('box');
    const inputBox = document.createElement('p');
    inputBox.contentEditable ="true";
    inputBox.classList.add('input-box');
    boxDiv.appendChild(inputBox);

    noteWrapper.appendChild(notesOperation);
    noteWrapper.appendChild(boxDiv)

    noteContainer.appendChild(noteWrapper);

    saveNotes();
}

function saveNotes() {
    const notes = [];
    document.querySelectorAll('.note-wrapper').forEach(note => {
        const noteContent = note.querySelector('.input-box').innerText;
        notes.push(noteContent);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(noteText => {
        createNote(noteText); // Recreate each note on page load
    });
}
