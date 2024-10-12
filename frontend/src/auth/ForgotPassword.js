import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import styles from './auth.module.scss';
import Card from '../components/Card';
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import {FaHome } from "react-icons/fa";
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if(email===null || email===''){
    setIsLoading(false);
    toast.error("email is required");
    return;
    }
    try {
        const response = await fetch(`/api/auth/forgot-password?email=${encodeURIComponent(email)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
             setIsLoading(false);
             toast.success("Password reset link has been sent to your email.");
            setMessage('Password reset link has been sent to your email.');
        } else {
                setIsLoading(false);
               toast.error("Failed to sent Password reset email.");  
            setMessage('Failed to send password reset email.');
        }
    } catch (error) {
         setIsLoading(false);
         toast.error("An error occurred. plaease try again.");
        setMessage('An error occurred. Please try again.');
    }
};


    return (
    <>
         {isLoading && <Loader />}
        <section className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <h2>Forgot Password</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"a
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="--btn --btn-primary --btn-block">
                            Send Reset Link
                        </button>
                    </form>
                       <Link to="/" style={{ margin: '10px 0', fontSize: '2rem', display: 'flex', alignItems: 'center' }}>
          <FaHome style={{ marginRight: '8px' }} />
          Back to Home
        </Link>
                    <p>{message}</p>
                </div>
            </Card>
        </section>
        </>
    );
};

export default ForgotPassword;

