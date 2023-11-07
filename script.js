`use strict`;

const btnAdd = document.getElementById('btn-add');
const listContainer = document.getElementById('list-container');
const titleEl = document.getElementById('title');

let list = [];
let isEditing = false;
let itemToEdit;

//create
//Read
//Delete
//Edit

// create function

// Adding Single List
const addContent = (item) => {
  const { id, title } = item;
  const listEl = document.createElement('li');
  listEl.classList.add('list-item');
  listEl.innerHTML = `
  <span class="list-text">${title}</span>

          <button class="btn-edit" id="btn-edit" onclick="editItem(${id})">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>

          <button class="btn-delete" id="btn-delete" onclick="deleteItem(${id})">
            <i class="fa-solid fa-trash"></i>
          </button>
  `;
  listContainer.appendChild(listEl);
};

// Iterating the all lists
const addContents = (list) => {
  listContainer.innerHTML = ``;
  list.forEach((item) => {
    addContent(item);
  });
};

// Edit Logic
const editItem = (id) => {
  isEditing = true;
  btnAdd.innerHTML = `Edit`;
  itemToEdit = list.find((item) => item.id === id);
  titleEl.value = itemToEdit.title;
};

// Delete Logic
const deleteItem = (id) => {
  list = list.filter((item) => item.id !== id);
  addContents(list);
};

// Adding Title and Creating Id Logic
btnAdd.addEventListener('click', () => {
  const title = titleEl.value;

  if (title) {
    if (isEditing) {
      //Edit Logic
      list = list.map((item) => {
        if (item.id === itemToEdit.id) {
          let updatedItem = { ...item, title: title };
          return updatedItem;
        } else {
          return item;
        }
      });

      isEditing = false;
      itemToEdit = null;
      btnAdd.innerHTML = `Add`;
    } else {
      const newItem = {
        id: Date.now(),
        title: title,
      };
      list.push(newItem);
    }
    addContents(list);
    titleEl.value = null;
  } else {
    alert('Title is Mandatory');
  }
});
