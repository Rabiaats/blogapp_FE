import { Link } from "react-router-dom";
import notFound from "../assets/notFound.png"

const NotFound = () => {
  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8 flex-col">
            <img src={notFound} alt="404 error" className="w-[700px] mt-10"/>
        <div className="max-w-xl mx-auto space-y-5 text-center">
          <p className="text-green-500">
            Sorry, the page you are looking for could not be found or has been
            removed.
          </p>
          <Link
            to="/"
            className="text-emerald-700 duration-150 hover:text-emerald-900 font-medium inline-flex items-center gap-x-1"
          >
            Go back
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
