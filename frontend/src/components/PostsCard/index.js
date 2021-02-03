import React, { useState, useEffect } from 'react';
import CommentFeed from '../CommentFeed'


const PostsCard = ({ post, user }) => {

    const [ site, setSite ] = useState({});
    const [ round, setRound ] = useState({});
    // const [ user, setUser ] = useState({});
    const [ replies, setReplies ] = useState([]);

  
    useEffect(() =>{
      const fetchSite = async(post) => {
        const response = await fetch(`/api/sites/${post.siteId}`)
        const site = await response.json()
        setSite(site)
      }
      const fetchRound = async(post) => {
        const response = await fetch(`/api/round/${post.roundId}`)
        const round = await response.json()
        setRound(round)
      }
    //   const fetchUser = async(post) => {
    //     const response = await fetch(`/api/user/${post.userId}`)
    //     const user = await response.json()
    //     setUser(user)
    //   }
      const fetchReplies = async(post) => {
        const response = await fetch(`/api/post/${post.id}/replies`)
        const replies = await response.json()
        setReplies(replies)
      }

      fetchSite(post)
    //   fetchUser(post)
      fetchRound(post)
      fetchReplies(post)
    },[post])


    return (
        <div className="posts-card">
            <div className="posts-card-header">
                <div id="posts-card-header_site_name">
                    {site.name}
                </div>
                <div id="posts-card-header_site_location">
                    {`${site.city}, ${site.state}`}
                </div>
            </div>
            <div className="post-card-image">
                {!post.imgUrl && !site.imgUrl && !round.drink.imgUrl && null}
                {!post.imgUrl && !site.imgUrl && <img src={round.item.imgUrl} alt="drink"/>}
                {!post.imgUrl && <img src={site.imgUrl} alt="site"/>}
                {post.imgUrl && <img src={post.imgUrl} alt="post"/>}
            </div>
            <div className="post-card-info">
                <div>
                    {`${user.firstName} having a ${round.item}`}
                </div>
                <div>
                    {post.content}
                </div>
                <div>
                    {!Array.isArray(replies) && "Be the first to comment"}
                    {Array.isArray(replies) && <CommentFeed comments={replies} post={post} user={user}/>}
                </div>
            </div>
        </div>
    )
}

export default PostsCard;