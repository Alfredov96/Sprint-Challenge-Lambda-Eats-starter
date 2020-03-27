import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

const formSchema= yup.object().shape({
    name: yup.string().required("name required").min(2, "name must be more than 2 characters"),
    size: yup.string().required("select size pizza"),
    pepperoni: yup.boolean().oneOf([true || false]),
    sausage: yup.boolean().oneOf([true || false]),
    onion: yup.boolean().oneOf([true || false]),
    spinach: yup.boolean().oneOf([true || false]),
    instructions: yup.string().required("any special instructions?"),
    // terms: yup.boolean().oneOf([true], "must agrree to terms")
})

export default function Form(){
    //button state setup
    const [button, setButton] = useState(true);

    //state for form
    const [formState, setFormState] = useState({
        name:"",
        size:"",
        instructions:"",
        // terms:""
    });

    //state for error

    const [errors,setErrors] = useState({
        name:"",
        size:"",
        instructions:"",
        // terms:""
    });

    //state for post

    const [post, SetPost] = useState([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButton(!valid);
        });
    }, [formState]);


    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/order", formState)
            .then(res => {
                SetPost(res.data);

                setFormState({
                    name:"",
                    size:"",
                    pepperoni:"",
                    sausage:"",
                    onion:"",
                    spinach:"",
                    instructions:"",
                    // terms:""
                })
            })
            .catch(err => console.log("something went wrong when submitting your form", err.response));
    };
    const validateChange = e => {
        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.name === "checkbox" ? e.target.checked : e.target.value)
        .then(valid => {
            setErrors({
                ...errors,
                [e.target.name]:""
            });
        })
        .catch(err => {
            setErrors({
                ...errors,
                [e.target.name]: err.errors[0]
            });
        });
    };
    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newFormData);
    };

    return (

    <form onSubmit={formSubmit}>
            <Link to={"/"}>
                <div>Home</div>
            </Link>
        
            <h1>faster you fill this out the faster your pizza will appear</h1>
            <label htmlFor="name">
                Name: 
                <input
                    id="name" // connects to the htmlFor
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={inputChange}
                />
            {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null} 
            </label> <br/>

            <label htmlFor="size">
                What size pizza?
                 <select 
                    id="size" 
                    name="size" 
                    onChange={inputChange}>
                    <option value="small">small '8'</option>
                    <option value="medium">medium '12'</option>
                    <option value="large">large '18'</option>
                </select>
            </label> <br/>

            <label htmlFor="pepperoni">
                pepperoni 
                <input
                    id="pepperoni"
                    type="checkbox"
                    name="pepperoni"
                    value={formState.pepperoni}
                    onChange={inputChange}
                />
                 {/* {errors.pepperoni.length > 0 ? <p className="error">{errors.pepperoni}</p> : null}  */}
            </label> <br/>

            <label htmlFor="sausage">
            sausage 
                <input
                    id="sausage"
                    type="checkbox"
                    name="sausage"
                    value={formState.sausage}
                    onChange={inputChange}
                />
                 {/* {errors.sausage.length > 0 ? <p className="error">{errors.sausage}</p> : null}  */}
            </label> <br/>

            <label htmlFor="onion">
            onion 
                <input
                    id="onion"
                    type="checkbox"
                    name="onion"
                    value={formState.onion}
                    onChange={inputChange}
                />
                 {/* {errors.onion.length > 0 ? <p className="error">{errors.onion}</p> : null}  */}
            </label> <br/>

            <label htmlFor="spinach">
            spinach 
                <input
                    id="spinach"
                    type="checkbox"
                    name="spinach"
                    value={formState.sausage}
                    onChange={inputChange}
                />
                 {/* {errors.spinach.length > 0 ? <p className="error">{errors.spinach}</p> : null}  */}
            </label> <br/>

            <label htmlFor="instructions">
                Any special request? 
                <textarea
                    id="instructions"
                    name="instructions"
                    value={formState.instructions}
                    onChange={inputChange}
                />
                 {errors.instructions.length > 0 ? <p className="error">{errors.instructions}</p> : null} 
            </label> <br/>
            
            {/* <label htmlFor="terms">
                No refunds!
                <input
                    id="terms"
                    type="checkbox"
                    name="terms"
                    checked={formState.terms}
                    onChange={inputChange}
                />
                 {errors.terms.length > 0 ? <p className="error">{errors.terms}</p> : null} 
            </label> */}
              {/* displaying our post request data */}
              <pre>{JSON.stringify(post, null, 2)}</pre>
              <button disabled={button}>Submit</button>
        </form>
    )
}