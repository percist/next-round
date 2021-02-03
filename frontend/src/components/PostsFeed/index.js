import React from 'react';
import PostsCard from '../PostsCard';

const PostsFeed = ({ posts, user }) => {
    return (
        <div className="posts-feed">
            {!Array.isArray(posts) && <h2>loading...</h2> }
            {Array.isArray(posts) && posts.map(post => {
                return <PostsCard post={post} user={user}/>
            })}
        </div>
    )
}

export default PostsFeed;