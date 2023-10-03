import profileImage from '../../assets/profileimage.jpg';
const ProfileImage = () => {
  return (
    <>
      <img
        src={profileImage}
        alt='Profile'
        className='w-32 h-32 rounded-full border-4 border-blue-500'
      />
    </>
  );
};

export default ProfileImage;
