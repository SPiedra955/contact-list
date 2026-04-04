import { useParams } from "react-router-dom";
import contactApi from '../services/contactApi.js'
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";

export function AddContact() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: ''
    })
    const { slug } = useParams()
    const [contacts, setContacts] = useState([])
    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()

    const sendData = async (e) => {
        e.preventDefault()
        if (formData.name.trim().length < 3 || formData.phone.trim().length < 3
            || formData.email.trim().length < 3 || formData.address.trim().length < 3)
            return alert('Datos incorrectos: cada campo debe tener al menos 3 caracteres')
        const data = await contactApi.createNewUserContact({ slug, contact: formData })

        dispatch({
            type: 'createNewAgendaContact',
            payload: {
                contacts: data.contacts
            }
        })
        setFormData({
            name: '',
            phone: '',
            email: '',
            address: ''
        });
        alert('¡Contacto creado correctamente!')
    }

    const goBack = () => {
        navigate(`/contacts/${slug}`)
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">
                Add Contact
            </h1>

            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="fullName" value={formData.name} name="fullName" onChange={(e) => setFormData({
                        ...formData,
                        name: e.target.value
                    })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={formData.email} name="email" onChange={(e) => setFormData({
                        ...formData,
                        email: e.target.value
                    })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="tel" className="form-control" id="phone" value={formData.phone} name="phone" onChange={(e) => setFormData({
                        ...formData,
                        phone: e.target.value
                    })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" value={formData.address} name="address" onChange={(e) => setFormData({
                        ...formData,
                        address: e.target.value
                    })} />
                </div>

                <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={goBack}>Back to Contacts</button>

                </div>
            </form>

        </div>
    )
}