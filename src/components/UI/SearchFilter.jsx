export const SearchFilter = ({ search, setSearch, filter, setFilter, countries, setCountries }) => {
	const handleInputChange = (event) => {
		event.preventDefault();
		setSearch(event.target.value);
	};

	const handleSortChange = (event) => {
		event.preventDefault();
		const value = event.target.value;
		sortCountries(value);
	};

	const handleSelectChange = (event) => {
		event.preventDefault();
		setFilter(event.target.value);
	};

	const sortCountries = (value) => {
		const sortCountry = [...countries].sort((a, b) => {
			return value === "asc" ? a.name.common.localeCompare(b.name.common) : b.name.common.localeCompare(a.name.common);
		});
		setCountries(sortCountry);
	};
	const uniqueRegions = [...new Set(countries.map(country => country.region))].filter(Boolean);

	return (
		<section className="section-searchFilter container">
			<div>
				<input type="text" placeholder="search" value={search} onChange={handleInputChange} />
			</div>
			<div className="select-container">
				<div className="select-comp">
					<label htmlFor="sort">Sort by:</label>
					<select className="select-section" onChange={handleSortChange}>
						<option value="asc">Ascending</option>
						<option value="des">Descending</option>
					</select>
				</div>
				<div className="select-comp">
					<label htmlFor="sort">Region:</label>
					<select className="select-section" value={filter} onChange={handleSelectChange}>
						<option value="all">All</option>
						{uniqueRegions.map((region, index) => (
							<option key={index} value={region}>
								{region}
							</option>
						))}
						
						
					</select>
				</div>
			</div>
		</section>
	);
};
