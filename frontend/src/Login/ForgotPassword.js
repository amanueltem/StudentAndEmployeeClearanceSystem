import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './auth.module.scss';
import Card from '../components/Card';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`/api/auth/forgot-password?email=${encodeURIComponent(email)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            setMessage('Password reset link has been sent to your email.');
        } else {
            setMessage('Failed to send password reset email.');
        }
    } catch (error) {
        setMessage('An error occurred. Please try again.');
    }
};


    return (
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
                    <p>{message}</p>
                </div>
            </Card>
        </section>
    );
};

export default ForgotPassword;

