import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from "react-router-dom"; 
const ListContacts = ({contacts, deleteContact}) => {

    const [query, setQuery] = useState('');

    // Update Query Value Based On The search Field Value
    const updateQuery = (query) => {
        setQuery(query.trim());
    }

    // Fiter Contacts List Based On The search Field Value
    const showingContacts = query === '' ? contacts : contacts.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase())
    )
   
    // Clear Search Field Value When displaying all conatcts In The App
    const cleartQuery = () => {
        updateQuery('');
    }

    return (
        // Contacts List
        <div className='list-contacts'>
            {/* Conatct List Search */}
            <div className='list-contacts-top'>
                <input 
                    className="search-contacts"
                    type="text"
                    placehoder="search Contacts"
                    value={query}
                    onChange = {(event) => {
                        updateQuery(event.target.value);
                    }}
                />
                <Link to='/create' className='add-contact'>
                    Add Conatct
                </Link>
            </div>

            {/* Displaying Message Based On Available Contacts Matched The Search Field Value */}
            {
                showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Now showing {showingContacts.length} of {contacts.length}</span>
                        <button onClick={cleartQuery}>Show all</button>
                    </div>
                )
            }

            {/* Contact List */}
            <ol className="contact-list">
            {showingContacts.map(contact => {
                return (
                    // Conatct List Item
                    <li key={contact.id} className="contact-list-item">
                        <div
                            className="contact-avatar"
                            style={{
                                backgroundImage: `url(${contact.avatarURL})`,
                            }}
                            >
                        </div>
                        <div className="contact-details">
                            <p>{contact.name}</p>
                            <p>{contact.handle}</p>
                        </div>
                        <button className="contact-remove" onClick={() => deleteContact(contact)}>&times;</button>
                    </li>
                )
            })}
            </ol>
        </div>
    )
}

ListContacts.propTypes = {
    contacts : PropTypes.array.isRequired,
    deleteContact: PropTypes.func.isRequired
}

export default ListContacts;