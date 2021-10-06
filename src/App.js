import "./App.css";
import React, { useRef } from "react";

function App() {
	const progress = useRef();
	const errors = useRef();
	const current_percentage = useRef(() => {});

	const nameChangeHandler = (event) => {
		current_percentage.current = {
			...current_percentage.current,
			name: validateName(event.target.value),
		};
		updateProgressBar();
	};

	const emailChangeHandler = (event) => {
		current_percentage.current = {
			...current_percentage.current,
			name: validateEmail(event.target.value),
		};
		updateProgressBar();
	};

	const typeChanged = (event) => {
		current_percentage.current = {
			...current_percentage.current,
			type: validateType(event.target.value),
		};
		updateProgressBar();
	};

	const categoryChanged = (event) => {
		current_percentage.current = {
			...current_percentage.current,
			category: validateCategory(event.target.value),
		};
		updateProgressBar();
	};

	const updateProgressBar = () => {
		let percentage = 0;
		const foundErrors = [];
		Object.values(current_percentage.current).forEach(item => {
			if(item.error) {
				foundErrors.push(item.error);
			} else {
				percentage += item;
			}
		});
		progress.current.style.setProperty("--progress", percentage);
		errors.current.innerText = foundErrors.join("\n");
	};

	const validateName = (value) => {
		if (value.length >= 3 || value.length >= 5) return 25;
		return {
			error: "* The name must be greater than 3 characters"
		};
	};

	const validateType = (value) => {
		if (value) return 25;
		return {
			error: "* You must select a document type"
		};
	};

	const validateCategory = (value) => {
		if (value) return 25;
		return {
			error: "* You must select a category"
		};
	};

	const validateEmail = (value) => {
		const emailValid = /\S+@[^\s@.+]+\.[^\s@.]+$/;
		if (emailValid.test(value)) return 25;
		return {
			error: "* Invalid email format"
		};
	}

	return (
		<div className="App">
			<div className="feedback">
				<div ref={progress} className="progress"></div>
				<div ref={errors} className="errors"></div>
			</div>
			<form>
				<div className="form-group">
					<label htmlFor="name">Document name</label>
					<input
						onChange={nameChangeHandler}
						type="text"
						id="name"
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="type">Document type</label>
					<select onChange={typeChanged} className="form-control" id="type">
						<option value="">
							Select an option
						</option>
						<option value="Plain">Plain</option>
						<option value="PDF">PDF</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						onChange={emailChangeHandler}
						type="email"
						id="email"
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="category">Document category</label>
					<select
						onChange={categoryChanged}
						className="form-control"
						id="category">
						<option value="">
							Select an option
						</option>
						<option value="Audit">Audit</option>
						<option value="Report">Report</option>
						<option value="Other">Other</option>
					</select>
				</div>
			</form>
		</div>
	);
}

export default App;
