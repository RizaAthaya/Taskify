import Button from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-indigo-100 to-purple-200 flex items-center justify-center px-6">
      <div className="text-center bg-white bg-opacity-90 p-8 sm:p-12 rounded-lg shadow-xl space-y-8 max-w-lg sm:max-w-3xl w-full transform transition-all duration-500 hover:scale-105">
        {/* Illustration */}
        <div className="flex items-center justify-center w-full py-4">
          <img
            src="/src/assets/404.svg"
            className="max-w-xs sm:max-w-md w-full transition-transform duration-500 transform hover:scale-110"
            alt="Ilustrasi 404"
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 animate__animated animate__fadeIn">
          Halaman Tidak Ditemukan
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-600 mb-6">
          Ups! Halaman yang Anda cari tidak ditemukan atau sudah dipindahkan. Periksa kembali URL
          atau kembali ke halaman utama.
        </p>

        {/* Button */}
        <Button
          onClick={() => navigate("/auth/login")}
          className="mt-6 inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg transform transition duration-300 hover:bg-blue-700 hover:scale-105"
        >
          Kembali ke Beranda
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
