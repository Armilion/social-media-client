import React, {Component, Fragment } from 'react'; // Fragment is useful to mix multiple elements as one (?)
import PropTypes from 'prop-types'; 
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from "../util/MyButton";
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

//MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from"@material-ui/core/Typography";

//Icon
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from"@material-ui/icons/Chat";

//Redux
import { connect } from "react-redux";
import { getScream, clearErrors } from "../redux/actions/dataActions";

import LikeButton from "./LikeButton"; 
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const styles = {
	expandButton : {
		position : "absolute",
		left : "91%",
		top : "57%"
	},
	closeButton : {
		position:"absolute",
		left:"91%",
		top:"4%"
	},
	invisbleSeparator : {
		border : "none",
		margin : "4"
	},
	visibleSeparator : {
		width:"100%",
		borderBottom :"1px solid rgba(0,0,0,0.1)",
		marginBottom : "20px"
	},
	profileImage : {
      width: 200,
      height: 200,
      objectFit: 'cover',
      borderRadius: '50%'
  	}	,
  	dialogContent : {
  		padding : 30
  	},
  	spinnerDiv : {
  		textAlign: "center",
  		marginTop : 50,
  		marginBottom : 50
  	},
  	likeButton : {
  	}
};

class ScreamDialog extends Component {
	state = {
		open : false,
		oldPath : ''
	}

	componentDidMount(){
		if(this.props.openDialog)
			this.handleOpen();
	}

	handleOpen = () => {
		let oldPath = window.location.pathname;
		const { userHandle, screamId } = this.props;
		const newPath = `/user/${userHandle}/scream/${screamId}`;

		if(oldPath === newPath) oldPath = `/user/${userHandle}`; // when the page is loading directly onto the scream, there is not oldPath, we therefore have to set it manually

		window.history.pushState(null, null, newPath);

		this.setState({
			open : true,
			oldPath
		})
		this.props.getScream(this.props.screamId);
	}

	handleClose = () => {
		window.history.pushState(null, null, this.state.oldPath);
		this.setState({
			open : false
		})
		this.props.clearErrors();
	}


	render(){
		const { classes, scream : { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments}, ui : { loading } } = this.props;
		const dialogMarkup = this.props.ui.loading ? (
				<div className={classes.spinnerDiv}>
					<CircularProgress size={200} thickness={2} />
				</div>
			) : (
				<Grid container spacing={5}>
					<Grid item sm={5}>
						<img src={userImage} alt="Profile" className={classes.profileImage}/>
					</Grid>
					<Grid item sm={7}>
						<Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
							@{userHandle}
						</Typography>
						<hr className={classes.invisbleSeparator}/>
						<Typography variant="body2" color="textSecondary">
							{dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
						</Typography>
						<hr className={classes.invisbleSeparator}/>
						<Typography variant="body1">
						{body}
						</Typography>
						<LikeButton screamId={screamId} />
						<span>{likeCount} Likes</span>
						<MyButton tip="Comment">
							<ChatIcon color="primary"/>
						</MyButton>
						<span>{commentCount} Comments</span>
					</Grid>
					<hr className={classes.visibleSeparator} />
					<CommentForm screamId={screamId} />
					<Comments comments={comments} />
				</Grid> );
		return(
			<Fragment>
				<MyButton onClick={this.handleOpen} tip="Expand scream" tipClassName={classes.expandButton}>
					<UnfoldMore color="primary"/>
				</MyButton>
				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
					<MyButton tip="Close" tipClassName={classes.closeButton} onClick={this.handleClose}>
						<CloseIcon />
					</MyButton>
					<DialogContent className={classes.dialogContent}>
						{dialogMarkup}
					</DialogContent>
				</Dialog>
			</Fragment>
		)
	}
}

ScreamDialog.propTypes = {
	clearErrors : PropTypes.func.isRequired,
	getScream : PropTypes.func.isRequired,
	screamId : PropTypes.string.isRequired,
	userHandle : PropTypes.string.isRequired,
	scream : PropTypes.object.isRequired,
	ui : PropTypes.object.isRequired
}


const mapStateToPros = state => ({
	scream : state.data.scream,
	ui : state.ui
});

const mapActionsToProps = {
	getScream,
	clearErrors
};


export default connect(mapStateToPros, mapActionsToProps)(withStyles(styles)(ScreamDialog));