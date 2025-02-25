import { Link } from "react-router-dom";
import useCategories from "../hooks/useCategories";

const Collection = () => {

  const [categories] = useCategories();


  return (
    <div className="container mx-auto">
        <h2 className="text-center my-4 text-2xl font-medium ">COLLECTION</h2>
      <ul className="p-3 pb-20 grid gap-3 grid-cols-2 lg:grid-cols-6 ">
        {categories?.map((collection) => (
          <li key={collection?._id} className="border  rounded-xl p-2">
            <Link to={`/products/${collection?.category}`} className=" font-medium text-center ">
              <img
              className="w-full "
                src={collection.categoryImage}
                alt={collection?.category}
              />
              <p className="mt-2">{collection?.category}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Collection;
