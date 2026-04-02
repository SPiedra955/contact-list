import { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer";
import contactApi from '../services/contactApi.js'

const CreateAgenda = () => {
    const [formData, setFormData] = useState({ slug: '' })
    const { store, dispatch } = useGlobalReducer()

    const enviarDatos = (e) => {
        e.preventDefault()
        if (formData.slug.trim().length < 2) return alert('datos incorrectos')
        contactApi.createNewAgenda(formData).then(data => dispatch({
            type: 'createAgenda',
            payload: { newSlug: data }
        })
        )
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    return (
        <div>
            <form className="form-control" onSubmit={enviarDatos}>
                <input className="form-control" type="text" placeholder="Nueva agenda" name="slug" value={formData.slug} onChange={handleChange} />
                <input className="btn btn-success" type="submit" />
            </form>
        </div>
    )
};

export default CreateAgenda