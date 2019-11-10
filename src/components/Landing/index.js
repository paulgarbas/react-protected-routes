import React from 'react';

const Landing = () => {
    return (
        <div>
            <h1>Landing</h1>
            <h3>Environment: { process.env.NODE_ENV }</h3>
            <div>Base url: { process.env.REACT_APP_BASE_URL }</div>
        </div>
    )
};

export default Landing;
