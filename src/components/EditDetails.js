import React, {Component, Fragment } from 'react'; // Fragment is useful to mix multiple elements as one (?)
import PropTypes from 'prop-types'; 
import withStyles from '@material-ui/core/styles/withStyles';


//Redux
import { connect } from 'react-redux';
import { editUserDetails } from "../redux/actions/userActions";
import MyButton from "../util/MyButton";

//MUI 
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
	textField : {
		margin:"10px auto 10px auto"
	},

	button : {
		float:"right"
	},
};

class EditDetails extends Component{
	state = {
		bio :'',
		website : '',
		location : '',
		open : false
	};

	handleSubmit = (event) => {
		const userData = {
			bio:this.state.bio,
			website:this.state.website,
			location:this.state.location
		}
		this.props.editUserDetails(userData);
		this.handleClose();
	}

	handleOpen = () => {
		this.setState({
			open : true
		});
	}

	handleClose = () => {
		this.setState({
			open : false
		});
		this.mapUserDetailsToState(this.props.credentials); // equivalent as destructuring
	}

	mapUserDetailsToState = (credentials) => {
		this.setState({
			bio : credentials.bio? credentials.bio : '',
			website : credentials.website? credentials.website : '',
			location : credentials.location? credentials.location : ''
		})
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]:event.target.value
		})
	}

	componentDidMount(){
		const { credentials } = this.props; 
		this.mapUserDetailsToState(credentials);
	}

	render(){
		const { classes } = this.props;
		return(
			<Fragment>
				<MyButton tip="Edit details" btnClassName={classes.button} onClick={this.handleOpen} placement="top">
					<EditIcon color="primary"/>
				</MyButton>
				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
					<DialogTitle>Edit your details</DialogTitle>
					<DialogContent>
						<form>
							<TextField name="bio" type="text" label="Bio" multiline rows="3" placeholder="A short bio about yourself" className={classes.TtextField} value={this.state.bio} onChange={this.handleChange} fullWidth />
							<TextField name="website" type="text" label="Website" multiline rows="3" placeholder="Your personal website here" className={classes.textField} value={this.state.website} onChange={this.handleChange} fullWidth />
							<TextField name="location" type="text" label="Location" multiline rows="3" placeholder="Where do you live?" className={classes.textField} value={this.state.location} onChange={this.handleChange} fullWidth />
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.handleSubmit} color="primary">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
			)
	}
}


EditDetails.propTypes = {
	editUserDetails : PropTypes.func.isRequired,
	classes : PropTypes.object.isRequired,
	credentials : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	credentials : state.user.credentials
})

const mapActionsToProps = {
	editUserDetails
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails));