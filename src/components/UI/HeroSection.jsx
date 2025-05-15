import { FaLongArrowAltRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
// import PieChart from "./pieChart";

export const HeroSection = () => {
	return (
		<main className="hero-section main">
			<div className="container grid grid-two-cols">
				<div className="hero-content">
					<h1 className="heading-xl">Discover the World Beyond Borders.<br/><span>"Your Gateway to Geography."</span></h1>
					<p className="paragraph">A modern, interactive world atlas designed to help you discover countries, capitals, landmarks, and more. Perfect for students, travelers, and curious minds eager to learn about our planet.</p>
					<button className="btn btn-darken btn-inline bg-white-box">
						<NavLink to={`/about`} className="nav-link">
							Start Exploring <FaLongArrowAltRight />
						</NavLink>
					</button>
				</div>
				<div className="hero-image">
					<img src="/images/global.png" alt="world is beauty" className="banner-image" />
					{/* <PieChart /> */}
				</div>
			</div>
		</main>
	);
};
