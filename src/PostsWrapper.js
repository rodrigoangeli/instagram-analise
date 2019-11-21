import React, {Component}  from 'react';
import { orderBy } from "lodash";
import PostsList from "./PostsList";
import { FaSort } from 'react-icons/fa';



export default class PostsWrapper extends Component {
  
	constructor(props) {
		super(props);
		this.state = {
      dados: this.props.dados,
      sortParams: { direction: undefined },
      currentPage: 1,
      todosPerPage: 25,
		};
  }

  ordenarColuna(sortKey) {
    const { sortParams: { direction }
    } = this.state;
    // Check, what direction now should be
    const sortDirection = direction === "desc" ? "asc" : "desc";
    // Sort dataAtual  
    const sortedCollection = orderBy(this.props.dados, [sortKey], [sortDirection]);
    //Update component state with new data
    this.props.setPosts(sortedCollection);
    this.setState({
      dataAtual: sortedCollection,
      sortParams: {
        direction: sortDirection
      }
    });
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

	render() {
    const { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = this.props.dados.slice(indexOfFirstTodo, indexOfLastTodo);
    
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.dados.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number, i) => {
      return (
        <li key={i} className="page-item">
          <span className="page-link"
            key={number}
            id={number}
            onClick={this.handleClick.bind(this)}>
            {number}
          </span>
        </li>
      );
    });


    let publicacoes = currentTodos.map((data, index) => (
      
      <tr key={index}>
        <PostsList
          link={'https://www.instagram.com/p/' + data.shortcode_media.shortcode}
          tipo={data.shortcode_media.__typename === "GraphImage" ? 'Foto' : data.shortcode_media.__typename === "GraphVideo" ? 'Video' : 'Carrossel'}
          descricao={(data.shortcode_media.edge_media_to_caption.edges[0].node.text).substring(0, 50) + '..'}
          horario={new Date(
            data.shortcode_media.taken_at_timestamp * 1000
          ).toLocaleTimeString()}
          dia={new Date(
            data.shortcode_media.taken_at_timestamp * 1000
          ).toLocaleDateString()}
          src={data.shortcode_media.display_url}
          taxaEngajamento={((data.shortcode_media.edge_media_preview_like.count + data.shortcode_media.edge_media_preview_comment.count) / this.props.seguidores * 100).toFixed(2) + '%'}
          likesPost={data.shortcode_media.edge_media_preview_like.count}
          comentarios={data.shortcode_media.edge_media_preview_comment.count}
        />
      </tr>
    ))
		return (

      <div className="col-md-8">
      <div className="main-card mb-3 card">
        <div className="card-body">
          <table id="tabelaPosts" className="mb-0 table table-striped">
            <thead>
              <tr>
                <th onClick={() => this.ordenarColuna("shortcode_media.taken_at_timestamp")}>Publicações<span> ({this.props.dados.length} encontradas)</span> <FaSort /></th>
                <th>Thumb</th>
                <th onClick={() => this.ordenarColuna("shortcode_media.taxaEngajamento")}>Eng. % <FaSort /></th>
                <th onClick={() => this.ordenarColuna("shortcode_media.edge_media_preview_like.count")}>Likes <FaSort /></th>
                <th onClick={() => this.ordenarColuna("shortcode_media.edge_media_preview_comment.count")}>Comentários <FaSort /></th>
              </tr>
            </thead>
            <tbody>
              {publicacoes}
            </tbody>
          </table>

          <nav className="" aria-label="Page navigation example">
            <ul id="page-numbers" className="pagination">
              {renderPageNumbers}
            </ul>
          </nav>

        </div>
      </div>
    </div>
		);
	}
}