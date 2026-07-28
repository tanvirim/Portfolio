import { useNavigate } from "react-router-dom";
import ProjectCards from "../components/project//ProjectCards";

const ProjectPage = () => {
  const navigate = useNavigate();
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 max-w-screen-2xl mx-auto overflow-x-hidden py-10">
      <div className="text-center">
        <p className="text-3xl font-bold mb-8">
          This Page is Under Construction
        </p>
        <ProjectCards />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ProjectPage;
