import Layout from "../components/layout"
import React, { useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import { useRecoilState } from "recoil";
import { horseOds, startNums, selectStart, detailsForResults, selectDetailsRes } from "../context/recoilData";
import PlotHistory from "../components/plotHistoryHorses";

const History = () => {
    const [ selDay, setSelDay ] = useState(new Date())
    const [ history, setHistory ] = useRecoilState(horseOds)
    const [ raceLen, setRaceLen ] = useRecoilState(startNums)
    const [ selNum, setSelNum ] = useRecoilState(selectStart)
    const [ raceDetails, setRaceDetails ] = useState([])
    const [ allDetails, setAllDetails ] = useRecoilState(detailsForResults)
    const [ showSel, setShowSel ] = useRecoilState(selectDetailsRes)

    React.useEffect(() => {
        
        (async() => {
            try {
               
                const days = {
                    day: moment(selDay).format('YYYY-MM-DD')
                }
                const ownApi = await axios.post("/api/historyRes", days)
                console.log("dsd", ownApi)
                setAllDetails(ownApi.data)
                setRaceDetails(ownApi.data[0])

                const response = await axios.post("http://toto.kumstrapi.xyz/api/v1/toto/history_ods", days)
                setRaceLen(ownApi.data.map(x => x['raceNumber']))
                setHistory(JSON.parse(response.data))    
                console.log(raceLen)            
            } catch(e){
              console.log("!")
            }
    
        })()
    },[selDay])
    console.log("whaaat", showSel)
    return(
        <Layout>


                <div className="container">
                    <div style={{}}>
                        <div>
                            <p>Valitse päivä ja katso siekltä sen päivän ketoimet kertoimet päivittyvät puolentunnin välein</p>
                        </div>
                        <div>
                            <Calendar onChange={setSelDay} />


                        </div>
                        {raceLen.length != 0 ?
                        <div>
                            <div style={{ marginTop: "20px"}}>
                                <h4>{raceDetails['card']['trackName']} {raceDetails['card']['meetDate']}</h4>
                                <p>{showSel['seriesSpecification']}</p>
                                <h5>Kolme parasta: {showSel['toteResult']} </h5>
                               
                            </div>
                            <nav>
                            <ul className="pagination w-200 p-3">
                            
                                {raceLen.map(x => 
                                    <li className="page-item"><a onClick={() => setSelNum(x)} className="page-link" href="#">{x}</a></li>
                                    
                                )}
                            
                            </ul>
                            </nav>
                            <PlotHistory />

                        </div>            
                            :
                                    <p></p>
                                
                            }
                       
                    </div>
                   
                </div>
        </Layout>

        
    )
}


export default History;