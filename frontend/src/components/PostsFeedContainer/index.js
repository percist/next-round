import React, {useEffect, useState}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser } from '../../store/session';
import { fetchAllBuddyPosts } from '../../store/posts';
import PostsFeed from '../PostsFeed';

const PostsFeedContainer = () => {
    const dispatch = useDispatch();

    const {user} =  useSelector(reduxState => {
        return reduxState.session;
      });

    const posts = useSelector(reduxState => {
        return reduxState.posts;
    });

    useEffect(() => {
        dispatch(restoreUser());
    },[dispatch])

    useEffect(() => {
        dispatch(fetchAllBuddyPosts(user.id))
    },[dispatch, user])
    
    return <PostsFeed posts={posts} user={user} />
}

export default PostsFeedContainer;