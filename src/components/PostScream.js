import React, {Component, Fragment } from 'react'; // Fragment is useful to mix multiple elements as one (?)
import PropTypes from 'prop-types'; 
import withStyles from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from "react-redux";
import { postScream, clearErrors } from "../redux/actions/dataActions";

import MyButton from "../util/MyButton";

const styles = {
	textField : {
		margin:"10px auto 10px auto"
	},
	submitButton : {
		marginTop:"10px",
		position:"relative",
		marginBottom:"10px",
		float:"right"
	},
	circularProgress : {
		position:"absolute"
	},
	closeButton : {
		position:"absolute",
		left:"91%",
		top:"4%"
	},
	dialogTitle : {
		padding:"30px 24px 0 24px"
	}
};

class PostScream extends Component{
	state = {
		open : false,
		body : '',
		errors: {}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.ui.errors){
			this.setState({
				errors: nextProps.ui.errors
			})
		}
		if(!nextProps.ui.errors && !nextProps.ui.loading){
			this.setState({
				body: '',
				open : false,
				errors : {}
			})
		}
	}

	handleOpen = () => {
		this.setState({
			open : true
		})
	}

	handleClose = () => {
		this.props.clearErrors();
		this.setState({
			body:'', // necesarry to empty body as handleSubmit will send it's conctent wrether TextField is empty or not (body could have been filled earlier then Dialog button closed)
			open : false,
			errors : {}
		});
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]:event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.postScream({body : this.state.body });
	}

	render(){
		const { classes, ui : { loading } } = this.props;
		const { errors } = this.state;

		return (
			<Fragment>
				<MyButton onClick={this.handleOpen} tip="Post a scream">
					<AddIcon />
				</MyButton>
				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
					<MyButton tip="Close" tipClassName={classes.closeButton} onClick={this.handleClose}>
						<CloseIcon />
					</MyButton>
					<DialogTitle className={classes.dialogTitle}>
						Post a new scream !
					</DialogTitle>
					<DialogContent>
						<form>
							<TextField type="text" name="body" label="Content of your scream" placeholder="What's on your mind?" multiline rows="5" onChange={this.handleChange} error={errors.body ? true : false} helperText={errors.body} className={classes.textField} fullWidth />
							<Button onClick={this.handleSubmit} variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
								Submit
								{loading && <CircularProgress size={30} className={classes.circularProgress} />}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</Fragment>
		)
	}
}

PostScream.propTypes = {
	postScream: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	ui : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	ui:state.ui
});

const mapActionsToProps = {
	postScream,
	clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostScream));