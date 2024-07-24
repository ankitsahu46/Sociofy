import { useSearchParams } from 'react-router-dom';
import { Profile } from '..';

function ShowProfile() {
  const [params] = useSearchParams();
  const user_id = params.get('user_id');

  return (
    <Profile myProfile={false} user_id={user_id}/>
  )
}

export default ShowProfile;