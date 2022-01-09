import React from 'react';
import { useSelector } from 'react-redux';
import { LinearProgress, Grid } from '@material-ui/core';

import Post from './Post/Post.js';
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);
    console.log(posts);

    return (
        !posts.length ? (
            <div className={classes.root}>
                <LinearProgress />
                <LinearProgress color="secondary" />
            </div>
            ) : (
            <Grid container alignItems='stretch' className={classes.mainContainer} spacing={3}>
                {posts.map((post) => (
                    <Grid item key={post._id} xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;
