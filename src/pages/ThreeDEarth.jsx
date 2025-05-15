import * as THREE from "three";
import React, { useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Trail } from "@react-three/drei";
import Nebula from "./elements/Nebula";
import Starfield from "./elements/Starfield";
import EarthMaterial from "./elements/EarthMaterial";
import AtmosphereMesh from "./elements/AtmosphereMesh";

const sunDirection = new THREE.Vector3(-2, 0.5, 1.5);

function Earth() {
	const ref = React.useRef();

	useFrame(() => {
		ref.current.rotation.y += 0.001;
	});
	const axialTilt = (23.4 * Math.PI) / 180;
	return (
		<group rotation-z={axialTilt}>
			<mesh ref={ref}>
				<icosahedronGeometry args={[2, 64]} />
				<EarthMaterial sunDirection={sunDirection} />
				<AtmosphereMesh />
			</mesh>
		</group>
	);
}

function Satellite() {
	const ref = React.useRef();
	const radius = 2.05;
	let currentTime = 0;

	useFrame((_, delta) => {
		currentTime += delta * 2.0;
		ref.current.position.x = radius * Math.cos(currentTime);
		ref.current.position.z = radius * Math.sin(currentTime);
	});

	return (
		<Trail width={0.4} color={0xff9900} length={3} attenuation={(val) => val}>
			<mesh ref={ref} position-y={0.15}>
				<sphereGeometry args={[0.02, 4]} />
				<meshStandardMaterial color={0xff9900} />
			</mesh>
		</Trail>
	);
}

function ThreeDEarth() {
	const { x, y, z } = sunDirection;
	const [showInfo, setShowInfo] = React.useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowInfo(false);
		}, 10000); // 10 seconds
		return () => clearTimeout(timer);
	}, []);
	return (
		<>
			{showInfo && <div className="infoText">Drag, Rotate or Zoom to explore the Earth...</div>}

			<Canvas camera={{ position: [0, 0.1, 5] }} gl={{ toneMapping: THREE.NoToneMapping }} className="canvas canvas-3d">
				<Earth />
				<Satellite />
				<hemisphereLight args={[0xffffff, 0x000000, 3.0]} />
				<directionalLight position={[x, y, z]} />
				<Nebula />
				<Starfield />
				<OrbitControls />
			</Canvas>
		</>
	);
}

export default ThreeDEarth;
