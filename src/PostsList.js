import React from 'react';
import { HideUntilLoaded } from 'react-animation'
import { FiExternalLink } from 'react-icons/fi';


const ComponentWrapper = (props) => {
    return (
        <>

            <td>{props.id}</td>
            <td>
                <div className="badge badge-pill badge-secondary">{props.tipo}</div> <span className="badge badge-light">Postado em {props.dia} ({props.horario})</span> <a rel="noopener noreferrer" target="_blank" href={props.link}><FiExternalLink /></a>
                <br />{props.descricao}</td>
            <td>
            <HideUntilLoaded
  imageToLoad={props.src}
>
<img
                width="50px"
                key={props.key}
                src={props.src}
                alt=""
            ></img>
</HideUntilLoaded>
               </td>

            <td>{props.taxaEngajamento}</td>
            <td>{props.likesPost}</td>
            <td>{props.comentarios}</td>
        </>
    );
};

export default ComponentWrapper;