import { useEffect, useState, useTransition } from "react";
import { getCountryData } from "../api/postApi";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const Filters = () => {
	const [isPending, startTransition] = useTransition();
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		startTransition(async () => {
			const res = await getCountryData();
			setCountries(res.data);
		});
	}, []);

	// Get top 3 populated countries
	const top3Populated = [...countries].sort((a, b) => b.population - a.population).slice(0, 3);
	const top3Labels = top3Populated.map((c) => c.name.common);
	const top3Data = top3Populated.map((c) => c.population / 1000000); // Convert to millions
	// Get bottom 3 populated countries
	const bottom3Populated = [...countries]
		.filter((c) => c.population > 0)
		.sort((a, b) => a.population - b.population)
		.slice(0, 3);
	const bottom3Labels = bottom3Populated.map((c) => c.name.common);
	const bottom3Data = bottom3Populated.map((c) => c.population / 1000); // Convert to thousands

	window.newdata = top3Populated;
	console.log(top3Data);

	const topData = {
		labels: top3Labels,
		datasets: [
			{
				label: "Population",
				data: top3Data,
				backgroundColor: ["#66CDAA","#20B2AA", "#008B8B"],
			},
		],
	};

	const bottomData = {
		labels: bottom3Labels,
		datasets: [
			{
				label: "Population",
				data: bottom3Data,
				backgroundColor: ["#FF6384","#DB7093", "#F400A1"],
			},
		],
	};

	const topOptions = {
		responsive: true,
		plugins: {
			legend: { display: false },
		},
		scales: {
			x: {
				title: {
					display: true,
					text: "Country",
				},
			},
			y: {
				title: {
					display: true,
					text: "Population (in millions)",
				},
			},
		},
	};

	const bottomOptions = {
		responsive: true,
		plugins: {
			legend: { display: false },
		},
		scales: {
			x: {
				title: {
					display: true,
					text: "Country",
				},
			},
			y: {
				title: {
					display: true,
					text: "Population (in thousands)",
				},
			},
		},
	};

	// Get unique regions from countries array
	const uniqueRegions = [...new Set(countries.map((country) => country.region))].filter(Boolean);

	return (
		<>
			<main className="container">
				<h2 className="container-title">Insights about the world</h2>
				{/* top 3 populated countries */}
				<div className="insightSection">
					<h2 className="headingTop">Top 3 Populated Countries</h2>
					<ul>
						{top3Populated.map((country, idx) => (
							<li key={idx}>
								{country.name.common} - {country.population.toLocaleString()}
							</li>
						))}
					</ul>
				</div>
				{/* Chart for top 3 populated countries */}

				<Bar data={topData} options={topOptions} />

				{/* Bottom 3 populated countries */}
				<div className="insightSection">
					<h2 className="headingTop">Bottom 3 Populated Countries</h2>
					<ul>
						{bottom3Populated.map((country, idx) => (
							<li key={idx}>
								{country.name.common} - {country.population.toLocaleString()}
							</li>
						))}
					</ul>
				</div>
				{/* Chart for bottom 3 populated countries */}
				<Bar data={bottomData} options={bottomOptions} />
			</main>
		</>
	);
};
