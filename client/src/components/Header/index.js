import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './index.sass';

export const Header = ({ categories }) => {
	return(
		<header>
			<div className="wrapper">
				<Link to="/"><h1>Readable</h1></Link>

				<nav>
					<ul>
						{
							categories.length > 0 &&
							categories.map((category, i) => {
								return(
									<li key={i}>
										<NavLink to={`/${category.path}`} activeClassName="nav-active">
											{category.name}
										</NavLink>
									</li>
								);
							})
						}
					</ul>
				</nav>
			</div>
		</header>
	);
};

const mapStateToProps = state => {
	return {
		categories: state.categoriesReducer
	};
};

Header.propTypes = {
	categories: PropTypes.array.isRequired
};

export default withRouter(connect(mapStateToProps)(Header));
