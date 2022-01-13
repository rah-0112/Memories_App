import React, { useState, useEffect } from 'react';
import { TextField, Paper, Button, Typography } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from  'react-redux';
import { useHistory } from 'react-router-dom';

//form u need to change

import useStyles from "./styles";
import { createPost, updatePost } from '../../actions/posts';
 
const Form = ({ currentId, setCurrentId }) => {
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);

    useEffect(() => {
        if(post) setPostData(post);
    }, [post]);

    const [postData, setPostData] = useState({ 
        title: '', 
        message: '', 
        tags: '', 
        selectedFile: '' });

    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleSumbit = (e) => {
        if(currentId){
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        }
        else{
            dispatch(createPost({ ...postData, name: user?.result?.name }, history));
        }
        e.preventDefault();
    }

    const clear = () => {   
        setPostData({ 
            title: '', 
            message: '', 
            tags: '', 
            selectedFile: '' });
        setCurrentId(null);
    }

    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please Sign in to create your own memories and like other's memories.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper} elevation={6}> 
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSumbit}>
                <Typography className={classes.heading} variant='h6' align='center'>Creating A Memory</Typography>
                <TextField variant='outlined' label="Title" name="title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField variant='outlined' label="Message" name="message" multiline rows={4} fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField variant='outlined' label="Tags (coma separated)" name="tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <section className={classes.fileInput}>
                    <FileBase 
                        type='file'
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </section>
                <Button className={classes.buttonSubmit} variant='contained' color="primary" size="large" type="sumbit" fullWidth>Sumbit</Button>
                <Button variant='contained' color="secondary" size="medium" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;
