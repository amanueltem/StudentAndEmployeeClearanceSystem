import React, { useState } from 'react';
import { useLocation,Link } from 'react-router-dom';
import styles from './auth.module.scss';
import Card from '../components/Card';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [message, setMessage] = useState('');
    const query = new URLSearchParams(useLocation().search);
    const token = query.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password===null || password===""){
          alert("password is required.");
        }
        else if(password!==confirmPassword){
         alert("your confirmation password is not the same with your password.");
        }
        else{
        try {
            const response = await fetch(`/api/auth/reset-password?token=${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }), // Send password in body
            });

            if (response.ok) {
                setMessage('Password has been reset successfully.');
            } else {
                setMessage('Failed to reset password.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
        }
    };

    return (
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
    );
};

export default ResetPassword;

