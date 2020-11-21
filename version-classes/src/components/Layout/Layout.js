import React from 'react';
import Aux from '../../hoc/Auxiliary';

const layout = ({ children }) => (
    <Aux>
        <div></div>
        <main>
            {children}
        </main>
    </Aux>
);

export default layout;