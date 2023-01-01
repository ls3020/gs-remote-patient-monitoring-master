
import React, { useState, useEffect } from "react";
import db from "./firebase";
import PatientSelectPage from "../components/HomePages/PatientSelectPageButton";

function PatientAdd(){
	// access database here
    const [patientName, setPatientName] = useState("");
    const [patientAge, setPatientAge] = useState("");
    const [patientGender, setPatientGender] = useState("");
    const [patientBedNO, setPatientBedNO] = useState("");
    const [patientsData, setPatientsData] = useState([]);
	const [dataIdToBeUpdated, setDataIdToBeUpdated] = useState("");

	useEffect(() => {
        db.collection("patientsData").onSnapshot((snapshot) => {
        setPatientsData(
            snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
            }))
        );
        });
        }, 
    []);

	const submit = (e) => {
        e.preventDefault();
        db.collection("patientsData").add({
        name: patientName,
        age: patientAge,
        gender: patientGender,
        bedNO: patientBedNO
        });

        setPatientName("");
        setPatientAge("");
        setPatientGender("");
        setPatientBedNO("");
        
    };
	return(
		<div className="App">
		<PatientSelectPage/>
		{!dataIdToBeUpdated && (
			<div className="App__form">
				<input
					type="text"
					placeholder="Name"
					value={patientName}
					onChange={(e) => setPatientName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Age"
					value={patientAge}
					onChange={(e) => setPatientAge(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Gender"
					value={patientGender}
					onChange={(e) => setPatientGender(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Bed Number"
					value={patientBedNO}
					onChange={(e) => setPatientBedNO(e.target.value)}
				/>
				<button onClick={submit}>Submit</button>
			</div>
		)}
		</div>
	)}

export default PatientAdd;
