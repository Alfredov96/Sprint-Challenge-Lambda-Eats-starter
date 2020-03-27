import React, {useState} from 'react';
import * as yup from 'yup';

const formSchema= yup.object().shape({
    name: yup.string().required("name required").min(2, "name must be more than 2 characters"),
    size: yup.string().required("select size pizza"),
    pepperoni: yup.boolean().oneof([true], "pepperoni"),
    sausage: yup.boolean().oneof([true], "sausage"),
    onion: yup.boolean().oneof([true], "onion"),
    terms: yup.boolean().oneOf([true], "must agrree to terms")
})

export default function Form(){
    //button state setup
    const [button, setButton] = useState(true);

    //state for form
    const [fromState, setFormState] = useState({
        name:"",
        size:"",
        pepperoni:"",
        sausage:"",
        onion:"",
        terms:""
    });

    //state for error

    const [errors,setErrors] = useState({
        name:"",
        size:"",
        pepperoni:"",
        sausage:"",
        onion:"",
        terms:""
    });

    //state for post

    const [post, SetPost] = useState([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButton(!valid);
        });
    }, [formState]);


}