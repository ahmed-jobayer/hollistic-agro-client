import { HashLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className="min-h-screen w-full flex justify-center items-center">
      <HashLoader
        color={"#e11a2b"}
        loading={true}
        cssOverride={""}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> 
    </div>
    );
};

export default Loader;