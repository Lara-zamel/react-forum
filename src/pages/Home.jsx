import {Link} from 'react-router-dom';

import {FaPlusCircle} from 'react-icons/fa';
import ItemsList from "../components/ItemsList";
function Home() {

  return(
     <>
    <div className="flex justify-end mb-4">
      <Link to="/form" className='mr-4 mt-4'>
        <FaPlusCircle fill="rgb(113, 122, 92)"className = "add"/>
      </Link>
    </div>
    <ItemsList></ItemsList>
  </>
  );
}

export default Home;
