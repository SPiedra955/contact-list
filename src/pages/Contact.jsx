import { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import contactApi from '../services/contactApi.js'
import CreateAgenda from '../components/CreateAgenda.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

export const Contact = () => {

    const { store, dispatch } = useGlobalReducer()
    const [contacts, setContacts] = useState([])
    const [agendas, setAgendas] = useState([])
    const { slug } = useParams()

    useEffect(() => {
        if (slug) {
            contactApi.getUserContacts(slug).then(data => {
                setContacts(data.contacts || data);
            });
        }
    }, [slug]);

    const selectAgenda = (slug) => {
        dispatch({
            type: 'selectAgenda',
            payload: {
                agenda: slug
            }
        })
    }

    return (
        <div className="text-center mt-5 container">
            <h1>Contacts </h1>
            <ul>
                {contacts.map(contact => (
                    <li key={contact.id}>
                        {contact.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}; 