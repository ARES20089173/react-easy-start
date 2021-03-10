import React from 'react';
import {useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import './css.css';
import redpoint from '../img/redpot.jpg';
import greenpoint from '../img/greenpot.jpg';
import Collapse from '@material-ui/core/Collapse';
import expandMore from '../img/expandMore.png';
import expandLess from '../img/expandLess.png';
function Content(){
    const [expanded, setExpanded] = React.useState(false);
    const [Icon, setIcon] = React.useState(expandMore);
    const[checkIcon,setcheckIcon]=React.useState(true);
    const[checkIcon_2,setcheckIcon_2]=React.useState(true);
    const[device_id,setdevice_id] = useState('null')

    const[nickname,setnickname] = useState('null')
    const[sensor_type,setsensor_type] = useState('null')
    const[last_updatetime,setlast_updatetime] = useState('null')
    const[deviceList,setdeviceList] = useState([])

    useEffect(()=>{
            
            setInterval(() => {
                Axios.get('http://localhost:3001/api/get',).then((response)=>{
               
                setdeviceList(response.data)
            });
            
              }, 1000);
    },[])  
    function IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    
    const submitSensorForm =()=>{
        Axios.post('http://localhost:3001/api/insert',{
            device_id:device_id,
            nickname:nickname,
            sensor_type:sensor_type,
            last_updatetime:last_updatetime,
        });
        
    }
    function expandcontrol(){
        setExpanded(!expanded);
        setcheckIcon(!checkIcon)
        if(checkIcon){
            setIcon(expandLess)
        }
        else{
            setIcon(expandMore)
        }
    }
    return(
        
        <Grid container   
        direction="row"
        justify="center"
        alignItems="stretch"
        spacing={2}
       xs={12}>
         
              
             <Grid item xs={12}>
                 <sensorid>
                 <h1 ><strong>Testdevice</strong><hr/>{deviceList.map((val)=>{
                        var moment = require('moment');
                       return moment().format("YYYY-MM-DD HH:mm:ss"); //当前时间 （24小时制）
                    })}</h1>
                    
                     </sensorid>
                     <div className="App">
                         <p className="collapse">输入系统   <img onClick={expandcontrol} src={Icon} className="icon"></img></p>
                         <Collapse in={expanded}>
                    <div className="container">
                    <div className="form" >
                        <div class="col-20">
                        <lable>Device_id:</lable> 
                        <input  className="input" type="text" name="device_id" placeholder="Please input" onChange={(e)=>{setdevice_id(e.target.value) }}></input>
                        </div>
                        <div class="col-20">
                        <lable>Nickname:</lable> 
                        <input className="input"type="text" name="nickname" placeholder="Please input" onChange={(e)=>{  setnickname(e.target.value)     }}></input>
                        </div> <div class="col-20">
                        <lable>Last_update_time:</lable>
                        <input className="input"type="text" name="last_update_time" placeholder="Please input" onChange={(e)=>{    setlast_updatetime(e.target.value)  }}></input>
                        </div> <div class="col-20">
                        <lable>Sensor_type:</lable>
                        <input className="input"type="text" name="sensor_type" placeholder="Please input" onChange={(e)=>{ setsensor_type(e.target.value)  }}></input>
                        </div>
                        <button className="input-submit" onClick={submitSensorForm}>submit</button>
                        
                     </div>
                    </div>
                        </Collapse>
                    </div>
                  
            <div className="content">
                <h1>监测信息</h1>
            <table id="table">
                     <tr className="header">     
                     <th>Device</th>     
                                 <th>Sensor_id</th>
                                <th>Status</th>
                                <th>Nickname</th>
                                <th>Last_update_time</th>
                                <th>Sensor_type</th>
                </tr>
                     {  deviceList.map((val)=>{
							if(IsJsonString(val.device1)){
                                console.log(val.device1)
                                val.device1=JSON.parse(val.device1);
                                return val.device1.map((sub)=>{{    
                                 
                                    var moment = require('moment');
                                    console.log(moment().format("YYYY-MM-DD HH:mm:ss")); //当前时间 （24小时制）
                                    var BB = moment().format("YYYY-MM-DD HH:mm:ss");
                                    
                                    var end_date = moment(BB,"YYYY-MM-DD HH:mm:ss");
                                    //秒
                                    var seconds = end_date.diff(String(sub.last_update_time),"seconds");}
                
                                    var upload;
                                    if (seconds>20){
                                        upload=redpoint
                                    }else{
                                        upload=greenpoint
                                    }
                                                return <tr>
                                                      
                                                      <td>device_1</td>
                                                 <td>{String(sub.sensor_id)}</td>
                                                  <td><img src={upload} height="30vh" width="30vh"></img></td>
                                                    <td>{String(sub.nickname)}</td>
                                                    <td>{String(sub.last_update_time)}</td>
                                                    <td>{String(sub.type)}</td>
                                                    </tr>
                                            })	
                            }
								 })
								}
					{  deviceList.map((val)=>{
						
                        if(IsJsonString(val.device2)){
                            val.device2=JSON.parse(val.device2)
                            return val.device2.map((sub)=>{
								{
									var moment = require('moment');
									console.log(moment().format("YYYY-MM-DD HH:mm:ss")); //当前时间 （24小时制）
									var BB = moment().format("YYYY-MM-DD HH:mm:ss");
									 
									var end_date = moment(BB,"YYYY-MM-DD HH:mm:ss");
									//秒
									var seconds = end_date.diff(String(sub.last_update_time),"seconds");}
									
									var upload;
                                    if (seconds>20){
                                        upload=redpoint
                                    }else{
                                        upload=greenpoint
                                    }
                                                return <tr>
                                                             <td>device_2</td>
                                               <td>{String(sub.sensor_id)}</td>
                                               <td><img src={upload} height="30vh" width="30vh"></img></td>
                                                    <td>{String(sub.nickname)}</td>
                                                    <td>{String(sub.last_update_time)}</td>
                                                    <td>{String(sub.type)}</td>
                                                </tr>
                                            })	
                        }
						
                                                 })
                                                }
                                               
						{  deviceList.map((val)=>{
							if(IsJsonString(val.device3)){
                                val.device3=JSON.parse(val.device3)
                                return val.device3.map((sub)=>{
                                    {
                                        var moment = require('moment');
                                        console.log(moment().format("YYYY-MM-DD HH:mm:ss")); //当前时间 （24小时制）
                                        var BB = moment().format("YYYY-MM-DD HH:mm:ss");
                                         
                                        var end_date = moment(BB,"YYYY-MM-DD HH:mm:ss");
                                        //秒
                                        var seconds = end_date.diff(String(sub.last_update_time),"seconds");}
                                        
                                        var upload;
                                        if (seconds>20){
                                            upload=redpoint
                                        }else{
                                            upload=greenpoint
                                        }
                                                    return <tr>
                                                             <td>device_3</td>
                                                        <td>{String(sub.sensor_id)}</td>
                                                    <td><img src={upload} height="30vh" width="30vh"></img></td>
                                                    <td>{String(sub.nickname)}</td>
                                                    <td>{String(sub.last_update_time)}</td>
                                                    <td>{String(sub.type)}</td>
                                                    </tr>
                                                })
                            }
								
                                                 })
                                                }
                                                 </table>
                    
                                                </div>

             </Grid>
           
           
        </Grid>

    );
    
}
export default Content;