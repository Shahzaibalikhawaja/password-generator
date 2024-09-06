import { useState, useCallback, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [length, setLength] = useState(8);
	const [numberBoolean, setNumberBoolean] = useState(true);
	const [characterBoolean, setCharacterBoolean] = useState(false);
	const [password, setPassword] = useState("");

	//
	// const passwordGenerator = (LENGTH = 8,NUM, CHAR)=>{
	//   console.log("Generating Password...")
	//   console.log("LENGTH:",LENGTH,"NUM:", NUM,"CHAR:", CHAR);

	// }
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
	}, [length, numberBoolean, characterBoolean, setPassword]);

  useEffect(()=>{
    passwordGenerator()
  }, [length,numberBoolean,characterBoolean,passwordGenerator])

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
					/>

					<button>copy</button>
				</div>
				<div className="flex text-sm gap-x-2">
					<div className="flex items-center gap-x-1">
						<input
							type="range"
							min={6}
							max={50}
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
