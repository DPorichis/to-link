import React, { useState } from "react";
import Header from "../../Components/Header";

const user = {
    email: "something@gmail.com",
    password: "1234"
};

function SettingsPGU(props) {
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [iconState, setIconState] = useState('settings'); // New state for icon

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleIcon = () => {
        setIconState(iconState === 'settings' ? 'check' : 'settings');
    };

    return (
        <div>
            <Header log="user" act="settings" />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <h4>Settings</h4>
                    <img 
                        src={`/${iconState}.svg`} 
                        style={{ marginLeft: "3px", cursor: "pointer" }} 
                        alt={iconState === 'settings' ? "Settings icon" : "Check icon"} 
                        onClick={toggleIcon}
                    />
                </div>
                <div style={{ padding: "20px", textAlign: "center", border: "1px solid black" }}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <h6 style={{ marginTop: "1%" }}>Email:</h6>
                        {editEmail ? (
                            <input 
                                type="text" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                style={{ marginLeft: "3px" }}
                            />
                        ) : (
                            <p style={{ marginLeft: "3px" }}>{email}</p>
                        )}
                        <button style={{ border: "none" }} onClick={() => setEditEmail(!editEmail)}>
                            <img src="/edit.svg" alt="Edit icon" />
                        </button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <h6 style={{ marginTop: "1%" }}>Password:</h6>
                        {editPassword ? (
                            <input 
                                type={showPassword ? "text" : "password"} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                style={{ marginLeft: "3px" }}
                            />
                        ) : (
                            <p style={{ marginLeft: "3px" }}>{showPassword ? password : "****"}</p>
                        )}
                        <button style={{ border: "none" }} onClick={() => setEditPassword(!editPassword)}>
                            <img src="/edit.svg" alt="Edit icon" />
                        </button>
                        {editPassword && (
                            <button style={{ border: "none" }} onClick={togglePasswordVisibility}>
                                <img src={showPassword ? "/eye.svg" : "/eye-off.svg"} alt={showPassword ? "Hide" : "Show"} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsPGU;



