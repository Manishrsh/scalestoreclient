import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../style/SettingStyle.css';
import { useNavigate } from 'react-router-dom';
const Setting = () => {
  const [primaryColor, setPrimaryColor] = useState('#1976d2'); // default blue
  const [shopName, setShopName] = useState('scalecomapny'); // default blue
  const [secondaryColor, setSecondaryColor] = useState('#dc004e'); // default red
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleColorChange = () => {
    // Save colors in localStorage
    localStorage.setItem('primaryColor', primaryColor);
    localStorage.setItem('secondaryColor', secondaryColor);
  };
  const handlenamechange = ()=>{
    localStorage.setItem('namechange',shopName);
    handleColorChange();
    navigate(0)
  }

  const handleBorder =(value)=>{
    localStorage.setItem('bordertype',value);
  }

  return (
<div className="bg-light container vh-100 main">
    <span className='title'>Card Settings</span>
      <div className=" wappper row mt-3">   
        <div className="col-6 d-flex flex-row mb-3">
          <label className="me-5 ">Card Background Color</label> {/* Added ms-3 for left margin */}
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className='colorselect'
          />
        </div>

        <div className="col-6 d-flex flex-row">
          <label className="me-5 ms-3">Card Button Color</label> {/* Added ms-3 for left margin */}
          <input
            type="color"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
            className='colorselect'
          />
        </div>

       
        <div className="row">
        <div className="  wapppercardborder">
            <div className="title">Choose Card Border</div>
            <select name="Choose" className="titleinput">

                <option value="round" onClick={handleBorder('round')}>little round</option>
                <option value="square" onClick={handleBorder('square')}>square</option>

            </select>


        </div>
      </div>
    </div>

    <div className="row">
    <div className=" wappper waappertitle">
        <div className="title">Change Shop Name</div>
    <div className="inputwapper">
    <input type="text" placeholder='Shop Name' className='titleinput' onChange={(e)=>{setShopName(e.target.value)}} />
    <button className="btn btn-primary" onClick={handlenamechange} >Save</button>
    </div>

    </div>


    </div>

      </div>

     

  );
};

export default Setting;
