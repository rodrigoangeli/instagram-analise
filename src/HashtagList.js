import React from 'react';

const ComponentWrapper = (props) => {
    return (
       <>
                                                <td>{props.hashtag}</td>
                                                <td>{props.postsContem}</td>
                                                <td>{props.engajamentoPorPost}</td>
       </>
    );
};

export default ComponentWrapper;