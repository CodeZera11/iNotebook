import React from "react";
import Notes from "./Notes";
import Addnote from "./Addnote";


const Home = (props) => {
  return (
    <div>
    <Addnote showAlert={props.showAlert}/>
    <Notes showAlert={props.showAlert}/>
      
    </div>

  );
};

export default Home;
