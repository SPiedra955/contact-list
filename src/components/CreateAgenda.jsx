import { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer";
import contactApi from '../services/contactApi.js'

const CreateAgenda = () => {
    const [formData, setFormData] = useState({ slug: '' })
    const { store, dispatch } = useGlobalReducer()

    const enviarDatos = async (e) => {
        e.preventDefault()
        if (formData.slug.trim().length < 2) return alert('datos incorrectos')
        await contactApi.createNewAgenda(formData)
        const data = await contactApi.getUser()
        dispatch({
            type: 'getAgendas',
            payload: {
                agendas: data.agendas
            }
        });
        setFormData({ slug: '' });
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    return (
        <div className="mt-4">
            <form className="form-control border-0 p-0" onSubmit={enviarDatos}>
                <input className="form-control form-control-lg" type="text" placeholder="Nueva agenda" name="slug" value={formData.slug} onChange={handleChange} />
                <input className="btn btn-success mt-4 btn-lg" type="submit" />
            </form>
        </div>
    )
};

export default CreateAgenda