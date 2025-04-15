"use client";


import { Suspense } from "react/cjs/react.production.min";
import UIAuth from "./components/uiAuth";

const Auth = () => {


    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UIAuth/>
        </Suspense>
    );
};



export default Auth;
