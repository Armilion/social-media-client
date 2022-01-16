import React, {Component, Fragment } from 'react'; // Fragment is useful to mix multiple elements as one (?)
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import withStyles from '@material-ui/core/styles/withStyles';

//MUI
import Grid from "@material-ui/core/Grid";
import Typography from"@material-ui/core/Typography";


import dayjs from 'dayjs';

const styles = {

	invisibleSeparator : {
		border : "none",
		margin : "4"
	},
	visibleSeparator : {
		width:"100%",
		borderBottom :"1px solid rgba(0,0,0,0.1)",
		marginBottom : "20px"
	},
	commentImage : {
		maxWidth : "100%",
		width: 100,
      	height: 100,
      	objectFit: 'cover',
      	borderRadius: '50%'
	},
	commentData : {
		marginLeft : 20
	}

};

class Comments extends Component {
	render(){
		const { classes, comments } = this.props;
		return (
			<Grid container>
			{comments.map((comment, index) => {
				const { body, createdAt, userImage, userHandle } = comment;
				return (
					<Fragment key={createdAt}>
						<Grid item sm={12}>
							<Grid container>
								<Grid item>
									<img src={userImage} alt="Profile" className={classes.commentImage}/>
								</Grid>
								<Grid item>
									<div className={classes.commentData}>
										<Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
											{userHandle}
										</Typography>
										<Typography variant="body2" color="textSecondary">
											{dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
										</Typography>
										<hr className={classes.invisibleSeparator}/>
										<Typography variant="body1">
											{body}
										</Typography>
									</div>
								</Grid>
							</Grid>
						</Grid>
						{(index < comments.length - 1) && <hr className={classes.visibleSeparator}/>}
					</Fragment>
				)
			})}
			</Grid>
		)
	}
}

Comments.propTypes = {
	comments : PropTypes.array.isRequired
}

export default withStyles(styles)(Comments);