import React from 'react';
import {useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import '../test/css.css';
import redpoint from '../img/redpot.jpg';
import { DataGrid } from '@material-ui/data-grid';
import yellowpoint from '../img/yellowpot.jpg';
import greenpoint from '../img/greenpot.jpg';
function Content(){
    const[deviceList,setdeviceList] = useState([])
    const[rowList,setrowList] = useState([])
const columns = [
    { field: 'id', headerName: 'Sensor_id', type:'number',width: 220},
    { field: 'nickname', headerName: 'Nickname', width: 200 },
    { field: 'type', headerName: 'Sensor_type', width: 200 },
    {   field: 'Status',headerName: 'Status',width: 380,
    valueGetter: (params) =>
      `${params.getValue('last_update_time') || ''} `,
    
    renderCell: (params) => (
        `${params.getValue('last_update_time')} `
      ), },
   
  ];
  React.useEffect(() => {
    setInterval(() => {
      Axios.get('http://8.210.112.36:5000/monitor/sensors_status').then((response)=>{
          setdeviceList(response.data)
      });
  }, 1000);
  document.getElementById("buttongroup").style.display="none";
    document.getElementById("filterlist").style.display="none";
  }, []);
  
  function transformhand(){
    document.getElementById("filterlist").style.display="block";
    document.getElementById("table").style.display="none";
    document.getElementById("transformhand").style.display="none";
  document.getElementById("buttongroup").style.display="block";
  }
  function transformauto(){
    window.location.reload()
    
  }
    function changeurlEvent_device_1(){
      document.getElementById("name").innerHTML="医院：Device_1"
     
      deviceList.map((val)=>{
                
        console.log(val.device_id_1) 
        setrowList(val.device_id_1)        
      })
    }
    function changeurlEvent_device_2(){
      document.getElementById("name").innerHTML="医院：Device_2"
     
      deviceList.map((val)=>{
                
        console.log(val.device_id_2) 
        setrowList(val.device_id_2)        
      })
    }
    function changeurlEvent_device_3(){
      document.getElementById("name").innerHTML="医院：Device_3"
      deviceList.map((val)=>{
                
        console.log(val.device_id_3) 
        setrowList(val.device_id_3)        
      })
    }
    function changeurlEvent_device_4(){
      document.getElementById("name").innerHTML="医院：Device_4"
      deviceList.map((val)=>{
                
        console.log(val.device_id_4) 
        setrowList(val.device_id_4)        
      })
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
                     
                 <h1 >
                 <strong id='name'>医院</strong><hr/>{deviceList.map((val)=>{
                        var moment = require('moment');
                       return moment().format("YYYY-MM-DD HH:mm:ss"); //当前时间 （24小时制）
                    })}</h1>
                     </sensorid>
                     <div className="content">
                         <div id='buttongroup'>
                         <lable id="lable">选择你要查看的设备：</lable>
                     <button id='device1' className="button1" onClick={changeurlEvent_device_1}>Device_1</button>
                     <button id='device2' className="button1" onClick={changeurlEvent_device_2}>Device_2</button>
                     <button id='device3' className="button1" onClick={changeurlEvent_device_3}>Device_3</button>
                     <button id='device4' className="button1" onClick={changeurlEvent_device_4}>Device_4</button>
                     <button className="button1" onClick={transformauto}>转换为监测页面</button>
                     </div>
                 <button id='transformhand' className="button1" onClick={transformhand}>转换为手动审查表格</button>
                 <div  id='filterlist' style={{ height:600, width: '100%' }}>
     <DataGrid rows={rowList} columns={columns}checkboxSelection />
    </div>
                    <table id="table">
                        <thead>
                    <tr className="header">              
                                        <th>Device</th>
                                        <th>Sensor_id</th>
                                        <th>Status</th>
                                        <th>Nickname</th>
                                        <th>Sensor_type</th>
                                        <th>Last_update_time</th>
                        </tr>
                        </thead>
                        <tbody>
                     { deviceList.map((val)=>{
                          return val.device_id_1.map((res)=>{{
                            var moment = require('moment');
                            var BB = moment().format("YYYY-MM-DD HH:mm:ss");
                            
                            var end_date = moment(BB,"YYYY-MM-DD HH:mm:ss");
                            //秒

                            var seconds = end_date.diff(String(res.last_update_time),"seconds");}
                            var minutes =(seconds/60)
                            var upload;
                       
                            if (String(res.last_update_time) == "null"){
                                upload=yellowpoint
                            }else if(minutes>20){
                              upload=redpoint
                            }
                            else{
                                upload=greenpoint
                            }
                            return <tr>
                              <td>device_1</td>
                            <td>{res.id}</td>
                             <td><img src={upload} height="30vh" width="30vh"></img></td>
                               <td>{res.nickname}</td>
                               <td>{res.type}</td>
                               <td>{String(res.last_update_time)}</td>
                               </tr>
                          })      
                    } )}
                      { deviceList.map((val)=>{
                          return val.device_id_2.map((res)=>{{
                            var moment = require('moment');
                            var BB = moment().format("YYYY-MM-DD HH:mm:ss");
                            
                            var end_date = moment(BB,"YYYY-MM-DD HH:mm:ss");
                            //秒

                            var seconds = end_date.diff(String(res.last_update_time),"seconds");}
                            var minutes =(seconds/60)
                            var upload;
                       
                            if (String(res.last_update_time) == "null"){
                                upload=yellowpoint
                            }else if(minutes>20){
                              upload=redpoint
                            }
                            else{
                                upload=greenpoint
                            }
                            return <tr >
                              <td>device_2</td>
                            <td>{res.id}</td>
                             <td><img src={upload} height="30vh" width="30vh"></img></td>
                               <td>{res.nickname}</td>
                               <td>{res.type}</td>
                               <td>{String(res.last_update_time)}</td>
                               </tr>
                          })      
                    } )}
                      { deviceList.map((val)=>{
                          return val.device_id_3.map((res)=>{{
                            var moment = require('moment');
                            var BB = moment().format("YYYY-MM-DD HH:mm:ss");
                            
                            var end_date = moment(BB,"YYYY-MM-DD HH:mm:ss");
                            //秒

                            var seconds = end_date.diff(String(res.last_update_time),"seconds");}
                            var minutes =(seconds/60)
                            var upload;
                       
                            if (String(res.last_update_time) == "null"){
                                upload=yellowpoint
                            }else if(minutes>20){
                              upload=redpoint
                            }
                            else{
                                upload=greenpoint
                            }
                            return <tr >
                              <td>device_3</td>
                            <td>{res.id}</td>
                             <td><img src={upload} height="30vh" width="30vh"></img></td>
                               <td>{res.nickname}</td>
                               <td>{res.type}</td>
                               <td>{String(res.last_update_time)}</td>
                               </tr>
                          })      
                    } )}
                      { deviceList.map((val)=>{
                          return val.device_id_4.map((res)=>{{
                            var moment = require('moment');
                            var BB = moment().format("YYYY-MM-DD HH:mm:ss");
                            
                            var end_date = moment(BB,"YYYY-MM-DD HH:mm:ss");
                            //秒

                            var seconds = end_date.diff(String(res.last_update_time),"seconds");}
                            var minutes =(seconds/60)
                            var upload;
                       
                            if (String(res.last_update_time) == "null"){
                                upload=yellowpoint
                            }else if(minutes>20){
                              upload=redpoint
                            }
                            else{
                                upload=greenpoint
                            }
                            return <tr >
                              <td>device_4</td>
                            <td>{res.id}</td>
                             <td><img src={upload} height="30vh" width="30vh"></img></td>
                               <td>{res.nickname}</td>
                               <td>{res.type}</td>
                               <td>{String(res.last_update_time)}</td>
                               </tr>
                          })      
                    } )}
                         </tbody>
                    </table>
                    </div>
             </Grid>
        </Grid>

    );
    
}
export default Content;