import React, {Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

// MaterialUI
// Related documentation Page : https://material-ui.com/components/app-bar/
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from "./Notifications"

import MyButton from "../util/MyButton";
import PostScream from "./PostScream";

import { connect } from "react-redux";
/*
<Button color="inherit" component={Link} to="/home">Home</Button> 
===
<Button color="inherit"><Link to="/home"/>Home</Button> 
parameter to is associated with existant routes (<Route exact path="/" component={home}/>, etc)
*/
class NavBar extends Component{
	render(){
		const { authenticated } = this.props;
		return (
			<AppBar>
				<ToolBar className="nav-container">
					{ authenticated?
						(	
							<Fragment>
								<Link to="/">
									<MyButton tip="Home">
										<HomeIcon color="primary" />
									</MyButton>
								</Link>
								<Link to="/">
									<PostScream/>
								</Link>
								<Link to="/notifications">
									<Notifications />
								</Link>
							</Fragment>
						)
						:
						(
							<Fragment>
								<Button color="inherit" component={Link} to="/">Home</Button>
								<Button color="inherit" component={Link} to="/login">Login</Button>
								<Button color="inherit" component={Link} to="/signup">Signup</Button>
							</Fragment>
						)
					}
				</ToolBar>
			</AppBar>
			)
	}
}

NavBar.propTypes = {
	authenticated : PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
	authenticated : state.user.authenticated
})

export default connect(mapStateToProps)(NavBar);