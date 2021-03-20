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
    const [normalcheck,setnormalcheck]=useState(true)
    const [noupdatecheck,setnoupdatecheck]=useState(true)
    const [lateupdatecheck,setlateupdatecheck]=useState(true)
const columns = [
    { field: 'id', headerName: 'Sensor_id', type:'number',width: 220},
    { field: 'nickname', headerName: 'Nickname', width: 200 },
    { field: 'type', headerName: 'Sensor_type', width: 200 },
    {   field: 'Status',headerName: 'last_update_time',width: 380,
    valueGetter: (params) =>
      `${params.getValue('last_update_time') || ''} `,
    
    renderCell: (params) => (
        `${params.getValue('last_update_time')} `
        
      ), },
   
  ];
  React.useEffect(() => {
    setInterval(() => {
      Axios.get('http://8.210.112.36:5002/monitor/sensors_status').then((response)=>{
          setdeviceList(response.data)
          console.log(response.data)
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
  document.getElementById("buttongroup2").style.display="none";
  setnormalcheck(false)
  document.getElementById("normal").style.display='none';
  setnoupdatecheck(false)
  document.getElementById("noupdate").style.display='none';
  setlateupdatecheck(false)
document.getElementById("lateupdate").style.display='none';
  }
  function transformauto(){
    window.location.reload()
    
  }
    function changeurlEvent_device_1(){
      document.getElementById("name").innerHTML="灵实医院：Device_1"
     
      deviceList.map((val)=>{
                
        console.log(val.device_id_1) 
        setrowList(val.device_id_1)        
      })
    }
    function changeurlEvent_Normal(){
      if(normalcheck==true){
        setnormalcheck(false)
      document.getElementById("normal").style.display='none'
      }
      else{
        setnormalcheck(true)
      document.getElementById("normal").style.display='block'
      }
    }

    function changeurlEvent_Noupdate(){
      if(noupdatecheck==true){
        setnoupdatecheck(false)
      document.getElementById("noupdate").style.display='none'
      }
      else{
        setnoupdatecheck(true)
      document.getElementById("noupdate").style.display='block'
      }
    }
    
    function changeurlEvent_Lateupdate(){
      if(lateupdatecheck==true){
        setlateupdatecheck(false)
      document.getElementById("lateupdate").style.display='none'
      }
      else{
        setlateupdatecheck(true)
      document.getElementById("lateupdate").style.display='block'
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
                     
                 <h1 >
                 <strong id='name'>灵实医院</strong><hr/>{deviceList.map((val)=>{
                        var moment = require('moment');
                       return moment().format("YYYY-MM-DD HH:mm:ss"); //当前时间 （24小时制）
                    })}</h1>
                     </sensorid>
                     <div className="content">
                         <div id='buttongroup'>
                         <lable id="lable">选择你要查看的设备：</lable>
                     <button id='device1' className="button1" onClick={changeurlEvent_device_1}>Device_1</button>
                     <button className="button1" onClick={transformauto}>转换为监测页面</button>
                     </div>
                     <div id='buttongroup2'>
                     <lable id="lable">Filter：</lable>
                     <button className="button1" onClick={changeurlEvent_Lateupdate}>Too late no update sensors</button>
                     <button  className="button1" onClick={changeurlEvent_Normal}>Normal sensors</button>
                     <button  className="button1" onClick={changeurlEvent_Noupdate}>No update time sensors</button>
                 <button id='transformhand' className="button1" onClick={transformhand}>转换为手动审查表格</button>
                      </div>
                 <div  id='filterlist' style={{ height:600, width: '100%' }}>
     <DataGrid rows={rowList} columns={columns}checkboxSelection />
    </div>          <div id='lateupdate'>
                    <h1>Too late update sensors</h1>
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
                        try{val.device_id_1.map((res)=>{})}
                        catch (e) {
                          return ;
                      }
                          return val.device_id_1.map((res)=>{{
                            var moment = require('moment');
                            var BB = moment().format("YYYY-MM-DD HH:mm:ss");
                            
                            var end_date = moment(BB,"YYYY-MM-DD HH:mm:ss");
                            //秒

                            var seconds = end_date.diff(String(res.last_update_time),"seconds");}
                            var minutes =(seconds/60)
                            var upload;
                            var color;
                            if (String(res.last_update_time) == "null"){
                                upload=yellowpoint;
                                color='yellow';
                            }else if(minutes>60){
                              upload=redpoint;
                              color='red';
                            }
                            else{
                                upload=greenpoint;
                                color='green'
                            }
                            if(color=='red'){
                            return <tr>
                              <td>device_1</td>
                            <td>{res.id}</td>
                             <td><img src={upload} height="30vh" width="30vh"></img></td>
                               <td>{res.nickname}</td>
                               <td>{res.type}</td>
                               <td>{String(res.last_update_time)}</td>
                               </tr>
                            }
                          })      
                          
                    } )}
                      { deviceList.map((val)=>{
                        try{val.device_id_2.map((res)=>{})}
                        catch (e) {
                          return ;
                      }
                          return val.device_id_2.map((res)=>{{
                            var moment = require('moment');
                            var BB = moment().format("YYYY-MM-DD HH:mm:ss");
                            
                            var end_date = moment(BB,"YYYY-MM-DD HH:mm:ss");
                            //秒

                            var seconds = end_date.diff(String(res.last_update_time),"seconds");}
                            var minutes =(seconds/60)
                            var upload;
                            var color;
                            if (String(res.last_update_time) == "null"){
                              upload=yellowpoint;
                              color='yellow';
                          }else if(minutes>60){
                            upload=redpoint;
                            color='red';
                          }
                          else{
                              upload=greenpoint;
                              color='green'
                          }
                            if(color=='red'){
                            return <tr >
                              <td>device_2</td>
                            <td>{res.id}</td>
                             <td><img src={upload} height="30vh" width="30vh"></img></td>
                               <td>{res.nickname}</td>
                               <td>{res.type}</td>
                               <td>{String(res.last_update_time)}</td>
                               </tr>
                            }
                          })      
                    } )}
                      { deviceList.map((val)=>{
                         try{val.device_id_3.map((res)=>{})}
                         catch (e) {
                           return ;
                       }
                          return val.device_id_3.map((res)=>{{
                            var moment = require('moment');
                            var BB = moment().format("YYYY-MM-DD HH:mm:ss");
                            
                            var end_date = moment(BB,"YYYY-MM-DD HH:mm:ss");
                            //秒

                            var seconds = end_date.diff(String(res.last_update_time),"seconds");}
                            var minutes =(seconds/60)
                            var upload;
                            var color;
                            if (String(res.last_update_time) == "null"){
                              upload=yellowpoint;
                              color='yellow';
                          }else if(minutes>60){
                            upload=redpoint;
                            color='red';
                          }
                          else{
                              upload=greenpoint;
                              color='green'
                          }
                            if(color=='red'){
                            return <tr >
                              <td>device_3</td>
                            <td>{res.id}</td>
                             <td><img src={upload} height="30vh" width="30vh"></img></td>
                               <td>{res.nickname}</td>
                               <td>{res.type}</td>
                               <td>{String(res.last_update_time)}</td>
                               </tr>
                            }
                          })      
                    } )}
                      { deviceList.map((val)=>{
                         try{val.device_id_4.map((res)=>{})}
                         catch (e) {
                           return ;
                       }
                          return val.device_id_4.map((res)=>{{
                            var moment = require('moment');
                            var BB = moment().format("YYYY-MM-DD HH:mm:ss");
                            
                            var end_date = moment(BB,"YYYY-MM-DD HH:mm:ss");
                            //秒

                            var seconds = end_date.diff(String(res.last_update_time),"seconds");}
                            var minutes =(seconds/60)
                            var upload;
                            var color;
                            if (String(res.last_update_time) == "null"){
                              upload=yellowpoint;
                              color='yellow';
                          }else if(minutes>60){
                            upload=redpoint;
                            color='red';
                          }
                          else{
                              upload=greenpoint;
                              color='green'
                          }
                            if(color=='red'){
                            return <tr >
                              <td>device_4</td>
                            <td>{res.id}</td>
                             <td><img src={upload} height="30vh" width="30vh"></img></td>
                               <td>{res.nickname}</td>
                               <td>{res.type}</td>
                               <td>{String(res.last_update_time)}</td>
                               </tr>
                            }
                          })      
                    } )}
                         </tbody>
                    </table>
                    </div>
                    <div id='normal'>
                    <h1>Normal sensors</h1>
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
                        try{val.device_id_1.map((res)=>{})}
                        catch (e) {
                          return ;
                      }
                          return val.device_id_1.map((res)=>{{
                            var moment = require('moment');
                            var BB = moment().format("YYYY-MM-DD HH:mm:ss");
                            
                            var end_date = moment(BB,"YYYY-MM-DD HH:mm:ss");
                            //秒

                            var seconds = end_date.diff(String(res.last_update_time),"seconds");}
                            var minutes =(seconds/60)
                            var upload;
                            var color;
                            if (String(res.last_update_time) == "null"){
                                upload=yellowpoint;
                                color='yellow';
                            }else if(minutes>60){
                              upload=redpoint;
                              color='red';
                            }
                            else{
                                upload=greenpoint;
                                color='green'
                            }
                            if(color=='green'){
                            return <tr>
                              <td>device_1</td>
                            <td>{res.id}</td>
                             <td><img src={upload} height="30vh" width="30vh"></img></td>
                               <td>{res.nickname}</td>
                               <td>{res.type}</td>
                               <td>{String(res.last_update_time)}</td>
                               </tr>
                            }
                          })      
                    } )}
                      { deviceList.map((val)=>{
                         try{val.device_id_2.map((res)=>{})}
                         catch (e) {
                           return ;
                       }
                          return val.device_id_2.map((res)=>{{
                            var moment = require('moment');
                            var BB = moment().format("YYYY-MM-DD HH:mm:ss");
                            
                            var end_date = moment(BB,"YYYY-MM-DD HH:mm:ss");
                            //秒

                            var seconds = end_date.diff(String(res.last_update_time),"seconds");}
                            var minutes =(seconds/60)
                            var upload;
                            var color;
                            if (String(res.last_update_time) == "null"){
                              upload=yellowpoint;
                              color='yellow';
                          }else if(minutes>60){
                            upload=redpoint;
                            color='red';
                          }
                          else{
                              upload=greenpoint;
                              color='green'
                          }
                            if(color=='green'){
                            return <tr >
                              <td>device_2</td>
                            <td>{res.id}</td>
                             <td><img src={upload} height="30vh" width="30vh"></img></td>
                               <td>{res.nickname}</td>
                               <td>{res.type}</td>
                               <td>{String(res.last_update_time)}</td>
                               </tr>
                            }
                          })      
                    } )}
                      { deviceList.map((val)=>{
                         try{val.device_id_3.map((res)=>{})}
                         catch (e) {
                           return ;
                       }
                          return val.device_id_3.map((res)=>{{
                            var moment = require('moment');
                            var BB = moment().format("YYYY-MM-DD HH:mm:ss");
                            
                            var end_date = moment(BB,"YYYY-MM-DD HH:mm:ss");
                            //秒

                            var seconds = end_date.diff(String(res.last_update_time),"seconds");}
                            var minutes =(seconds/60)
                            var upload;
                            var color;
                            if (String(res.last_update_time) == "null"){
                              upload=yellowpoint;
                              color='yellow';
                          }else if(minutes>60){
                            upload=redpoint;
                            color='red';
                          }
                          else{
                              upload=greenpoint;
                              color='green'
                          }
                            if(color=='green'){
                            return <tr >
                              <td>device_3</td>
                            <td>{res.id}</td>
                             <td><img src={upload} height="30vh" width="30vh"></img></td>
                               <td>{res.nickname}</td>
                               <td>{res.type}</td>
                               <td>{String(res.last_update_time)}</td>
                               </tr>
                            }
                          })      
                    } )}
                      { deviceList.map((val)=>{
                         try{val.device_id_4.map((res)=>{})}
                         catch (e) {
                           return ;
                       }
                          return val.device_id_4.map((res)=>{{
                            var moment = require('moment');
                            var BB = moment().format("YYYY-MM-DD HH:mm:ss");
                            
                            var end_date = moment(BB,"YYYY-MM-DD HH:mm:ss");
                            //秒

                            var seconds = end_date.diff(String(res.last_update_time),"seconds");}
                            var minutes =(seconds/60)
                            var upload;
                            var color;
                       
                            if (String(res.last_update_time) == "null"){
                              upload=yellowpoint;
                              color='yellow';
                          }else if(minutes>60){
                            upload=redpoint;
                            color='red';
                          }
                          else{
                              upload=greenpoint;
                              color='green'
                          }
                            if(color=='green'){
                            return <tr >
                              <td>device_4</td>
                            <td>{res.id}</td>
                             <td><img src={upload} height="30vh" width="30vh"></img></td>
                               <td>{res.nickname}</td>
                               <td>{res.type}</td>
                               <td>{String(res.last_update_time)}</td>
                               </tr>
                            }
                          })      
                    } )}
                         </tbody>
                    </table>
                    </div>
                    <div id='noupdate'>
                    <h1>No update time sensors</h1>
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
                        try{val.device_id_1.map((res)=>{})}
                        catch (e) {
                          return ;
                      }
                          return val.device_id_1.map((res)=>{{
                            var moment = require('moment');
                            var BB = moment().format("YYYY-MM-DD HH:mm:ss");
                            
                            var end_date = moment(BB,"YYYY-MM-DD HH:mm:ss");
                            //秒

                            var seconds = end_date.diff(String(res.last_update_time),"seconds");}
                            var minutes =(seconds/60)
                            var upload;
                            var color;
                            if (String(res.last_update_time) == "null"){
                                upload=yellowpoint;
                                color='yellow';
                            }else if(minutes>60){
                              upload=redpoint;
                              color='red';
                            }
                            else{
                                upload=greenpoint;
                                color='green'
                            }
                            if(color=='yellow'){
                            return <tr>
                              <td>device_1</td>
                            <td>{res.id}</td>
                             <td><img src={upload} height="30vh" width="30vh"></img></td>
                               <td>{res.nickname}</td>
                               <td>{res.type}</td>
                               <td>{String(res.last_update_time)}</td>
                               </tr>
                            }
                          })      
                    } )}
                      { deviceList.map((val)=>{
                         try{val.device_id_2.map((res)=>{})}
                         catch (e) {
                           return ;
                       }
                          return val.device_id_2.map((res)=>{{
                            var moment = require('moment');
                            var BB = moment().format("YYYY-MM-DD HH:mm:ss");
                            
                            var end_date = moment(BB,"YYYY-MM-DD HH:mm:ss");
                            //秒

                            var seconds = end_date.diff(String(res.last_update_time),"seconds");}
                            var minutes =(seconds/60)
                            var upload;
                            var color;
                            if (String(res.last_update_time) == "null"){
                              upload=yellowpoint;
                              color='yellow';
                          }else if(minutes>60){
                            upload=redpoint;
                            color='red';
                          }
                          else{
                              upload=greenpoint;
                              color='green'
                          }
                            if(color=='yellow'){
                            return <tr >
                              <td>device_2</td>
                            <td>{res.id}</td>
                             <td><img src={upload} height="30vh" width="30vh"></img></td>
                               <td>{res.nickname}</td>
                               <td>{res.type}</td>
                               <td>{String(res.last_update_time)}</td>
                               </tr>
                            }
                          })      
                    } )}
                      { deviceList.map((val)=>{
                         try{val.device_id_3.map((res)=>{})}
                         catch (e) {
                           return ;
                       }
                          return val.device_id_3.map((res)=>{{
                            var moment = require('moment');
                            var BB = moment().format("YYYY-MM-DD HH:mm:ss");
                            
                            var end_date = moment(BB,"YYYY-MM-DD HH:mm:ss");
                            //秒

                            var seconds = end_date.diff(String(res.last_update_time),"seconds");}
                            var minutes =(seconds/60)
                            var upload;
                            var color;
                            if (String(res.last_update_time) == "null"){
                              upload=yellowpoint;
                              color='yellow';
                          }else if(minutes>60){
                            upload=redpoint;
                            color='red';
                          }
                          else{
                              upload=greenpoint;
                              color='green'
                          }
                            if(color=='yellow'){
                            return <tr >
                              <td>device_3</td>
                            <td>{res.id}</td>
                             <td><img src={upload} height="30vh" width="30vh"></img></td>
                               <td>{res.nickname}</td>
                               <td>{res.type}</td>
                               <td>{String(res.last_update_time)}</td>
                               </tr>
                            }
                          })      
                    } )}
                      { deviceList.map((val)=>{
                         try{val.device_id_4.map((res)=>{})}
                         catch (e) {
                           return ;
                       }
                          return val.device_id_4.map((res)=>{{
                            var moment = require('moment');
                            var BB = moment().format("YYYY-MM-DD HH:mm:ss");
                            
                            var end_date = moment(BB,"YYYY-MM-DD HH:mm:ss");
                            //秒

                            var seconds = end_date.diff(String(res.last_update_time),"seconds");}
                            var minutes =(seconds/60)
                            var upload;
                            var color;
                       
                            if (String(res.last_update_time) == "null"){
                              upload=yellowpoint;
                              color='yellow';
                          }else if(minutes>60){
                            upload=redpoint;
                            color='red';
                          }
                          else{
                              upload=greenpoint;
                              color='green'
                          }
                            if(color=='yellow'){
                            return <tr >
                              <td>device_4</td>
                            <td>{res.id}</td>
                             <td><img src={upload} height="30vh" width="30vh"></img></td>
                               <td>{res.nickname}</td>
                               <td>{res.type}</td>
                               <td>{String(res.last_update_time)}</td>
                               </tr>
                            }
                          })      
                    } )}
                         </tbody>
                    </table>
                    </div>
                    </div>
             </Grid>
        </Grid>

    );
    
}
export default Content;