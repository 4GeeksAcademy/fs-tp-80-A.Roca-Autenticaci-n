import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Register } from "../component/register.jsx"

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<Register />
		</div>
	);
};
