import React, {Component, Fragment} from 'react';
import { Link } from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from "prop-types";
import NoImg from "../images/no-img.png";

//MUI
import Paper from '@material-ui/core/Paper';

//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = {
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
  handle : {
		width : 60,
		height : 20,
		backgroundColor : "#00bcd4",
		margin : '0 auto 7px auto' 
	},

	fullLine : {
		height : 15,
		width : "100%",
		marginBottom : "10px",
		backgroundColor : 'rgba(0,0,0,0.5)'

	},

	halfLine : {
		display : "inline-block",
		height : 15,
		width : "50%",
		marginLeft: "5px",
		backgroundColor : 'rgba(0,0,0,0.5)'

	}

};

const ProfileSkeleton = props => {
	const { classes } = props;
	return(
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<img src={NoImg} alt="Profile" className="profile-image"/>
				</div>
				<hr />
				<div className={classes.handle}/>
				<hr />
				<div className={classes.fullLine}/>
				<div className={classes.fullLine}/>
				<hr />
				<LocationOn color="primary"/> <div className={classes.halfLine}/>
				<hr />
				<LinkIcon color="primary"/> <div className={classes.halfLine}/>
				<hr />
				<CalendarToday color="primary"/> <div className={classes.halfLine}/>
				<hr />
			</div>
		</Paper>
	)
}

ProfileSkeleton.propTypes = {
	classes : PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton);