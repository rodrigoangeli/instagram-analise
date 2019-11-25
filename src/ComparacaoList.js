import React, { Component } from 'react';


export default class ComparacaoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }


    render() {
      

        return (
            <>
                <tr key={this.props.key}>
                    <td> <img style={{borderRadius:50}} className="mr-3"
                                width="35px"
                                key={this.props.key}
                                src={this.props.src}
                                alt=""
                            ></img>
                            {this.props.perfil}</td>
                    <td>{this.props.publicacoes}</td>
                    <td>{this.props.fotos}</td>
                    <td>{this.props.carrossel}</td>
                    <td>{this.props.video}</td>

                </tr>
            </>
        );
    }
}