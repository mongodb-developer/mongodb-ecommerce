import { createPortal } from "react-dom";

const Portal = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return createPortal(
    <div
      className="fixed w-full h-full top-0 left-0 flex items-center justify-center"
      style={{ zIndex: 101 }}
    >
      {/* Overlay */}
      <div className="absolute w-full h-full bg-gray-900 opacity-50 z-40" />
      {/* Modal */}
      <div className="bg-white container mx-auto rounded shadow-lg z-50 overflow-y-aut0">
        {/* Portal Content */}
        <div className="modal-content py-4 text-left px-6">
          {/* Title */}
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">{title}</p>
            <button onClick={onClose} className="cursor-pointer z-50">
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </button>
          </div>
          {/* Body */}
          {children}
          {/* Footer */}
          {/* <div className="flex justify-end pt-2">
            <button className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2">Action</button>
            <button className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400">Close</button>
          </div> */}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Portal;
