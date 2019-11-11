import React from 'react';

const ComponentWrapper = (props) => {
  return(
      
                                    <div className="main-card mb-3 card">
                                        <div className="card-body">
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-outer">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-left">
                                                                    <div className="widget-heading">Publicações</div>
                                                                    <div className="widget-subheading">Total de publicações</div>
                                                                </div>
                                                                <div className="widget-content-right">
                                                                    <div className="widget-numbers text-success">{props.publicacoes}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-outer">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-left">
                                                                    <div className="widget-heading">Seguidores</div>
                                                                    <div className="widget-subheading">Total de seguidores</div>
                                                                </div>
                                                                <div className="widget-content-right">
                                                                    <div className="widget-numbers text-primary">{props.seguidores}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-outer">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-left">
                                                                    <div className="widget-heading">Seguindo</div>
                                                                    <div className="widget-subheading">Total seguindo</div>
                                                                </div>
                                                                <div className="widget-content-right">
                                                                    <div className="widget-numbers text-danger">{props.seguindo}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
);
};

export default ComponentWrapper;