import { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import contactApi from '../services/contactApi.js'
import CreateAgenda from '../components/CreateAgenda.jsx'

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
        // Comprobamos que nos lleguen los datos del GET si no devolvemos nada
        if (!store.agenda) return;
        contactApi.getAgenda(store.agenda)
            .then(data => {
                // Si tenemos datos los pasamos al store
                if (data && data.contacts) {
                    dispatch({
                        type: 'setContacts',
                        payload: { contacts: data.contacts }
                    });
                    // Si los datos son null o undefined devolvemos un array vacío
                } else {
                    dispatch({
                        type: 'setContacts',
                        payload: { contacts: [] }
                    });
                }
            })
    }, [store.agenda])

    const selectedContact = (contact) => {
        dispatch({
            type: 'selectContact',
            payload: contact
        })
    }

    return (
        <div className="text-center mt-5">
            <h1>Agendas</h1>

            <ul>
                {store.agendas?.map((ele, index) => (
                    <li key={`${ele.id}-${index}`} onClick={() => selectAgenda(ele.slug)}>
                        {ele.slug}
                    </li>
                ))}
            </ul>
            <h3>Contacts</h3>
            <ul>
                {store.contacts?.map(el => <li key={el.id} onClick={() => selectedContact(el)}> {el.name}</li>)}
            </ul>
            <h3>Crear agenda</h3>

            <CreateAgenda></CreateAgenda>
        </div>
    );
}; 