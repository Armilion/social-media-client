import React, {Component} from 'react';
import PropTypes from "prop-types";
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import MyButton from "../util/MyButton";
import LikeButton from "./LikeButton";

// Icons
import ChatIcon from"@material-ui/icons/Chat";

//Redux
import { connect } from "react-redux";

import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";

const styles = {
	card:{
		display:"flex",
		marginBottom:20,
		position:"relative"
	},

	image:{
		minWidth:200
	},

	content:{
		padding:25,
		objectFit:"cover"
	}
}

class Scream extends Component{
	render(){
		dayjs.extend(relativeTime); // add plugin to dayjs
		const {classes, scream:{body, createdAt, userImage, userHandle, likeCount, screamId, commentCount}, user : { authenticated, credentials : { handle } } } = this.props;
		// const classes = this.props.classes => destructuring in javascript
		

		const deleteButton = authenticated && handle === userHandle? 
		<DeleteScream screamId={screamId} />
		:null;
		return (
			<Card className={classes.card}>
				<CardMedia 
					className={classes.image}
					image = {userImage}
					title = "Profile image"/>
				<CardContent className={classes.content}>
					<Typography variant="h5" component={Link} to={`/user/${userHandle}`} color="primary">{userHandle}</Typography>
					{deleteButton}
					<Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
					<Typography variant="body1">{body}</Typography>
					<LikeButton screamId={screamId} />
					<span>{likeCount} Likes</span>
					<MyButton tip="Comment">
						<ChatIcon color="primary"/>
					</MyButton>
					<span>{commentCount} Comments</span>
					<ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
				</CardContent>
			</Card>
			)
	}
}

Scream.propTypes= {
	scream:PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	classes : PropTypes.object.isRequired,
	openDialog : PropTypes.bool
}

const mapStateToProps = state => ({
	user: state.user
});


export default connect(mapStateToProps, null)(withStyles(styles)(Scream));
//module.exports =  {withStyles(styles)(Scream)}; // create a class of styles that will be usable in the component Scream
