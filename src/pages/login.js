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

// Redux
import { connect } from 'react-redux';
import { loginUser } from "../redux/actions/userActions";

const styles = {
	form : {
		textAlign:'center'
	},
	pageTitle : {
		marginTop:"1em"
	},
	textField : {
		margin:"10px auto 10px auto"
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


export class login extends Component{
	constructor(){
		super();
		this.state = {
			email:"",
			password:"",
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
			password:this.state.password
		}
		this.props.loginUser(userData, this.props.history);
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]:event.target.value
		})
	}

	render(){
		const { classes, ui : {loading} } = this.props;
		const { errors } = this.state;
		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm >
					<Typography variant="h2" className={classes.pageTitle}>
						Login
					</Typography>
					<form noValidate onSubmit = {this.handleSubmit}>
						<TextField id="email" name="email" type="email" label="Email" className={classes.textField}
							value={this.state.email} onChange = {this.handleChange} fullWidth helperText={errors.email} error={errors.email?true:false}/>
						<TextField id="password" name="password" type="password" label="Password" className={classes.textField}
							value={this.state.password} onChange = {this.handleChange} fullWidth helperText={errors.password} error={errors.password?true:false}/>
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>)}
						<Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
							Login
							{loading && (
								<CircularProgress size={30} className={classes.circularProgress}/>
							)}
						</Button>
						<br/>
						<small>Don't have an account? Sign up <Link to="/signup">here</Link></small>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
			)
	}
}

login.propTypes = {
	classes : PropTypes.object.isRequired,
	loginUser : PropTypes.func.isRequired,
	user : PropTypes.object.isRequired,
	ui : PropTypes.object.isRequired
}

// select data from the store that the component need, recuperated from the store

const mapStateToProps = (state) => ({ 
		user : state.user,
		ui : state.ui
});

const mapActionsToProps = { // allow to call functions that dispatch
	loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));