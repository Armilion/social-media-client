import React, {Component} from 'react';

import MyButton from "../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//Icons
import FavoriteBorder from"@material-ui/icons/FavoriteBorder";
import FavoriteIcon from"@material-ui/icons/Favorite";

// Redux
import { connect } from "react-redux";

import { likeScream, unlikeScream } from "../redux/actions/dataActions";

class LikeButton extends Component{

	likedScream = () => {
		if(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId)) // if likes array for s aid user is not empty and if current screamId is found in likes array
			return true
		return false;
	}

	likeScream = () => {
		this.props.likeScream(this.props.screamId);
	}

	unlikeScream = () => {
		this.props.unlikeScream(this.props.screamId);
	}

	render(){
		const  { authenticated } = this.props.user;
		const likeButton = !authenticated? (
				<Link to="/login">
					<MyButton tip="Like">
							<FavoriteBorder color="primary"/>
					</MyButton>
				</Link>
			) : this.likedScream()? (
				<MyButton tip="Unlike" onClick={this.unlikeScream}>
					<FavoriteIcon color="primary"/>
				</MyButton>
			) : (
				<MyButton tip="Like" onClick={this.likeScream}>
					<FavoriteBorder color="primary"/>
				</MyButton>
			);

		return likeButton
	}
}

LikeButton.propTypes= {
	likeScream:PropTypes.func.isRequired,
	unlikeScream:PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	screamId : PropTypes.string.isRequired
}

const mapStateToProps = state => ({
	user: state.user
});

const mapActionsToProps = {
	likeScream,
	unlikeScream

}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);