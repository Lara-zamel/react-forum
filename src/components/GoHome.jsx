import {Link} from 'react-router-dom';
import {FaHome} from 'react-icons/fa';

function GoHome() {
  return (
    <div className="flex justify-end mt-2 mr-2">
    <Link to="/">
        <FaHome className='inline-block mb-1'/>
        <p className='inline-block ml-2'> Home </p>
    </Link>
  </div>
  )
}

export default GoHome