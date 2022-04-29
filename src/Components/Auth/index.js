import React, {useContext, useEffect, useRef, useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {Spinner} from "react-bootstrap";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {useHistory} from "react-router-dom";


const Auth = () => {
    const history=useHistory()
    const [active,setActive]=useState(false)
    const [loading,setLoading]=useState(false)
    const passwordRef=useRef(null)
    const [disabled,setDisabled]=useState(false)
    const [value,setValue]=useState('')

    const [initialMinute, setInitialMinute] = useState(2);
    const [initialSeconds, setInitialSeconds] = useState(0)
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    const [pause, setPause] = useState(false);
    useEffect(()=>{
        let myInterval = setInterval(() => {
            if (pause){
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(myInterval)
                        setActive(false)
                        toast.error("Code is expired")
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                }
            }
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
        };
    });

    // const stop = () => {
    //     setPause(true);
    // }
    const submitFunc = (e) => {
        e.preventDefault()
        setLoading(true)
        setDisabled(true)
        axios.post(`https://api.uracashback.uz/security/send-verification`,{
            phoneNumber:value.slice(1)
        })
            .then((res)=>{
                setActive(true)
                setPause(true);
            })
            .catch((err)=>{
                toast.error(err.response?.data.message)
            })
            .finally(()=>{
                setLoading(false)
                setDisabled(false)
            })

    }
    const registerPassword = (e) => {
        e.preventDefault()

        const params = new URLSearchParams()
        params.append('phoneNumber', value.slice(1))
        params.append('code', passwordRef.current.value)

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        axios.post('https://api.uracashback.uz/security/verify-login', params, config)
            .then((result) => {
                const {token}=result.data
                localStorage.setItem('token',token)
                toast.success("Ro'yxatdan o'tdingiz")
                // window.location.reload()
                window.location.replace('/')
            })
            .catch((err) => {
                toast.error(err.response?.data[0])
            })

    }
    return (
        <section className="auth">

            <div className="row">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={!active?submitFunc:registerPassword}>
                            <h6 className="main-text">Tizimga kirish</h6>
                            {/*<input ref={emailRef} placeholder="Email" type="email"/>*/}
                            <div className="input-div">
                                <PhoneInput
                                    international
                                    value={value}
                                    onChange={setValue}
                                    defaultCountry={"UZ"}
                                    name="phone"
                                    autoComplete='on'
                                    disabled={disabled}
                                    placeholder={"Telefon raqamini kiriting"}
                                />
                            </div>
                            {active &&<input className="input" ref={passwordRef} placeholder="Password" type="password"/>}
                            {active && <h1 style={{marginTop:'10px'}}> { minutes === 0 && seconds === 0
                                ? null
                                : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1>
                            }</h1>}

                            <button disabled={loading} className="btn-login active">LOG IN {loading?<Spinner animation="border" />:null}</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Auth;
