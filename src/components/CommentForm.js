import React, {Component } from 'react'; // Fragment is useful to mix multiple elements as one (?)
import PropTypes from 'prop-types'; 
import withStyles from '@material-ui/core/styles/withStyles';

//Redux
import { connect } from "react-redux";
import { postComment } from "../redux/actions/dataActions";

//MUI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
	textField : {
		margin:"10px auto 10px auto"
	},
	submitButton : {
		marginTop:"10px",
		marginBottom:"10px"
	},
	visibleSeparator : {
		width:"100%",
		borderBottom :"1px solid rgba(0,0,0,0.1)",
		marginBottom : "20px"
	}
};

class CommentForm extends Component {

	state = {
		body : '',
		errors : {}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.ui.errors)
			this.setState({
				errors : nextProps.ui.errors
			});
		if(!nextProps.ui.errors && !nextProps.ui.loading)
			this.setState({
				body : '',
				errors : ''
			});
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]:event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.postComment(this.props.screamId ,{body : this.state.body });
	}

	render(){
		const { classes, authenticated } = this.props;
		const errors = this.state.errors;
		const commentFormMarkup = authenticated ? (
			<Grid item sm={12} style={{textAlign:"center"}}>
				<form>
					<TextField type="text" rows="3" value={this.state.body} label="Comment on scream" name="body" error={errors.comment ? true : false} helperText={errors.comment} onChange={this.handleChange} fullWidth
					className={classes.textField} />
					<Button onClick={this.handleSubmit} variant="contained" color="primary" className={classes.submitButton}>
						Submit
					</Button>
				</form>
				<hr className={classes.visibleSeparator} />
			</Grid>
			)
		: null
		return commentFormMarkup;
	}
}

CommentForm.propTypes = {
	screamId : PropTypes.string.isRequired
}

const mapStateToProps = state => ({
	ui : state.ui,
	authenticated : state.user.authenticated
})

const mapActionsToProps = {
	postComment
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm));