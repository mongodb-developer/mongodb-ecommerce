import { XIcon } from "@heroicons/react/outline";

const Banner = ({ setShowBanner }) => {
  return (
    <div className="relative flex justify-center items-center w-screen bg-green-800 py-4 text-lg text-white">
      <a
        href="https://www.mongodb.com/atlas"
        target="_blank"
        className="font-bold"
      >
        Interested in building out an app like this? Check out MongoDB Atlas!
      </a>
      <button
        className="absolute right-10"
        onClick={() => setShowBanner(false)}
      >
        <XIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Banner;
