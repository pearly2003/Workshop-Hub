// SessionExpiredModal.jsx
import { useEffect } from "react";

export default function SessionExpiredModal({ isExpired }) {
    const handleLogout = () => {
        // Clear all auth data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.clear();

        // Redirect to login
        window.location.href = "/login"; // or use router: navigate("/login")
    };

    // Lock scroll when modal is open
    useEffect(() => {
        if (isExpired) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isExpired]);

    if (!isExpired) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg p-8 max-w-sm w-full mx-4 text-center">
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-5">
                    <svg
                        className="w-7 h-7 text-red-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M12 7v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="12" cy="16" r="0.75" fill="currentColor" />
                    </svg>
                </div>

                {/* Text */}
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Session expired
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                    Your session has expired due to inactivity. Please log in again to continue.
                </p>

                {/* Button */}
                <button
                    onClick={handleLogout}
                    className="w-full py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
                >
                    Log in again
                </button>

                <p className="text-xs text-gray-400 mt-4">You have been securely logged out</p>
            </div>
        </div>
    );
}