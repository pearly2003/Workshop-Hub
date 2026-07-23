import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, ShieldCheck, IdCard, Lock, ArrowRight } from "lucide-react";
import { LoginAPI } from "../service/Api";
import { MdEncryptPassword } from "../../utils/EncryptDecrypt";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdminIsAuthenticated } from "../redux/slices/authSlice";
import bgImage from "../assets/images/download.jpg";
import dummyUser from "../data/dummyUser.json";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const passwordInputRef = useRef(null);

  const bypassLogin = import.meta.env.VITE_BYPASS_LOGIN === "true";

  useEffect(() => {
    if (bypassLogin) {
      setUsername(dummyUser.userName);
      setPassword(dummyUser.password);
    }
  }, [bypassLogin]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);

    if (bypassLogin) {
      setTimeout(() => {
        dispatch(setAdminIsAuthenticated(dummyUser.data));
        navigate("/DashBoard");
        setLoading(false);
      }, 500);
      return;
    }

    const encrypt = MdEncryptPassword(password);
    try {
      const response = await LoginAPI({
        userName: username,
        password: encrypt,
      });
      if (response.status !== 200) {
        setError("Login failed. Please check your credentials.");
      } else {
        dispatch(setAdminIsAuthenticated(response.data));
        navigate("/DashBoard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden font-sans">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Workshop Background"
          className="w-full h-full object-cover filter brightness-[0.4]"
        />
        {/* Added a blue-ish dark tint to match the image's atmosphere */}
        <div className="absolute inset-0 bg-[#0f172a]/60 mix-blend-multiply" />
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-[420px] bg-white rounded-xl shadow-2xl p-8 mx-4">

        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[#0a58ca] rounded-xl flex items-center justify-center mb-4 shadow-md">
            <ShieldCheck size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#0a58ca] tracking-tight">
            Workshop Hub
          </h1>
          <p className="text-[10px] font-bold text-gray-500 tracking-[0.2em] mt-1">
            EXECUTIVE MANAGEMENT PORTAL
          </p>
        </div>

        {/* Form Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Sign In</h2>
          <p className="text-sm text-gray-500">
            Authenticated access for administrative nodes.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* User Name Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              User Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IdCard size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    passwordInputRef.current?.focus();
                  }
                }}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a58ca]/20 focus:border-[#0a58ca] transition-all bg-gray-50/50"
                placeholder="e.g. exec.manager@workshop.hub"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-700">
                Password
              </label>
              <button
                type="button"
                className="text-xs font-semibold text-[#0a58ca] hover:text-blue-800 transition-colors"
              >
                Forgot access?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                ref={passwordInputRef}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a58ca]/20 focus:border-[#0a58ca] transition-all bg-gray-50/50"
                placeholder="••••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-500 px-4 py-2.5 rounded-lg text-xs font-medium text-center border border-red-100">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#0a58ca] hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Authorizing..." : "Authorize Access"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>
      </div>

      {/* Footer Elements */}
      <div className="absolute bottom-6 left-0 right-0 px-8 flex justify-between items-center z-10 w-full text-[11px] text-gray-400 font-medium">
        <div>
          © 2026 Workshop Hub • v2.2.0
        </div>
        <div className="flex gap-6">
          <button className="hover:text-white transition-colors">Support Desk</button>
          <button className="hover:text-white transition-colors">Privacy Policy</button>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10 text-[10px] text-gray-500 font-bold tracking-wider">
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={12} />
          AES-256 ENCRYPTED
        </div>
        <div className="w-px h-3 bg-gray-600" />
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={12} />
          MFA PROTECTED
        </div>
      </div>
    </div>
  );
}

