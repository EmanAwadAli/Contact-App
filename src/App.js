import { useState, useEffect } from "react";
import "./css/App.css";
import ListContacts from "./pages/ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI";
import CreateContact from "./pages/CreateContact";
import { Route, Routes, useNavigate} from "react-router-dom";

const App = () => {

  let navigate = useNavigate();

  // Contacts State
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch Contacts Data From The Server First App Render
    const getContacts = async () => {
      const res = await ContactsAPI.getAll();
      setContacts(res);
    }
    //Trigger 'getContacts' Function
    getContacts();
  }, []) 

  // Delete Contact
  const deleteContactHandler = (contact) => {
    // Delete Contact From Backend Server
    ContactsAPI.remove(contact);
    // Delete Contact From UI
    setContacts(contacts.filter( c => c.id !== contact.id ));
  }

  // Create New Contact
  const createContact = (contact) => {
    const create = async () => {
      // Add New Contact In The Backend Server
      let res = await ContactsAPI.create(contact);
      // Add New Contact To UI
      setContacts(contacts.concat(res));
    }
    // Trigger 'create' Function
    create();
    // After Submit New Contact Back to The main App Page (ListContacts Page)
    navigate('/');
  }

  return (
      <Routes>
        {/* List Contacts Page */}
        <Route exact path="/" element={<ListContacts contacts={contacts} deleteContact={deleteContactHandler}/>}/>
        {/* Add New Contact page */}
        <Route path="/create" element = { <CreateContact onCreateContact={ (contact) => { createContact(contact)}}/> } />
      </Routes> 
  )

};

export default App;
