import {useState} from 'react';

function FForm() {
    const [formData,setFormData] = useState({
        title:'',
        description:'',
        archived:false,
        category:[]
    });

    const onSubmit = (e) =>{
        e.preventDefault();
        
        setLocalStorage();
    };
    
    const onChange = (e) =>{
        if(e.target.id == 'archived'){
            setFormData({
                ...formData,
                [e.target.id]:e.target.checked
            })
        }

        else if(e.target.id == 'category'){
            console.log(e.target.value);
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
        localStorage.setItem('forumItems',JSON.stringify(formData));
        console.log(JSON.parse(localStorage.getItem('forumItems')));

    };

    const {title,category,description,archived} = formData;
  return (
  <form className='container mx-auto' onSubmit={onSubmit}>
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
               <option value="kitchen">kitchen</option>
               <option value="computer">computer</option>
               <option value="housing">housing</option>
               <option value="programming">programming</option>
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
  );
}

export default FForm;
