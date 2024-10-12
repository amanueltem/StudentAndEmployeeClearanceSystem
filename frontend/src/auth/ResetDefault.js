import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.scss';
import Card from '../components/Card';
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import ajax from "../services/fetchService";
import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa"; // Ensure you import these icons
import { useUser } from "../UserProvider/index";

const ResetDefault = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const query = new URLSearchParams(useLocation().search);
    const token = query.get('token');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
    const user = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (password === null || password === "") {
            setIsLoading(false);
            toast.error("Password is required.");
        } else if (password !== confirmPassword) {
            setIsLoading(false);
            toast.error("Your confirmation password does not match the new password.");
        } else {
            try {
                await ajax("/api/auth/reset_default", "post", user.jwt, password);
                setIsLoading(false);
                toast.success("Password has been reset successfully.");
                setMessage('Password has been reset successfully.');
                navigate("/");
            } catch (error) {
                setIsLoading(false);
                toast.error("An error occurred. Please try again.");
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
                            <div style={{ position: 'relative', marginBottom: '20px' }}>
                                <input
                                    type={showPassword ? "text" : "password"} // Toggle input type
                                    placeholder="Enter your new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show/Hide icon */}
                                </button>
                            </div>
                            <div style={{ position: 'relative', marginBottom: '20px' }}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"} // Toggle input type
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Show/Hide icon */}
                                </button>
                            </div>
                            <button type="submit" className="--btn --btn-primary --btn-block">
                                Reset Password
                            </button>
                        </form>
                        <div className={styles.links}>
                            <Link to="/dashboard" style={{ margin: '10px 0', fontSize: '2rem', display: 'flex', alignItems: 'center' }}>
                                <FaHome style={{ marginRight: '8px' }} />
                                Back to Home
                            </Link>
                        </div>
                        <p>{message}</p>
                    </div>
                </Card>
            </section>
        </>
    );
};

export default ResetDefault;

