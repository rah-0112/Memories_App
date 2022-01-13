import React from 'react';
import { useSelector } from 'react-redux';
import { LinearProgress, Grid } from '@material-ui/core';

import Post from './Post/Post.js';
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
    const classes = useStyles();
    const { posts, isLoading } = useSelector((state) => state.posts); // before [] -> now { isLoading, posts: [] }

    if(!posts.length && !isLoading) return 'No posts';

    return (
        isLoading ? (
            <div className={classes.root}>
                <LinearProgress />
                <LinearProgress color="secondary" />
            </div>
            ) : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts?.map((post) => (
                  <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                    <Post post={post} setCurrentId={setCurrentId} />
                  </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;
