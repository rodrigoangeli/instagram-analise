import React, { Component } from 'react';
import { HideUntilLoaded } from 'react-animation'
import { FiExternalLink } from 'react-icons/fi';
import Modal from "./Componente";


export default class ComponentWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    showModal = e => {
        this.setState({
            show: !this.state.show
        });
    };



    render() {
        const styles = {
            heroContainer: {
                backgroundImage: `url(${this.props.src})`,
            }
        }

        return (
            <>
                <tr onClick={e => {
                    this.showModal(e);
                }} key={this.props.key}>
                    <td>
                        <div className="badge badge-pill badge-secondary">{this.props.tipo}</div> <span className="badge badge-light">Postado em {this.props.dia} ({this.props.horario})</span> <a rel="noopener noreferrer" target="_blank" href={this.props.link}><FiExternalLink /></a>
                        <br />{this.props.descricao}</td>
                    <td>
                        <HideUntilLoaded
                            imageToLoad={this.props.src}
                        >
                            <img
                                width="50px"
                                key={this.props.key}
                                src={this.props.src}
                                alt=""
                            ></img>
                        </HideUntilLoaded>
                    </td>

                    <td>{this.props.taxaEngajamento}</td>
                    <td>{this.props.likesPost}</td>
                    <td>{this.props.comentarios}</td>

                </tr>

                <Modal onClose={this.showModal} show={this.state.show}>
                    <div className="img-wrapper">
                        <div className="img-backdrop" style={styles.heroContainer}></div>
                        <img className="img-fluid" alt="" src={this.props.src}></img>
                    </div>
                    <div className="card-wrapper">

                        <div class="card-body">
                            <h5 class="card-title">{this.props.nome}</h5>
                            <h6 class="card-subtitle">@{this.props.arroba}</h6>
                            <p>{this.props.descricaoCompleta}</p>
                            <div className="row">
                            <div className="col-4">
                                <div class="widget-chart">
                                    <div class="widget-content">
                                        <div class="widget-content-outer">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left pr-2 fsize-1">
                                                    <div class="widget-numbers mt-0 fsize-3 text-success">{this.props.likesPost}</div>
                                                </div>
                                            </div>
                                            <div class="widget-content-left fsize-1">
                                                <div class="text-muted opacity-6">Likes</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                            <div class="widget-chart">
                                    <div class="widget-content">
                                        <div class="widget-content-outer">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left pr-2 fsize-1">
                                                    <div class="widget-numbers mt-0 fsize-3 text-primary">{this.props.comentarios}</div>
                                                </div>
                                            </div>
                                            <div class="widget-content-left fsize-1">
                                                <div class="text-muted opacity-6">Comentários</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                            <div class="widget-chart">
                                    <div class="widget-content">
                                        <div class="widget-content-outer">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left pr-2 fsize-1">
                                                    <div class="widget-numbers mt-0 fsize-3 text-danger">{this.props.taxaEngajamento}</div>
                                                </div>
                                            </div>
                                            <div class="widget-content-left fsize-1">
                                                <div class="text-muted opacity-6">Engajamento</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            </div>
                         
                            
                        </div>



                    </div>
                </Modal></>
        );
    }
}