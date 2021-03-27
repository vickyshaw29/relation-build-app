import React, { Fragment, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { Button, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

    firstTxt: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "40vw",
        marginTop: "3em",
        [theme.breakpoints.down('sm')]: {
            marginLeft: "20vw"
        },
    },
    select: {
        width: "20vw",
        marginBottom: "2rem",
        [theme.breakpoints.down('sm')]: {
            width: "60vw"
        },
    },
    button: {
        width: "20vw",
        [theme.breakpoints.down('sm')]: {
            width: "60vw"
        },
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(5),
          width: theme.spacing(100),
          height: theme.spacing(16),
        },
        marginLeft:"15vw",
        [theme.breakpoints.down('sm')]: {
            '& > *': {
                margin: theme.spacing(5),
                width: theme.spacing(30),
                height: theme.spacing(16),
              },
              marginLeft:"1rem"
        },
        
      },
      typo:{
        margin:"1rem",
        letterSpacing:"5px",
        fontWeight:"bold",
        marginLeft:"15vw",
        [theme.breakpoints.down('sm')]: {
            marginLeft:"8px",
            fontSize:"12px",
            letterSpacing:"1px"
        },
      }

}));

const Homepage = () => {
    const classes = useStyles();
    const [search, setsearch] = React.useState([])
    const [users, setusers] = React.useState([])
    const [user1, setuser1] = React.useState("")
    const [user2, setuser2] = React.useState("")
    const [secondUser, setsecondUser] = React.useState("")
    const [open, setopen] = React.useState(false)
    useEffect(async () => {
        const data = await fetch(`/api/word?search=${search}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const response = await data.json()
        console.log(response)
        setusers(response)
        return () => {
            console.log('clean up work from Homepage.js')
        }
    }, [search])
    const handleChange = (user) => {
        setuser1(user)
    }
    const secondhandleChange = (user) => {
        setuser2(user)
    }
    const buttonClickhandler = () => {
        setopen(true)
        console.log(user1, user2)
    }
    return (
        <Fragment>
            <div >
                <Paper elevation={27}>
                    <>
                        <div className={classes.firstTxt}>
                            <TextField
                                className={classes.select}
                                id="standard select-currency"
                                select
                                label="Select the first user"

                            >
                                {users.map((user) => (
                                    <MenuItem key={user.label} value={user.user1} onClick={() =>{ handleChange(user);}}>{user.user1}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                className={classes.select}
                                id="standard select-currency"
                                select
                                label="Select second user"

                            >
                                {users.map((user) => (
                                    <MenuItem key={user.label} value={user.user1} onClick={() => {secondhandleChange(user);setsecondUser(user)}}>{user.user2}</MenuItem>
                                ))}
                            </TextField>
                            <Button className={classes.button} variant="contained" color="primary" onClick={buttonClickhandler}>see relation</Button>
                        </div>
                    </>
                </Paper>
            </div>
            {open ? <div className={classes.root}>
                <Paper elevation={20}>
                    {!secondUser.user1 === user1.user1|| !secondUser.user2 === user1.user2?
                        <Typography className={classes.typo}>
                        {`${user1.user1} >>${user1.tag}>>${user1.user2}`}
                        </Typography>
                    :<Typography className={classes.typo}>{`${user1.user1}>>${user1.user2}>>${user2.user2}`}</Typography>}
                </Paper>
            </div>
:""}
        </Fragment >
    )
}

export default Homepage
