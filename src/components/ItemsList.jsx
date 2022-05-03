import {useState} from 'react';
import ForumRow from './ForumRow';

function ItemsList() {
 
  const LSForums = JSON.parse(localStorage.getItem('forumItems'));
  

  const [forums, setForums] = useState( LSForums ? LSForums : []);

  const handleUpdate = () => {
    const updatedForums = JSON.parse(localStorage.getItem('forumItems'));
    setForums(updatedForums); 
  };
  const rows = forums.map((item) => (
   <ForumRow key={item.id} forum={item} handleUpdate={handleUpdate}/>
 ));
 if (!rows.length){
   return (
     <div>
       <h2> There are no items yet !</h2>
     </div>
   )
 }
else {
  return (
    <div className='w-2/4 mx-auto my-0'>
      
    {rows}
    </div>
  );
}

  
}

export default ItemsList;
