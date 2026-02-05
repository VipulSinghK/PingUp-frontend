import React, { useEffect } from 'react'
import { useState } from 'react'
import { dummyPostsData } from '../assets/assets'
import Loader from '../components/Loader'
import Storiesbar from '../components/Storiesbar'
import PostCard from '../components/PostCard'
import RecentMessages from '../components/RecentMessages'

const Feed = () => {

  const [feeds, setfeeds] = useState([]);
  const [loading, setloading] = useState(true);
  
  const fetchFeeds = async () => {
    setfeeds(dummyPostsData)
    setloading(false);
  }

  useEffect(() => {
    fetchFeeds();
  }, [])


  return !loading ?(
    <div className='h-full overflow-y-scroll no-scrollbar py-10'>

      {/* Stories ans Posts Feed */}

      <div>
        <Storiesbar />
        <div className='p-4 space-y-6'>
          {feeds.map((post) => ( 
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/*Right sidebar*/}
      <div>
        <div>
          <h1>sponsored</h1>
          </div>

          <RecentMessages />

      </div>
      


    </div>
  ) : (
    <Loader />
  )
}

export default Feed
