import { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import contactApi from '../services/contactApi.js'
import CreateAgenda from '../components/CreateAgenda.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
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
			<h1 className="text-center mb-4 fw-bold">Agenda API</h1>
			<h4 className="text-muted mb-3 text-center">Select an agenda</h4>
			<div className="mt-4">
				{store.agendas?.map((ele) => (
					<div
						key={ele.id}
						className="d-flex justify-content-between align-items-center border p-2">
						<span onClick={() => navigate(`/contacts/${ele.slug}`)} style={{ cursor: "pointer" }}>
							{ele.slug}
						</span>
						<div className="d-flex gap-2">
							<button className="btn btn-outline-primary btn-sm" onClick={() => navigate(`/contacts/${ele.slug}`)}>
								<FontAwesomeIcon icon={faEye} /> Contacts
							</button>
							<button onClick={() => deleteInfo(ele.slug)} className="btn btn-outline-danger btn-sm"
							><FontAwesomeIcon icon={faTrash} /> Delete</button>
						</div>
					</div>
				))}
			</div>

			<h4 className="text-muted mb-3 mt-4">Or create new agenda</h4>

			<CreateAgenda></CreateAgenda>
		</div>
	);
}; 