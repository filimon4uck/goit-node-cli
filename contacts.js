import fs from "fs/promises"
import path from "path"
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
const updateContacts = async (contacts)  => { 
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
} 

export const  listContacts= async()=> {
  const contacts = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(contacts);
}

export const getContactById = async (contactId) => {
  const contact = await listContacts();
  return contact.find(item => item.id === contactId)||null
  }

export const removeContact = async(contactId)=> {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(item => item.id === contactId);
  if (contactIndex === -1) {
    return null;

  }
  const [removedContact] = contacts.splice(contactIndex, 1);
  await updateContacts(contacts);
  return removedContact;
}

export const addContact = async (data) => {
  const id = nanoid();
  const newContact = { id, ...data };
  const contacts = await listContacts();
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}