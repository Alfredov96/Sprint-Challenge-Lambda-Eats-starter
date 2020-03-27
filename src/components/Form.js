import React, {useState} from 'react';
import * as yup from 'yup';

const formSchema= yup.object().shape({
    name: yup.string().required("name required").min(2, "name must be more than 2 characters"),
    size: yup.string().required("select size pizza"),
    pepperoni: yup.boolean().oneof([true], "pepperoni"),
    sausage: yup.boolean().oneof([true], "sausage"),
    onion: yup.boolean().oneof([true], "onion"),
    spinach: yup.boolean().oneof([true], "spinach"),
    instructions: yup.string().required("any special instructions?"),
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
        spinach:"",
        instructions:"",
        terms:""
    });

    //state for error

    const [errors,setErrors] = useState({
        name:"",
        size:"",
        pepperoni:"",
        sausage:"",
        onion:"",
        spinach:"",
        instructions:"",
        terms:""
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
            .post("https://")
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
                    terms:""
                })
            })
            .catch(err => console.log("something went wrong when submitting your form", err.response));
    };
    const validateChange = e => {
        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
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
    
}