import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import {FaHome} from 'react-icons/fa';

function FForm() {
    const [formData,setFormData] = useState({
        id:uuidv4(),
        title:'',
        description:'',
        archived:false,
        category:[]
    });

    const navigate = useNavigate();

    const onSubmit = (e) =>{
        e.preventDefault();
        
        setLocalStorage();
        navigate('/');
    };
    
    const onChange = (e) =>{
        if(e.target.id == 'archived'){
            setFormData({
                ...formData,
                [e.target.id]:e.target.checked
            })
        }

        else if(e.target.id == 'category'){
            let newCategory = formData.category;
            if(!newCategory.includes(e.target.value)){
                newCategory.push(e.target.value);
            setFormData({
                ...formData,
                [e.target.id]:newCategory
            })
            }
        }
        else{
            setFormData({
                ...formData,
                [e.target.id]:e.target.value
            })
        }
        
    };
    const setLocalStorage = () =>{
        const LSForums = JSON.parse(localStorage.getItem('forumItems'));
        const forums = LSForums ? LSForums : [];
        setFormData({
            ...formData,
        });
        forums.push(formData);
        // setting localstorage
        localStorage.setItem('forumItems',JSON.stringify(forums));
    };

    const {title,category,description,archived} = formData;
  return (
      <div className='container mx-auto'>
  <form  onSubmit={onSubmit}>
      <div className="form-control">
          <label className="label">
              <span className="label-text">Title</span>
          </label> 
          <input type="text" placeholder="Title" id="title" className="input input-bordered" required onChange={onChange}/>
       </div>
       <div className="form-control">
           <label className="label">
               <span className="label-text">Category</span>
           </label>
           <select name="category" id="category" className="select select-bordered select-sm" value={category} multiple required onChange={onChange}>
               <option value=".NetCore">.NetCore</option>
               <option value="computer">computer</option>
               <option value="Android">Android</option>
               <option value="programming">programming</option>
               <option value="React">React</option>
               <option value="Vue">Vue</option>
               <option value="Angular">Angular</option>
               <option value="IOS">IOS</option>

           </select>
       </div>
       <div className="form-control flex-row mt-4">
       <input type="checkbox" className="checkbox" id="archived" onChange={onChange} />
       <label className="label p-0 pl-2">
           <span className="label-text">Archived</span>
       </label>
       </div>
    <div className="form-control">
        <label className="label">
            <span className="label-text">Description</span>
        </label> 
        <textarea className="textarea h-24 textarea-bordered" id="description" placeholder="Add your description here" onChange={onChange}></textarea>
    </div>
    <button className="btn btn-primary mt-2" type="submit">Submit</button>
  </form>
  <div className="flex justify-end">
    <Link to="/">
        <FaHome className='inline-block mb-1'/>
        <p className='inline-block ml-2'> Home </p>
    </Link>
  </div>
  </div>
  );
}

export default FForm;
