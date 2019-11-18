import React, {Component}  from 'react';
import HashtagList from "./HashtagList";



export default class HashtagWrapper extends Component {
  
	constructor(props) {
		super(props);
		this.state = {
		};
  }


	render() {
    let renderizada = this.props.hashtagArr.map((data, index) => (
      <tr key={index}>
        <HashtagList
          hashtag={data.hashtag}
          engajamentoPorPost={200}
          postsContem={data.repeticoes}
        />
      </tr>
    ))
		return (
      <div className="col-md-4">
            <div className="main-card mb-3 card">
              <div className="card-body">
                <table className="mb-0 table table-striped">
                  <thead>
                    <tr>
                      <th>Hashtag</th>
                      <th>Posts</th>
                      <th>Eng. por post</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderizada}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
		);
	}
}