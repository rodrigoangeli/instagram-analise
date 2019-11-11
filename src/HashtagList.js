import React from 'react';

const ComponentWrapper = (props) => {
    return (
       <>
            
                                                <td>{props.id}</td>                                                
                                                <td>{props.hashtag}</td>
                                                <td>{props.engajamentoPorPost}</td>
                                                <td>{props.postsContem}</td>
       </>
    );
};

export default ComponentWrapper;