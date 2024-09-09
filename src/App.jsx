import { useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [length, setLength] = useState(8);
	const [numberBoolean, setNumberBoolean] = useState(true);
	const [characterBoolean, setCharacterBoolean] = useState(false);
	const [password, setPassword] = useState("");
	// useRef hook
	const passwordRef = useRef(null); //null cuz no default value

	const passwordGenerator = useCallback(() => {
		let pass = "";

		let characters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
		if (numberBoolean) characters += "0123456789";
		if (characterBoolean) characters += "[?></!@#$%^&*-=+{},.`~]";

		for (let i = 1; i <= length; i++) {
			let charr = Math.floor(Math.random() * characters.length + 1);
			pass += characters.charAt(charr);
		}

		setPassword(pass);
	}, [length, numberBoolean, characterBoolean, setPassword]); // useCallback k dependency array k elements mein jab bhi koi change aye to phr se optimize karta hai useCallback

	const copyPasswordToClipBoard = useCallback(() => {
		passwordRef.current?.select(); // select/highlight text
		passwordRef.current?.setSelectionRange(0, 65);
		window.navigator.clipboard.writeText(password); // copy it to clipboard
	}, [password]); //isko bhi optimize karte hain

	useEffect(() => {
		passwordGenerator();
	}, [length, numberBoolean, characterBoolean, passwordGenerator]); // useEffect k dependency array k elements mein jab bhi koi change aye to phr se run karta hai poora function useEffect ak

	return (
		<>
			<div className="w-full flex-nowrap text-center max-w-md mx-auto shadow-md rounded-lg px-4 py-8 my-8 text-orange-500 bg-gray-800">
				<h1 className="text-white text-center my-8">
					Password Generator
				</h1>

				<div className="flex shadow rounded-lg overflow-hidden mb-4">
					<input
						type="text"
						value={password}
						className="outline-none py-1 px-3 w-full"
						placeholder="password"
						readOnly
						ref={passwordRef}
					/>

					<button
						className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
						onClick={copyPasswordToClipBoard}
					>
						copy
					</button>
				</div>
				<div className="flex text-sm gap-x-2">
					<div className="flex items-center gap-x-1">
						<input
							type="range"
							min={6}
							max={64}
							value={length}
							className="cursor-pointer"
							onChange={(e) => {
								setLength(e.target.value);
							}}
						/>
						<label>Length:{length}</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							defaultChecked={numberBoolean}
							id="numberInput"
							onChange={() => {
								setNumberBoolean((prev) => !prev);
							}}
						/>
						<label htmlFor="numberInput">Numbers?</label>
					</div>
					<div className="flex items-center gap-x-1">
						<input
							type="checkbox"
							defaultChecked={characterBoolean}
							id="characterInput"
							onChange={() => {
								setCharacterBoolean((prev) => !prev);
							}}
						/>
						<label htmlFor="characterInput">Characters?</label>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
