import React, {Component, Fragment } from 'react'; // Fragment is useful to mix multiple elements as one (?)
import PropTypes from 'prop-types'; 
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';

//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import CalendarToday from '@material-ui/icons/CalendarToday';

import EditDetails from "./EditDetails"
import { logoutUser, uploadImage } from "../redux/actions/userActions";
import MyButton from "../util/MyButton";
import ProfileSkeleton from "../util/ProfileSkeleton";

//Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
});

//MuiLink is built on top of Typography so when can use the variant property

class Profile extends Component{

	handleEditPicture = () => { // triggers handleImageChange on input #imageInput by clicking on IconButton
		const fileInput = document.getElementById("imageInput");
		fileInput.click();
	}

	handleImageChange = (event) => {
		const image = event.target.files[0]; // select first file uploaded 
		const formData = new FormData();
		formData.append('image', image, image.name);
		this.props.uploadImage(formData);
	}

	handleLogout = () => {
		this.props.logoutUser();
	}

	render(){
		const { classes, user : { credentials : { handle, createdAt, imageURL, bio, website, location }, loading, authenticated }} = this.props;
		let profileMarkup = !loading? authenticated? 
		(
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<img className="profile-image" src={imageURL} alt="Profile"/>
					<input type="file" id="imageInput" onChange={this.handleImageChange} hidden="hidden"/>
					<MyButton tip="Edit profile image" btnClassName={classes.buttons} onClick={this.handleEditPicture} placement="top">
						<EditIcon color="primary"/>
					</MyButton>
				</div>
				<hr />
				<div className="profile-details">
					<MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5"> 
						@{handle}
					</MuiLink>
					<hr />
					{bio && (<Typography variant="body2">{bio}</Typography>)}
					<hr />
					{location && 
						(<Fragment>
							<LocationOn color="primary"/> <span>{location}</span>
							<hr />
						</Fragment>
					)}
					{website &&
						(<Fragment>
							<LinkIcon color="primary"/>
							<a href={website} target="_blank" rel="noopener noreferrer">
								{' '}{website}
							</a>
							<hr />
						</Fragment>
					)}
					<CalendarToday color="primary" />{' '}
					<span>Joined : {dayjs(createdAt).format("MMM YYYY")}</span>
				</div>
				<MyButton tip="Logout" onClick={this.handleLogout} placement="top">
					<KeyboardReturn color="primary"/>
				</MyButton>
				<EditDetails/>
			</div>
		</Paper>
		)
		: 
		(
			<Paper className={classes.paper}>
				<Typography variant="body2" align="center">
					You need to login to see your profile
				</Typography>
				<div className={classes.buttons}>
					<Button variant="contained" color="primary" component={Link} to="/login">
						Login
					</Button>
					<Button variant="contained" color="secondary" component={Link} to="/signup">
						Sign up
					</Button>
				</div>
			</Paper>
		)
		: (<ProfileSkeleton />);

		return profileMarkup;
	}
}


Profile.propTypes = {
	logoutUser : PropTypes.func.isRequired,
	uploadImage : PropTypes.func.isRequired,
	classes : PropTypes.object.isRequired,
	user : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	user : state.user
})

const mapActionsToProps = {
	logoutUser,
	uploadImage
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));