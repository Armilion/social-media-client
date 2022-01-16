import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types'; // type checking with react
import { Link } from 'react-router-dom';

//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux
import { connect } from 'react-redux';
import { signupUser } from "../redux/actions/userActions"

const styles = {
	form : {
		textAlign:'center'
	},
	pageTitle : {
		marginTop:"1em"
	},
	textField : {
		marginTop:"10px auto 10px auto"
	},
	button : {
		marginTop:"20px",
		position:"relative",
		marginBottom:"10px"
	},
	customError : {
		color:"red",
		fontSize:"0.9rem",
		marginTop:"10px"
	},
	circularProgress : {
		position:"absolute"
	}
}

class signup extends Component{
	constructor(){
		super();
		this.state = {
			email:"",
			password:"",
			confirmPassword:"",
			handle:"",
			errors : {}
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.ui.errors){
			this.setState({
				errors : nextProps.ui.errors
			})
		}
	}
	
	handleSubmit = (event) => {
		event.preventDefault();
		const userData = {
			email:this.state.email,
			password:this.state.password,
			confirmPassword:this.state.confirmPassword,
			handle:this.state.handle
		}
		this.props.signupUser(userData, this.props.history);
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]:event.target.value
		})
	}

	render(){
		const { classes, ui : { loading } } = this.props;
		const { errors } = this.state;
		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm >
					<Typography variant="h2" className={classes.pageTitle}>
						Sign up 
					</Typography>
					<form noValidate onSubmit = {this.handleSubmit}>
						<TextField id="email" name="email" type="email" label="Email" className={classes.textField}
							value={this.state.email} onChange = {this.handleChange} fullWidth helperText={errors.email} error={errors.email?true:false}/>
						<TextField id="password" name="password" type="password" label="Password" className={classes.textField}
							value={this.state.password} onChange = {this.handleChange} fullWidth helperText={errors.password} error={errors.password?true:false}/>
						<TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm password" className={classes.textField}
							value={this.state.confirmPassword} onChange = {this.handleChange} fullWidth helperText={errors.confirmPassword} error={errors.confirmPassword?true:false}/>
						<TextField id="handle" name="handle" type="text" label="Handle" className={classes.textField}
							value={this.state.handle} onChange = {this.handleChange} fullWidth helperText={errors.handle} error={errors.handle?true:false}/>
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>)}
						<Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
							Sign up
							{loading && (
								<CircularProgress size={30} className={classes.circularProgress}/>
							)}
						</Button>
						<br />
						<small>Already have an account? Login <Link to="/login">here</Link></small>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
			)
	}
}

signup.propTypes = {
	classes : PropTypes.object.isRequired,
	signupUser : PropTypes.func.isRequired,
	user : PropTypes.object.isRequired,
	ui : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	user : state.user,
	ui : state.ui
})

const mapsActionsToProps = {
	signupUser
}

export default connect(mapStateToProps, mapsActionsToProps)(withStyles(styles)(signup));