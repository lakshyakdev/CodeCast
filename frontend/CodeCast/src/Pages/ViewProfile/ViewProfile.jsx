import { useEffect, useState } from 'react'
import ProfileCard from '../../blocks/Components/ProfileCard/ProfileCard'
import { useDispatch } from 'react-redux';
import { userProfile } from '../../redux/slices/authSlice';
import toast from 'react-hot-toast';
import FadeContent from '../../blocks/Animations/FadeContent/FadeContent';
export default function ViewProfile(){
    const [user , setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const loadUserInfo = async ()=>{
        try{
            let response = await dispatch(userProfile());
            if(response.payload.success){
                setUser(response.payload.user);
                setLoading(false);
            }
            else{
                toast.error("User profile cannot be load");
            }
        }
        catch(e){
            toast.error(e);
        }
    }

    useEffect(()=>{
        (async ()=> {await loadUserInfo()})();
    },[]);

    if(loading){
        return(
            <>
                <h1 className='text-center'><b>Loading...</b></h1>
                <div className="flex w-52 flex-col gap-4 w-auto" >
                <div className="flex items-center gap-4">
                    <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                    <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                    </div>
                </div>
                <div className="skeleton h-32 w-full"></div>
                </div>
            </>
        )
    }

    return(
        <div className=' flex flex-col items-center gap-y-7 mt-3'> 
        <ProfileCard
            name={user.username}
            title={user.role}
            handle={user.email}
            status="Online"
            contactText="Refresh profile"
            avatarUrl={user.avatar.url}
            enableTilt={true}
            onContactClick={() => console.log('Contact clicked')}

            showUserInfo={false}
        />
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} className='mb-2'>
        <div class="card w-full max-w-md bg-base-100 card-sm shadow-sm">
            <div class="card-body">
                <h2 class="text-2xl text-center"><b>User Details</b></h2>
                <p className='text-base'><b className='text-red-500'>Email : </b><i>{user.email}</i> &nbsp;&nbsp;
                    <b>Role : </b><i>{user.role}</i></p>
                <p className='text-base'><b className='text-red-500'>Subscription </b>&nbsp;&nbsp;
                    <b>Plan : </b><i>{user.subscriptions.plan}</i> &nbsp;&nbsp; <b>Status : </b><i>{user.subscriptions.status}</i> 
                    <br /> <b>Start Date : </b><i>{user.subscriptions.startDate}</i>
                </p>
                <p className='text-base'><b className='text-red-500'>Profile CreatedAt : </b><i>{user.createdAt}</i></p>
                <div class="justify-end card-actions">
                </div>
            </div>
        </div>
        </FadeContent>
        </div>
    )
}