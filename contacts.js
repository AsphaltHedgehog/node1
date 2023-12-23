const fs = require('fs').promises;
const path = require('path');




const contactsPath = path.join(__dirname, 'db', 'contacts.json');


// TODO: задокументувати кожну функцію
function listContacts() {
  // ...твій код. Повертає масив контактів.
  return fs.readFile(contactsPath).then(data => {
    const array = JSON.parse(data);
    console.log(array)
  }).catch(err => console.error(err.msg));
}

function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  return fs.readFile(contactsPath).then(data => {
    const array = JSON.parse(data);
    if (array.includes(contactId)) {
      return array.find(contact => contact.id === contactId);
    } else {
      return null;
    }
  }).catch(err => console.error(err.msg));
}

function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту. 
}