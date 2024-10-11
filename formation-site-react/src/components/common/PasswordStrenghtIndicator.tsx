import React, { useState, useEffect } from 'react';
import styles from '../../styles/PasswordStrengthIndicator.module.css';



interface PasswordStrengthIndicatorProps {
    password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
    const [strength, setStrength] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        let strengthLevel = 0;
        let widthPercentage = 0;

        if (password.length > 0) {
            strengthLevel = 1; // Rouge
            widthPercentage = 25;

            if (password.match(/[A-Za-z]/) && password.match(/[0-9]/)) {
                strengthLevel = 2; // Orange
                widthPercentage = 50;
            }

            if (password.match(/[A-Za-z]/) && password.match(/[0-9]/) && password.match(/[^A-Za-z0-9]/)) {
                strengthLevel = 3; // Vert
                widthPercentage = 75;

                if (password.length >= 11) {
                    strengthLevel = 4; // Vert complet
                    widthPercentage = 100;
                }
            }

            

        }

        setStrength(strengthLevel);
        setWidth(widthPercentage);
    }, [password]);

    return (
        <div className={styles.progressLoader}>
            <div 
                className={`${styles.progress} ${styles[`strength${strength}`]}`}
                style={{ width: `${width}%` }}
            ></div>
        </div>
    );
};

export default PasswordStrengthIndicator;