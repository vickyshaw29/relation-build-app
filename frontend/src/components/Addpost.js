import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, IconButton, makeStyles, TextField } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
// import Words from './Words';
import MuiAlert from '@material-ui/lab/Alert';
import { Redirect } from 'react-router';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        right: '40px',
        top: '500px',
        transition: 'all 0.2s ease-in 0s',//this is the key attribute
        zIndex: 9999,
        cursor: 'pointer',
        margin: theme.spacing(1),
    },
}));

const Addpost = ({ check, wordProp }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [user1, setuser1] = React.useState("")
    const [tag, settag] = React.useState("")
    const [user2, setuser2] = React.useState("")
    const [temp, settemp] = useState(check)
    const [error, seterror] = useState("")
    const [redirectTorefer, setredirectTorefer] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const postHandler = async () => {
        console.log('posthandler called')
        settemp(check)
        const data = await fetch(`/api/create`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body:JSON.stringify({
                user1,
                tag,
                user2
            })
        })
        const response = await data.json()
        if (response.error) {
            seterror('please enter a valid word')
            return false
        }
        console.log(response, 'response from the addword')
        setOpen(false)
        // settemp(wordProp(!check))
        setredirectTorefer(true)
    }
    const handleChange = () => {
        seterror("")
    }
    return (
        <>
            {/* <Alert severity="error" style={{ display: error ? "" : 'none' }}/> */}
            {redirectTorefer?<Redirect to="/"/>:""}
            <div className={classes.root}>
                <Fab size="large" color="primary" aria-label="add" onClick={handleClickOpen}  >
                    <AddIcon />
                </Fab>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"  >
                    <DialogTitle id="form-dialog-title">Add a new relationship</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: "#E30425" }}>
                            {error&&error}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="user1"
                            type="email"
                            fullWidth
                            onChange={(e) => {setuser1(e.target.value);seterror("")}}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="relationship"
                            type="email"
                            fullWidth
                            onChange={(e) => {settag(e.target.value);seterror("")}}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="user2"
                            type="email"
                            fullWidth
                            onChange={(e) => {setuser2(e.target.value);seterror("")}}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
          </Button>
                        <Button color="primary" onClick={postHandler}>
                            Add
          </Button>
                    </DialogActions>
                </Dialog>
                {/* <Words flag={temp}/> */}
            </div>
        </>
    )
}

export default Addpost
