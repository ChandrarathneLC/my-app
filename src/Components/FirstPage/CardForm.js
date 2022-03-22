import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './CardForm.css';

function CardForm(){
    let navigate = useNavigate();
    const intialValue = {cname:"",cnumber:"",cvv:"",validmm:"",validyy:""};
    const [formValues,setFormValues] = useState(intialValue);
    const [formErrors,setFormErrors] = useState({});
    const [isSubmit,setIsSubmit] = useState(false);
    const [cartType,setCartType] = useState({});

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormValues({...formValues, [name]: value});
        setCartType(checkCardType(formValues));
     

    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(()=>{
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            navigate("/process");
        }
    },[formErrors]);

    const validate = (values) => {
        const errors ={};
        const visaregex = /4[0-9]{12}(?:[0-9]{3})?$/;
        const cvvregex = /^[0-9]{3}$/;
        const mastercardregex = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;

        //Card Name is Empty
        if(!values.cname){
            errors.cname = "CARD NAME IS REQUIRED";
        }

        //Card Number is Empty
        if(!values.cnumber){
            errors.cnumber="CARD NUMBER IS REQUIRED";
        }
        
        //Card Number leangth <16
        else if(values.cnumber.length<16){
            errors.cnumber="CARD NUMBER IS TOO SHORT";
        }

        //Card Number is Length >16
        else if (values.cnumber.length>16){
            errors.cnumber="CARD NUMBER IS TOO LONG";
        }

        // Card is Not Visa or Master Card 
        else if(!visaregex.test(values.cnumber) && !mastercardregex.test(values.cnumber)){
            errors.cnumber = "CARD IS NOT VALID TYPE";
        }

        //CVV is Empty
        if(!values.cvv){
            errors.cvv="CVV IS REQUIRED";
        }
        
        //CVV leangth == 3
        else if(!cvvregex.test(values.cvv)){
            errors.cvv="CVV HAS ONLY 3 DIGITS";
        }

        // Month and Year both empty
        if(!values.validmm || !values.validyy){
            errors.validthru = "BOTH MONTH AND YEAR REQUIRED";
        }

        //Only 12 Month
        else if(values.validmm>12){
            errors.validthru="MONTH IS NOT VALID";
        }

        //Validate Month Year Length
        else if(values.validmm.length>2 || values.validyy.length>2){
            errors.validthru ="INSERT MONTH AND YEAR CORRECT FORMAT MONTH -MM , YEAR -YY ";

        }
        
        return errors;
    };

    const checkCardType =(values)=>{
        const cType = {};

        //Visa - first digit is 4 
        const visaregex =/^(4[0-9]+)/;

        //Master - first digit is 5 second digit bitween [1-5]
        const masterregex = /^(5[1-5]+)/;

        if(visaregex.test(values.cnumber) )
          {
            cType.type="VISA CARD";
          }
          if(masterregex.test(values.cnumber)){
            cType.type="MASTER CARD";
          }
          return  cType;
    }

    return(
        <div>
            <form onSubmit={handleSubmit}> 
                <h1>Card Payment</h1>
                <div className='field'>
                    <label>CARD NAME</label>
                    <input
                     type="text"
                     name="cname"
                     onChange={handleChange}
                     placeholder="Card Name"
                     value={formValues.cname}
                     input class="box1">

                     </input>
                    
                </div>
                <p>{formErrors.cname}</p>
                <div className="field">
                    <label>CARD NUMBER</label>
                    <input
                     type="number"
                     name="cnumber"
                     onChange={handleChange}
                     placeholder="Card Number"
                     input class="box1"
                     value={formValues.cnumber}>

                     </input>
                
                </div>
                <p>{formErrors.cnumber}</p>
                <div className="field">
                    <label>CVV</label>
                    <input type="number"
                      name="cvv"
                      placeholder="CVV"
                      input class="box1"
                      onChange={handleChange}
                      value={formValues.cvv}
                      variant="outlined">

                      </input>
                </div>
                <p>{formErrors.cvv}</p>
                <div className='field'>
                    <label>VALID THRU</label>
                    <br></br>
                   <input type="number"
                     name ="validmm"
                     placeholder="MM"
                     onChange={handleChange}
                     value={formErrors.validmm}
                     input class="box2">

                    </input> <b> / </b>
                    <input type= "number"
                     name="validyy"
                     value={formErrors.validyy}
                     onChange={handleChange}
                     placeholder="YY"
                     input class="box2">

                    </input>
                </div>
                <p> {formErrors.validthru}</p>
                <div>
                    <label>CARD TYPE : </label>
                    <p>{cartType.type}</p>
                </div><br></br>
                <button className="btn"
                  type="submit"
                  >Validate
                </button>

            </form>
        </div>
    )
}
export default CardForm;