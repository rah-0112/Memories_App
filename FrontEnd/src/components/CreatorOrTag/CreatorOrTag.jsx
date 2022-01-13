import React, { useEffect } from 'react';
import { Grid, Typography, Divider, CircularProgress, Paper } from '@material-ui/core';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';
import Post from '../Posts/Post/Post';
import useStyles from './styles';

const CreatorOrTag = () => {
    const { name } = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const { posts, isLoading } = useSelector((state) => state.posts);

    useEffect(() => {
        if(location.pathname.startsWith('/tag'))
            dispatch(getPostsBySearch({ tags: name }));
        if(location.pathname.startsWith('/creator'))
            dispatch(getPostsByCreator(name));
    },[]);

    if (!posts.length && !isLoading) return 'No posts';

    if(isLoading) {
        return(
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    };

    return (
        <div>
            <Typography variant="h3" className={classes.divider}>{name}</Typography>
            <Divider className={classes.divider} />
            <Grid container alignItems='stretch' spacing={3}>
                {posts?.map((post, i) => (
                    <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                        <Post post={post} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default CreatorOrTag;
