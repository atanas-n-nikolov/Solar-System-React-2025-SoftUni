import React from 'react';
import './ErrorNotification.css';

export default function ErrorNotification ({ message, type = 'error' }) {
    if (!message) return null;

    const errorClass = type === 'error' ? 'error' : 'success';

    return (
        <div className={`error-notification ${errorClass}`}>
            <p>{message}</p>
        </div>
    );
};

