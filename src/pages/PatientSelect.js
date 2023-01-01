import React, { useState, useEffect } from "react";
import "./App.css";
import db from "./firebase";

import PatientViewDetailButton from "../components/HomePages/PatientViewDetailButton";
import PatientAddButton from  "../components/HomePages/PatientAddButton";

function PatientSelect(){
    const [patientsData, setPatientsData] = useState([]);
	const [updatedPatientName, setUpdatedPatientName] = useState("");
	const [updatedPatientAge, setUpdatedPatientAge] = useState("");
	const [updatedPatientGender, setUpdatedPatientGender] = useState("");
	const [updatedPatientBedNO, setUpdatedPatientBedNO] = useState("");
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


	const updateData = (e) => {
		e.preventDefault();
		db.collection("patientsData").doc(dataIdToBeUpdated).update({
		name: updatedPatientName,
		age: updatedPatientAge,
		gender: updatedPatientGender,
		bedNO: updatedPatientBedNO
		});
	
		setUpdatedPatientAge("");
		setUpdatedPatientName("");
		setUpdatedPatientGender("");
		setUpdatedPatientBedNO("");
		setDataIdToBeUpdated("");
	};


	const deleteData = (id) => {
        db.collection("patientsData").doc(id).delete(); }


	return (<>
	<div className="App">
	{!dataIdToBeUpdated ? (
		<PatientAddButton/>
		) : (
		<div className="App__Updateform">
		<input
			type="text"
			placeholder="Name"
			value={updatedPatientName}
			onChange={(e) => setUpdatedPatientName(e.target.value)}
		/>
		<input
			type="text"
			placeholder="Age"
			value={updatedPatientAge}
			onChange={(e) => setUpdatedPatientAge(e.target.value)}
		/>
		<input
			type="text"
			placeholder="Gender"
			value={updatedPatientGender}
			onChange={(e) => setUpdatedPatientGender(e.target.value)}
		/>
				<input
			type="text"
			placeholder="Bed Number"
			value={updatedPatientBedNO}
			onChange={(e) => setUpdatedPatientBedNO(e.target.value)}
		/>
		<button onClick={updateData}>Update</button>
		</div>
		)} 


	  <div className="App__DataDisplay">
		<table>
		<tr>
			<th>NAME</th>
			<th>AGE</th>
			<th>GENDER</th>
			<th>BED NUMBER</th>
			<th>Update</th>
			<th>Delete</th>
			<th>View Details</th>
			<th>Select</th>
			</tr>

			{patientsData?.map(({ id, data }) => (
			<tr key={id}>
			<td>{data.name}</td>
			<td>{data.age}</td>
			<td>{data.gender}</td>
			<td>{data.bedNO}</td>

			<td>
				<button
				onClick={() => {
                    setDataIdToBeUpdated(id);
                    setUpdatedPatientAge(data.age);
                    setUpdatedPatientName(data.name);
                    setUpdatedPatientGender(data.gender);
                    setUpdatedPatientBedNO(data.bedNO);
					<PatientAddButton/>
				}}
				>
				Update
				</button>
			</td>
			<td>
				<button
				onClick={() => {
					deleteData(id);
				}}
				>
				Delete
				</button>
			</td>
			<td>
			<button
				onClick={() => {
					<PatientViewDetailButton />
				}}
				>
				View Details
				</button>
			</td>
			</tr>
		))}
		
		</table>
	</div>
	</div>
	</>
);
}

export default PatientSelect;
