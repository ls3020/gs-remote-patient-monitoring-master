import React from "react";
import "../Styles/Btns.css";
import "../Styles/Grids.css";
import AdminItem from "./PatientItem";
import PatientArchives from "../../Assets/Images/PatientArchives.jpg";
//import PatientSelect from "../../Assets/Images/PatientSelect.jpg";

function PatientViewDetailButton() {
  return (
    <div className="smallbutton">
      
          <ul className="btns_items">
            <AdminItem
              src={PatientArchives}
              text="View Details (vitals)"
              label="All Users"
              path="/PTVitals"
            />
          </ul>
        </div>
  );
}
export default PatientViewDetailButton;
