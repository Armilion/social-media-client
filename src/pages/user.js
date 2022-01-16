import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types'; // type checking with react
import axios from 'axios';

import StaticProfile from "../components/StaticProfile";
import Profile from "../components/Profile";
import Scream from "../components/scream";

//MUI
import Grid from "@material-ui/core/Grid";

//Redux
import { connect } from 'react-redux';
import { getUserData } from "../redux/actions/dataActions";

import ProfileSkeleton from "../util/ProfileSkeleton";
import ScreamSkeleton from "../util/ScreamSkeleton";

const styles = {

};

class user extends Component{
	state = {
		profile : null,
		screamIdParam : null
	}

	componentDidMount(){
		const handle = this.props.match.params.handle;
		const screamId = this.props.match.params.screamId;

		if(screamId) this.setState({screamIdParam : screamId});

		this.props.getUserData(handle);
		axios.get(`/user/${handle}`)
		.then(res => {
			this.setState({
				profile : res.data
			})
		})
		.catch(err => console.log(err));
	}

	render(){
		const { data : { screams, loading }, authenticatedUserHandle } = this.props;
		const { screamIdParam } = this.state;
		const screamsMarkup = loading ? (
			<ScreamSkeleton />
		) : screams === null ? (
			<p>No screams from this user</p>
		) : !screamIdParam ? ( 
			screams.map(scream => <Scream key={scream.screamId} scream={scream}/> )
		) : (
			screams.map(scream => {
				if(scream.screamId !== screamIdParam)
					return <Scream key={scream.screamId} scream={scream}/>
				else 
					return <Scream key={scream.screamId} scream={scream} openDialog/>
			})
		);
		return(
			<Grid container spacing={10}>
		        <Grid item sm={8} xs={12}>
		          {screamsMarkup}
		        </Grid>
		        <Grid item sm={4} xs={10}>
		        	{this.state.profile === null ? (
		        			<ProfileSkeleton />
		        		) : authenticatedUserHandle === this.props.match.params.handle ? (
		        			<Profile />
		        		) : (
		        			<StaticProfile profile={this.state.profile} />
		        		)
		        	}
		        </Grid>
		      </Grid>
		)
	}
}

user.propTypes = {
	getUserData : PropTypes.func.isRequired,
	data : PropTypes.object.isRequired,
	authenticatedUserHandle : PropTypes.string.isRequired
}

const mapStateToProps = state => ({
	data:state.data,
	authenticatedUserHandle : state.user.credentials.handle
});

const mapActionsToProps = {
	getUserData
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(user));