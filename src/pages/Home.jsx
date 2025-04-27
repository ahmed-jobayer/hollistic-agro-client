import { Helmet } from "react-helmet-async";
import AllProducts from "../components/AllProducts";
import Banner from "../components/Banner";
import Collection from "../components/Collection";

const Home = () => {


  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Home - Holistic Agro</title>
      </Helmet>
      <Banner />
      <AllProducts />
      <Collection />
    </div>
  );
};

export default Home;
