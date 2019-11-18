import React from 'react';

const ComponentWrapper = (props) => {
  return(
      
                                    <div className="row">
                                        <div className="col-lg-6 col-xl-4">
                                    <div className="card mb-3 widget-content">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">Publicações</div>
                                                <div className="widget-subheading">Total de publicações</div>
                                            </div>
                                            <div className="widget-content-right">
                                                <div className="widget-numbers text-success"><span>{props.publicacoes}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-xl-4">
                                    <div className="card mb-3 widget-content">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">Seguidores</div>
                                                <div className="widget-subheading">Total de seguidores</div>
                                            </div>
                                            <div className="widget-content-right">
                                                <div className="widget-numbers text-primary"><span>{props.seguidores}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-xl-4">
                                    <div className="card mb-3 widget-content">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">Seguindo</div>
                                                <div className="widget-subheading">Total seguindo</div>
                                            </div>
                                            <div className="widget-content-right">
                                                <div className="widget-numbers text-danger"><span>{props.seguindo}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    </div>
);
};

export default ComponentWrapper;