import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{

    const s1 = {
        "name": "harry",
        "class": "5b"
    }

    const [state, setState] = useState(s1)

    const update = ()=>{
        setTimeout(() => {
            setState({
                "name": "parrry",
                "class": "100b"
            })
        }, 2000);
    }

    return(
        <noteContext.Provider value={{state, update}}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState;