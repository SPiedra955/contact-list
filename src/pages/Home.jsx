import { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import contactApi from '../services/contactApi.js'
import CreateAgenda from '../components/CreateAgenda.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [contacts, setContacts] = useState([])
	const [agendas, setAgendas] = useState([])
	const navigate = useNavigate()
	useEffect(() => {
		contactApi.getUser().then(data => dispatch({
			type: 'getAgendas',
			payload: {
				agendas: data.agendas
			}
		}))
	}, [])



	useEffect(() => {
		// Comprobamos que nos lleguen los datos del GET si no devolvemos nada
		if (!store.agenda) return;
		contactApi.getAgenda(store.agenda)
			.then(data => {
				// Si tenemos datos los pasamos al store por medio del dispatch
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

	const deleteInfo = async (slug) => {
		await contactApi.deleteAgenda(slug);
		const data = await contactApi.getUser();
		dispatch({
			type: 'getAgendas',
			payload: {
				agendas: data.agendas
			}
		});
	};


	return (
		<div className="text-center mt-5 container">
			<h1>Agenda API</h1>
			<h2 className="mt-5">Select an agenda</h2>
			<select className="form-select form-select-lg mt-4"
				aria-label=".form-select-lg example"
				value=""
				onChange={(e) => navigate(`/contacts/${e.target.value}`)}>
				{store.agendas?.map((ele, index) => (
					<option key={`${ele.id}-${index}`} value={ele.slug} >
						{ele.slug}
					</option>
				))}
			</select>

			<h2 className="mt-4">Or create new agenda</h2>

			<CreateAgenda></CreateAgenda>
		</div>
	);
}; 