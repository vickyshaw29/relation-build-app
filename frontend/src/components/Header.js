import React, { Fragment, useState } from 'react'
import { AppBar, Button, fade, InputAdornment, InputBase, makeStyles, TextField, Toolbar, Typography, useScrollTrigger } from '@material-ui/core';
import {Link} from 'react-router-dom'
const useStyles = makeStyles(theme => ({
	toolbarMargin: {
		...theme.mixins.toolbar
	},
	title: {
		textDecoration:"none",
		color:"#fff",
		flexGrow: 1,
		fontSize:"2rem",
		[theme.breakpoints.down('sm')]: {
			fontSize:"1.5rem"
		},
	},
    btn:{
        color:"white"
    }
}))
const Header = () => {
    const classes = useStyles()
	const [Term, setTerm] = useState("")
	function ElevationScroll(props) {
		const { children } = props;
		const trigger = useScrollTrigger({
			disableHysteresis: true,
			threshold: 0,
		});

		return React.cloneElement(children, {
			elevation: trigger ? 4 : 0,
		});
	}
	return (
		<Fragment>
			<AppBar>
				<Toolbar>
					<Typography className={classes.title}  variant="h5" noWrap component={Link} to="/">
						Relationship
						</Typography>
					<div >
                        <Button className={classes.btn} component={Link} to="/add">Add Relationship</Button>
						{/* <Button className={classes.btn} component={Link} to="/Post"></Button> */}
					</div>
				</Toolbar>
			</AppBar>

			<div className={classes.toolbarMargin} />

			
		</Fragment>
	)
    }
export default Header
