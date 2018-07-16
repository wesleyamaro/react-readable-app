import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadPostDetails } from '../../../actions/posts';
import { ConvertUNIX } from '../../../helpers/';
import Comments from '../../../components/Comments/';
import VoteScore from '../../../components/VoteScore/';

import './index.sass';

class PostDetailsPage extends React.Component {
	componentDidMount() {
		const { match, loadPostDetails } = this.props;
		loadPostDetails(match.params.id);
	}

	render() {
		const { post } = this.props;
		let commentsTitle = `${post.commentCount} Comments`;

		if(post) {
			if(post.commentCount === 0) {
				commentsTitle = 'Be the first to comment';
			} else if(post.commentCount === 1) {
				commentsTitle = '1 Comment';
			}
		}

		return(
			<div className="wrapper">
				{
					post && post.deleted === false &&
					<div id="postDetails">
						<h1>
							<span className="postDetails-category">{post.category}</span>: {post.title}
						</h1>

						<div id="postDetails-content">
							<small>Published {ConvertUNIX(post.timestamp)} by {post.author}</small>
							<p>{post.body}</p>
							<VoteScore voteScoreId={post.id} voteScoreType="post" voteScoreResult={post.voteScore} />

							<h2>{commentsTitle}</h2>
							<Comments />
						</div>
					</div>
				}
			</div>
		);
	}
}

PostDetailsPage.propTypes = {
	match: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	loadPostDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		post: state.postsReducer.post
	};
};

export default connect(mapStateToProps, { loadPostDetails })(PostDetailsPage);
