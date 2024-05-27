import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchedUser} from "slices/userSlice"

import {useHttp} from "hooks/http.hook";
import {BackURL, TypesOfMethods} from "constants/constants";

import cls from "./style.module.sass";

const RegisterLogin = () => {

    const {request} = useHttp()
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loginStatus, setLoginStatus] = useState<boolean>(true)

    const onSubmit = handleSubmit((data): void => {
        const type = loginStatus ? "" : "/sign_up"
        request(`${BackURL}sign${type}`, TypesOfMethods.POST, JSON.stringify(data))
            .then(res => {
                console.log(res)
                if (res.username) {
                    dispatch(fetchedUser(res))
                    navigate("/chat")
                }
            })
            .catch(err => console.log(err))
    })

    return (
        <div className={cls.sign}>
            <div className={cls.sign_form}>
                <a href="">
                    <div className={cls.sign_form_icon}>
                        <i className="fa-regular fa-paper-plane"/>
                        <h1>Chat app</h1>
                    </div>
                </a>
                <div className={cls.sign_btn}>
                    <div
                        className={cls.sign_btn_active}
                        onClick={() => setLoginStatus(false)}
                    >
                        Reg
                    </div>
                    <div
                        className={cls.sign_btn_active}
                        onClick={() => setLoginStatus(true)}
                    >
                        Log
                    </div>
                </div>
                <form
                    className={cls.sign_active}
                    onSubmit={onSubmit}
                >
                    <h1>{loginStatus ? 'Sign in' : 'Sign up'}</h1>
                    <input
                        type="text"
                        required
                        {...register("username")}
                        placeholder="Enter Username"
                    />
                    <input
                        type="password"
                        required
                        {...register("password")}
                        placeholder="Enter Password"
                    />
                    <button>{loginStatus ? 'Sign in' : 'Sign up'}</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterLogin;