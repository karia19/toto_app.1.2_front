import Layout from "../components/layout"
import React from "react";
import axios from "axios";

const History = () => {

    React.useEffect(() => {
        (async() => {
            try {
                const days = {
                    day: "2022-01-07"
                }
                const response = await axios.post("http://toto.kumstrapi.xyz/api/v1/toto/history_ods", days)
                console.log(response)

            } catch(e){
              console.log("!")
            }
    
        })()
    },[])
    

    return(
        <Layout>
            
                <div className="container">
                    <p>Hello</p>
                </div>
        </Layout>

        
    )
}


export default History;