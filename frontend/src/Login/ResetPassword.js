import React, { useState } from 'react';
import { useLocation,Link } from 'react-router-dom';
import styles from './auth.module.scss';
import Card from '../components/Card';
import Loader from "../components/Loader";
import { toast } from "react-toastify";
const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [message, setMessage] = useState('');
    const query = new URLSearchParams(useLocation().search);
    const token = query.get('token');
     const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(password===null || password===""){
           setIsLoading(false);
          toast.error("password is required.");
        }
        else if(password!==confirmPassword){
         setIsLoading(false);
         toast.error("your confirmation password is not the same with your password.");
        }
        else{
        try {
            const response = await fetch(`/api/auth/reset-password?token=${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }), // Send password in body
            });

            if (response.ok) {
               setIsLoading(false);
               toast.success("Password has been reset sucessfully.");
                setMessage('Password has been reset successfully.');
            } else {
                setIsLoading(false);
                 toast.error("Failed to reset password");
                setMessage('Failed to reset password.');
            }
        } catch (error) {
             setIsLoading(false);
             toast.error("An error occured. please try again");
            setMessage('An error occurred. Please try again.');
        }
        }
    };

    return (
    <>
     {isLoading && <Loader />}
        <section className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <h2>Reset Password</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="password"
                            placeholder="Enter your new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                           <input
                            type="password"
                            placeholder="Confirm Your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="--btn --btn-primary --btn-block">
                            Reset Password
                        </button>
                    </form>
                             <div className={styles.links}>
                <Link to="/">Back to Home</Link>
              </div>
                    <p>{message}</p>
                </div>
            </Card>
        </section>
        </>
    );
};

export default ResetPassword;

