import { useState , useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import GoHome from '../components/GoHome';

function ForumPage() {
  const location = useLocation();
  const LSForums = JSON.parse(localStorage.getItem('forumItems'));
  const state = location.state;
  const CurrentForum = JSON.parse(localStorage.getItem('forumItems')).filter((item) =>item.id == state.id)[0];
  const [replies,setReplies] =useState(CurrentForum.replies ? CurrentForum.replies :[]);
  const [reply,setReply] = useState('');

  const repliesTemplate = replies && replies.length ? replies.map((item) => {
   return ( <div className="card card-bordered p-3 m-2 w-96 bg-base-100 shadow-xl" key={item.id}>
      <p>{item.content}</p>
    </div>)
  }):'';
 

  const onChange = (e) => {
    setReply(e.target.value);
    
  };

  useEffect(() => {
  // update forum and reflect to localstorage
  const updatedForums = LSForums.map((item)=>{
    if(item.id === state.id){
      return {
        ...item,
        replies:replies
      };
    }
    else return item;
  });
  setReply('');
  // setting localstorage
  localStorage.setItem('forumItems',JSON.stringify(updatedForums));
}, [replies]);

  const onSubmit = (e) => {
   e.preventDefault();
    // add reply to the replies array
    setReplies(prev => {
      return([{content:reply,id:uuidv4()}, ...replies]);
    });
   console.log(replies);
  };


  return (
    <>
    <GoHome/>
    <div className="card lg:card-side">
      <div className="card-body">
        <h1 className='text-3xl'>{state.title}</h1>
        <p>{state.description}</p>
        <br />
        <div className="overflow-y-scroll max-h-40">
          {repliesTemplate}
        </div>
        <br />
        
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <textarea className="textarea h-24 textarea-bordered" id="reply" placeholder="Add a reply here" onChange={onChange} value={reply} required></textarea>
          </div>
          <button className="btn btn-primary mt-2" type="submit">Reply</button>
        </form>
      </div>
    </div>
  </>
    
  )
}
export default ForumPage