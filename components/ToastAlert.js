import toast from "react-hot-toast";

export const CustomToast = (message, isInfo = false) =>
  toast.custom(
    (t) => (
      <div
        className={`flex flex-row items-center justify-between w-96 bg-gray-900 px-4 py-6 font-comforta text-white shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 rounded-xl relative transition-all duration-500 ease-in-out ${
          t.visible ? "top-0" : "-top-96"
        }}`}
      >
        <div className="text-xl">
          {isInfo ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div
          className={`flex flex-col items-start justify-center ml-4 cursor-default`}
        >
          <h1
            className={`text-base text-gray-200 font-semibold leading-none tracking-wider`}
          >
            {message.title}
          </h1>
          <p
            className={`text-sm text-gray-400 mt-2 leading-relaxed tracking-wider`}
          >
            {message?.info}
          </p>
        </div>
        <div
          className={`absolute top-2 right-2 cursor-pointer text-lg font-comforta`}
          onClick={() => toast.dismiss(t.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    ),
    { id: "unique-notification", position: "top-center" }
  );
