import React from 'react';

import classes from './Order.css';

const order = ({ ingredients, price }) => {
    const mappedIngredients = [];

    for (let ingredientName in ingredients) {
        mappedIngredients.push({
            name: ingredientName,
            amount: ingredients[ingredientName],
        });
    }

    const ingredientsOutput = mappedIngredients.map(ig => (
        <span
            key={ig.name}
            style={{ 
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
        >
            {ig.name} ({ig.amount})
        </span>
        
        )
    );

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(price).toFixed(2)}</strong></p>
        </div>
    );
}

export default order;