import Header from '../components/aboutPage/Header';
import Introduction from '../components/aboutPage/Introduction';
import ProfileImage from '../components/aboutPage/ProfileImage';
import Education from '../components/aboutPage/Education';
import Hobbies from '../components/aboutPage/Hobbies';
import ExtracurricularActivities from '../components/aboutPage/Extracurricular';

const AboutMePage = () => {
  return (
    <div className='mx-auto p-6 max-w-screen-md bg-gray-100'>
      <div className='text-4xl'> This Page is Under Construction </div>
      <div className='border-l-2 p-3 border-r-2 border-dotted border-gray-500 flex justify-center items-center'>
        <div className='text-center'>
          <Header />
          <Introduction />
          <ProfileImage />
          <Education />
          <Hobbies />
          <ExtracurricularActivities />
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;
