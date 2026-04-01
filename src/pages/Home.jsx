import { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import contactApi from '../services/contactApi.js'

export const Home = () => {

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



	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<ul>
				{store.agendas?.map(el => <li key={el.id}>{el.slug}</li>)}
			</ul>
		</div>
	);
}; 