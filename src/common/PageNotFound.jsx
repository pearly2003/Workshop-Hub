import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CarLoader from "../assets/loader/404Animation.webm";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-2);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background-tertiary)] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Video side */}
          <div className="flex flex-col items-center justify-center gap-5 p-10 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100">
            <div className="relative animate-[float_3s_ease-in-out_infinite]">
              <div className="w-28 h-28 rounded-full border-2 border-blue-200 p-1.5 bg-white">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full rounded-full object-cover"
                >
                  <source src={CarLoader} type="video/webm" />
                </video>
              </div>
              {/* Error badge */}
              <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-red-50 border-2 border-white flex items-center justify-center">
                <span className="text-red-500 text-xs font-medium">✕</span>
              </div>
            </div>

            {/* <p className="text-6xl font-medium text-blue-500 tracking-tighter leading-none">
              404
            </p> */}

            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.15s]" />
              <span className="w-2 h-2 rounded-full bg-blue-300 animate-bounce [animation-delay:0.3s]" />
            </div>
          </div>

          {/* Content side */}
          <div className="flex flex-col justify-center gap-5 p-10">
            <div>
              <p className="text-[11px] font-medium tracking-widest text-gray-400 uppercase mb-2">
                Error 404
              </p>
              <h2 className="text-2xl font-medium text-gray-800 leading-snug mb-2">
                Page not found
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                The page you're looking for has been moved, deleted, or doesn't
                exist.
              </p>
            </div>

            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-5 py-3 w-fit
                bg-white border-[1.5px] border-gray-200 rounded-full
                text-sm font-medium text-gray-700
                hover:bg-gray-50 hover:border-gray-300 hover:-translate-x-0.5
                active:scale-95 transition-all duration-150"
            >
              <ChevronLeft className="w-4 h-4" />
              Go back
            </button>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Need help?{" "}
                <span className="text-black hover:text-blue-700 font-medium cursor-pointer">
                  Contact support
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
