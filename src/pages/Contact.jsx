import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import contactApi from '../services/contactApi.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faLocationDot, faEnvelope, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Contact = () => {

    const { store, dispatch } = useGlobalReducer()
    const { slug } = useParams()
    const navigate = useNavigate()
    const contacts = store.contacts || []
    const [updateData, setUpdateData] = useState({
        name: '',
        phone: '',
        email: '',
        address: ''
    })
    const [idToUpdate, setIdToUpdate] = useState(null);

    useEffect(() => {
        if (slug) {
            contactApi.getUserContacts(slug).then(data => {
                dispatch({
                    type: 'setContacts',
                    payload: {
                        contacts: data.contacts || data
                    }
                })
            });
        }
    }, [slug, dispatch]);


    const deleteContact = async (contact_id) => {
        await contactApi.deleteAgendaContact(slug, contact_id);
        dispatch({
            type: 'deleteContactInAgenda',
            payload: {
                id: contact_id
            }
        });
    };

    const handleOpenModal = (contact) => {
        setIdToUpdate(contact.id)
        setUpdateData({
            name: contact.name || '',
            phone: contact.phone || '',
            email: contact.email || '',
            address: contact.address || ''
        });
    };

    const UpdateContact = async (e) => {
        e.preventDefault()
        await contactApi.UpdateUserContact({
            slug,
            contactId: idToUpdate,
            formData: updateData
        });
        const refreshedData = await contactApi.getUserContacts(slug);

        dispatch({
            type: 'setContacts',
            payload: {
                contacts: refreshedData.contacts || refreshedData
            }
        });
    }


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
                            <h4 >
                                {contact.name}
                            </h4>
                            <p className="mb-1">
                                <FontAwesomeIcon icon={faLocationDot} /> {contact.address}
                            </p>
                            <p className="mb-1">
                                <FontAwesomeIcon icon={faPhone} /> {contact.phone}
                            </p>
                            <p className="mb-0">
                                <FontAwesomeIcon icon={faEnvelope} /> {contact.email}
                            </p>
                        </div>

                        <div className="d-flex gap-3">
                            <button className="btn btn-outline-danger btn-sm " onClick={() => deleteContact(String(contact.id))}>
                                <FontAwesomeIcon icon={faTrash} /> Delete
                            </button>
                            <button className="btn btn-outline-primary btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target={`#updateModal-${contact.id}`}
                                onClick={() => handleOpenModal(contact)}
                            >
                                <FontAwesomeIcon icon={faPen} /> Update
                            </button>
                        </div>
                        {/* Modal */}
                        <div
                            className="modal fade"
                            id={`updateModal-${contact.id}`}
                            tabIndex="-1"
                            aria-labelledby="updateModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="updateModalLabel">Update contact</h1>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        {/* Form */}
                                        <form onSubmit={UpdateContact}>
                                            <div className="mb-3 text-start">
                                                <label htmlFor="name" className="form-label">Name</label>
                                                <input type="text" className="form-control" id="contactName" value={updateData.name} name="name"
                                                    onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })} />
                                            </div>
                                            <div className="mb-3 text-start">
                                                <label htmlFor="email" className="form-label">Email</label>
                                                <input type="email" className="form-control" id="email" value={updateData.email} name="email"
                                                    onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })} />
                                            </div>
                                            <div className="mb-3 text-start">
                                                <label htmlFor="phone" className="form-label">Phone</label>
                                                <input type="tel" className="form-control" id="phone" value={updateData.phone} name="phone"
                                                    onChange={(e) => setUpdateData({ ...updateData, phone: e.target.value })} />
                                            </div>
                                            <div className="mb-3 text-start">
                                                <label htmlFor="address" className="form-label">Address</label>
                                                <input type="text" className="form-control" id="address" value={updateData.address} name="address"
                                                    onChange={(e) => setUpdateData({ ...updateData, address: e.target.value })} />
                                            </div>
                                            <div className="modal-footer border-0">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                                    Close
                                                </button>
                                                <button type="submit" className="btn btn-primary">Update</button>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}; 