import { useParams } from "react-router-dom";
import contactApi from '../services/contactApi.js'
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

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

    const sendData = async (e) => {
        e.preventDefault()
        if (formData.name.trim().length < 6 || formData.phone.trim().length < 6
            || formData.email.trim().length < 6 || formData.address.trim().length < 6)
            return alert('datos incorrectos')
        const data = await contactApi.createNewUserContact({ slug, contact: formData })

        dispatch({
            type: 'createNewAgendaContact',
            payload: {
                newContact: data.agendas
            }
        })
        setFormData({
            name: '',
            phone: '',
            email: '',
            address: ''
        });
    }



    return (
        <div className="container">
            <h1 className="text-center mt-5">
                Add Contact
            </h1>

            <form>
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

                <div class="d-grid gap-2">
                    <button class="btn btn-primary" type="button">Save</button>
                </div>
            </form>

        </div>
    )
}