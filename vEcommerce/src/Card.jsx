import React from "react";

function Card({item}) {
    return(
        <div className="card m-4 p-2" style={{width: "18rem"}}>
            <h4 className="card-title">{item.name}</h4>
            <h5>{item.price}</h5>
            <p>{item.category}<br/>
            {item.inStock ? "in stock" : "not in stock"}</p>
        </div>)
};

export default Card;