import { useNavigate } from 'react-router-dom';
import {FaEllipsisH} from 'react-icons/fa';
import {FaPencilAlt} from 'react-icons/fa';
import {FaArchive} from 'react-icons/fa';
import {FaTrash} from 'react-icons/fa';

function ForumRow({forum, handleUpdate}) {
  const navigate = useNavigate();
  const LSForums = JSON.parse(localStorage.getItem('forumItems'));
const categoryColors = ['bg-red-400','bg-orange-400','bg-amber-400','bg-lime-400','bg-green-400'];
  const categoryView = forum.category.map( (cat,index) => {
    if(index <6){
    return (<div key={index} className={`avatar text-neutral-content rounded-full w-10 h-10 ${categoryColors[Math.floor(Math.random() * categoryColors.length)]}`}>
      <span className="text-xl">{cat.charAt(0)}</span>
    </div>)}
    });

  const handleAction = (e) => {
    const action = e.target.id;
    console.log(action);
    if(action == 'edit'){
      navigate('/edit-form',{state: forum});
    }
    else if (action == 'archive'){
      const editedForums = LSForums ? LSForums.map(item => {
        if (item.id === forum.id) {
          return {...item, archived:true};
        }
        return item;
      }) : {};
      console.log(editedForums);
      localStorage.setItem('forumItems',JSON.stringify(editedForums));
    }
    else if(action == 'delete'){
      const updatedForumsList = LSForums ? LSForums.filter((item) => (item.id !== forum.id)) :[];
      localStorage.setItem('forumItems',JSON.stringify(updatedForumsList));
    }
    handleUpdate();
  };
  const handleOpeningForum = () => {
    navigate(`/forum/${forum.id}`, {state: forum});
  };

  return (
    <div className="card card-bordered mb-4 overflow-visible relative">
       {forum.archived
          ?(<div className="badge badge-primary absolute">Archived</div> ) : ''
        }
      <div className="card-action flex justify-end">
      <div className="dropdown">
        <div tabIndex="0" className="m-3">
        <FaEllipsisH/>
        </div>
        <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
    <li>
      <a  id="edit" onClick={handleAction}>
        <FaPencilAlt/>&nbsp; Edit
      </a>
    </li> 
    <li>
      <a id="archive" onClick={handleAction}> <FaArchive/>&nbsp; archive</a>
    </li> 
    <li>
      <a id="delete" onClick={handleAction}> <FaTrash/> &nbsp; delete</a>
    </li>
        </ul>
      </div>
    </div>
      <div className="card-body pt-2">
        <div className="card-title cursor-pointer hover:underline hover:text-gray-500" onClick={handleOpeningForum}>
          {forum.title}
        </div>
        <div data-tip={forum.description} className="tooltip tooltip-primary text-left">
        <p className="truncate pb-2">{forum.description}</p></div>
        <div className="avatar -space-x-3 avatar-group placeholder">
          {categoryView}
        {forum.category.length > 6 ? (<div className='avatar bg-neutral-focus text-neutral-content rounded-full w-10 h-10'>
      <span>+{forum.category.length - 6}</span>
    </div>) : ''}
        </div>
      </div>
      
    </div>
  );
}
export default ForumRow;
