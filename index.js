const { Command } = require('commander');

const { listContacts, getContactById, removeContact, addContact } = require('./contacts.js');




const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');


program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts().then(contacts => console.log('Список контактов:', contacts));
      break;

    case 'get':
      getContactById(id).then(contact => console.log('Контакт по id:', contact));
      break;

    case 'add':
      addContact(name, email, phone)
        .then(contact => console.log('Контакт добавлен:', contact));
      break;
    
    case 'remove':
      removeContact(id).then(contact => console.log('Контакт удален:', contact));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);