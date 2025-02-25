import { IoIosArrowDown } from "react-icons/io";
import { useLoaderData } from "react-router-dom";

const AdminProductDetailsCard = () => {

    const product = useLoaderData()
    // console.log(product)

  return (
    <div className="w-full">
      <div className="text-xl font-medium p-3 grid gap-8 lg:grid-cols-2  ">
      
        <img
          className="w-full object-cover"
          src={product?.image1}
          alt={product?.title}
        />
      
        <div>
          <h2 className="my-3">HoneyNuts/হানিনাট (৮০০গ্রাম)</h2>
          <p className="mb-3">
            <span className="mr-2">Regular Price:</span>Tk {product?.regularPrice}
          </p>
          <p className="mb-3">
          <span className="mr-2">Offer Price:</span>Tk {product?.offerPricerice}
          </p>
          {/* collapse description */}
          <div className="collapse ">
            <input type="checkbox" />
            <div className="collapse-title flex items-center justify-between text-lg font-normal px-0 border-b-[1px] border-primaryColor rounded-none ml-0">
              Description <IoIosArrowDown />
            </div>
            <div className="collapse-content mt-6">
              <p>{product?.description} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetailsCard;
