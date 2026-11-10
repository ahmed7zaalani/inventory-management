"use client";

import { ToastContainer, Bounce } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => {
    return <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
    />;
}

export default ToastProvider