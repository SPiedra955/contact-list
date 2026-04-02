import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";


export const Home = () => {

	return (
		<div className="text-center mt-5">
			<h1>Agenda API</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
		</div>
	);
}; 