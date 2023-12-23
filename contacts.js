const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  return fs.readFile(contactsPath).then(data => {
    const array = JSON.parse(data);
    return array;
  }).catch(err => console.error(err.msg));
}

async function getContactById(contactId) {
  return fs.readFile(contactsPath).then( async data => {
    const array = await JSON.parse(data);
    return array.find(contact => contact.id === contactId) || null;
  }).catch(err => console.error(err.msg));
}

async function removeContact(contactId) {
  const array = JSON.parse(await fs.readFile(contactsPath));

  const indexOfContact = array.findIndex(contact => contact.id === contactId);

  if (indexOfContact === -1) {
    return null;
  } else {
    const deletedContact = array.splice(indexOfContact, 1);
    const newArray = array.filter(contact => contact.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newArray, null, 2));
    return deletedContact;
  }

}

async function addContact(name, email, phone) {
  const array = JSON.parse(await fs.readFile(contactsPath));
  let contact = {};

  if (name === '' || email === '' || phone === '') {
    return null;
  } else {
    contact = {
      id: crypto.randomUUID().toString(),
      name,
      email,
      phone
    }
  };
  const newArray = array.concat(contact);
  fs.writeFile(contactsPath, JSON.stringify(newArray, null, 2));

  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};