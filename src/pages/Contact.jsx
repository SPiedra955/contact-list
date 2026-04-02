import { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import contactApi from '../services/contactApi.js'

export const Contact = () => {

    const { store, dispatch } = useGlobalReducer()
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        contactApi.getUser().then(data => dispatch({
            type: 'getAgendas',
            payload: {
                agendas: data.agendas
            }
        }))
    }, [])

    const selectAgenda = (slug) => {
        dispatch({
            type: 'selectAgenda',
            payload: {
                agenda: slug
            }
        })
    }

    useEffect(() => {
        contactApi.getAgenda(store.agenda).then(data => dispatch({
            type: 'setContacts',
            payload: {
                contacts: data.contacts
            }
        }))
    }, [store.agenda])



    return (
        <div className="text-center mt-5">
            <h1>Agendas</h1>

            <ul>
                {store.agendas?.map(el => <li key={el.id} onClick={() => selectAgenda(el.slug)}>{el.slug}</li>)}
            </ul>
        </div>
    );
}; 