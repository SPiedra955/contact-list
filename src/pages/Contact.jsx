import { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import contactApi from '../services/contactApi.js'
import CreateAgenda from '../components/CreateAgenda.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faLocationDot, faEnvelope, faPen, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

export const Contact = () => {

    const { store, dispatch } = useGlobalReducer()
    const [contacts, setContacts] = useState([])
    const { slug } = useParams()

    useEffect(() => {
        if (slug) {
            contactApi.getUserContacts(slug).then(data => {
                setContacts(data.contacts || data);
            });
        }
    }, [slug]);
    const navigate = useNavigate()

    return (
        <div className="text-center mt-5 container">

            <h1>Contacts </h1>
            <div className="container text-end">
                <button className="btn btn-success" onClick={() => navigate(`/add-contact/${slug}`)}>
                    Add new contact
                </button>
            </div>
            <div className="container mt-4">
                {contacts.map(contact => (
                    <div
                        key={contact.id}
                        className="border p-3 mb-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center"
                    >
                        <div className="text-start mb-3 mb-md-0">
                            <p className="mb-1">
                                <FontAwesomeIcon icon={faLocationDot} /> {contact.name}
                            </p>
                            <p className="mb-1">
                                <FontAwesomeIcon icon={faPhone} /> {contact.phone}
                            </p>
                            <p className="mb-0">
                                <FontAwesomeIcon icon={faEnvelope} /> {contact.email}
                            </p>
                        </div>

                        <div className="d-flex gap-3">
                            <button className="btn btn-outline-danger btn-sm">
                                <FontAwesomeIcon icon={faTrash} /> Delete
                            </button>
                            <button className="btn btn-outline-primary btn-sm">
                                <FontAwesomeIcon icon={faPen} /> Update
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}; 