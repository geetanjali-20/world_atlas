import React from 'react'
import { About } from './About'

const AboutPage = () => {
  return (
    <>

    <section className="section-about container">
				<h1 className="headingWorld">World</h1>
				<div className="filterParagraph">
					The "world" encompasses the totality of space and time, including all that exists, has existed, and will exist. It's also used to describe our planet Earth, its inhabitants, and everything
					within it. The word "world" can also refer to a specific region, a culture, or even a metaphorical "world" of ideas or possibilities. "The world is round": This refers to the shape of the
					planet Earth.
					<img src="/images/world.png" alt="world is beauty" className="worldImage" />
					<ol type="1">
						<li> The Universe: In scientific cosmology, the world or universe is defined as the totality of all space and time, encompassing everything that is, has been, and will be.</li>
						<li> Planet Earth: "World" is often used to refer to Earth, the planet where we live, including its land, water, atmosphere, and inhabitants. </li>
						<li> The Human World: The word "world" can also refer to the human world, encompassing cultures, societies, and countries. </li>
						<li>
							Different Perspectives: The concept of "world" can be viewed from various angles, including: Philosophy: Philosophical perspectives explore the nature of reality, including the "world"
							as a representation of what is external to the mind. Theology: Theological perspectives consider the world in relation to God, as God's creation or as an entity separate from God.
							Religions: Religions often offer worldviews that provide a framework for understanding the world and our place within it.
						</li>
					</ol>
				</div>
			</section>

      <About/>
    </>
  )
}

export default AboutPage