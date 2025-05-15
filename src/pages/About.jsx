import { useEffect, useState, useTransition } from "react";
import { NavLink } from "react-router-dom";
import { getCountryData } from "../api/postApi";
import { Loader } from "../components/UI/Loader";

export const About = () => {
	const [isPending, startTransition] = useTransition();
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		startTransition(async () => {
			const res = await getCountryData();
			// setCountries(res.data);
			const sortCountry = [...res.data].sort((a, b) => {
				return a.name.common.localeCompare(b.name.common);
			});
			setCountries(sortCountry.slice(0, 12));
			console.log(countries);
		});
	}, []);

	if (isPending) return <Loader />;

	return (
		<section className="section-about container">
			<h2 className="container-title">Mapping the Planet with Precision.</h2>
		

			<div className="gradient-cards">
				{countries.map((country, index) => {
					const { name, capital, population, region } = country;
					console.log(country);
					return (
						<div className="card" key={index}>
							<div className="container-card bg-blue-box">
								<p className="card-title">{name.common.length > 15 ? name.common.slice(0, 15) + "..." : name.common}</p>
								<p>
									<span className="card-description">Region:</span> {region}
								</p>
								<p>
									<span className="card-description">Capital:</span>
									{capital[0]}
								</p>
								<p>
									<span className="card-description">Population:</span>
									{population.toLocaleString()}
								</p>

								<NavLink to={`/country/${name.common}`} className="read-more">
									<button>Read More</button>
								</NavLink>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};
