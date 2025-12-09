import { useAlert } from "@/context/alert/useAlert";
import { useLoginWithGoogle } from "../../login/hooks/useLoginWithGoogle";
import Spinner from "@/components/ui/spinner";
import { log } from "@/utils/log";
import google from "../../../../assets/google.png";

const GoogleForm = () => {
  const { showAlert } = useAlert();

  const { mutate: loginGoogle, isPending } = useLoginWithGoogle(
    () => {
      showAlert({ variant: "success", message: "Login dengan Google berhasil" });
    },
    (error) => {
      log.error("Login failed:", error);
      showAlert({
        variant: "error",
        message: error.message || "Login dengan Google gagal. Silakan coba lagi.",
      });
    }
  );

  return (
    <button
      onClick={() => (!isPending ? loginGoogle() : null)}
      className="relative flex items-center justify-center w-full py-2 px-4 border-2 border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none cursor-pointer"
    >
      {/* Text */}
      <span
        className={`flex items-center transition-opacity duration-300 ${isPending ? "opacity-0" : "opacity-100"}`}
      >
        <img src={google} alt="Google logo" className="w-5 h-5 mr-3" />
        Sign in with Google
      </span>

      {/* Spinner */}
      {isPending && (
        <span className="absolute flex items-center justify-center">
          <Spinner size="extraSmall" />
        </span>
      )}
    </button>
  );
};

export default GoogleForm;
