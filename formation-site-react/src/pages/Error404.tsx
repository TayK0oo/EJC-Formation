import React from 'react';
import { CSSProperties } from 'react';

interface ErrorProps {
    navigate: (path: string) => void;
}

const Error404: React.FC<ErrorProps> = ({ navigate }) => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>404 - Page Not Found</h1>
            <p style={styles.paragraph}>Sorry, the page you are looking for does not exist.</p>
            <a style={styles.link} onClick={() => navigate('/')}>Go back to Home</a>
        </div>
    );
};

const styles: { [key: string]: CSSProperties } = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
    },
    header: {
        fontSize: '48px',
        color: '#333',
    },
    paragraph: {
        fontSize: '24px',
        color: '#666',
    },
    link: {
        fontSize: '18px',
        color: '#007bff',
        textDecoration: 'none',
    },
};

export default Error404;