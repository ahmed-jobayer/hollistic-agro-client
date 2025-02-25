import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { BASE_URL } from "../../config";
import Swal from "sweetalert2";

const Applications = () => {
  const axiosPublic = useAxiosPublic();

  const [pdfs, setPdfs] = useState(null);
//   console.log(pdfs);
  useEffect(() => {

    getPdf();
  }, []);

  const getPdf = async () => {
    try {
      const result = await axiosPublic.get("/get-files");

      setPdfs(result.data.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  const showPdf = (pdf) => {
    window.open(`${BASE_URL}/files/${pdf.pdf}`, "_blank", "noreferrer");
    // console.log(pdf);
  };

  const handleDeletePdf = async (id) => {
    try {
      const confirmDelete = await Swal.fire({
        title: "Are you sure you want to delete this application?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });

      if (!confirmDelete.isConfirmed) return;

      const result = await axiosPublic.delete(`/delete-file/${id}`);
      if (result.data.message) {
        // Remove the deleted PDF from state
        setPdfs(prev => prev.filter(pdf => pdf._id !== id));
        Swal.fire({
            title: "Success",
            text: "Your file has been deleted.",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          }
        );
      }
    } catch (error) {
      console.error("Error deleting PDF:", error);
      Swal.fire(
        "Error!",
        "Failed to delete document",
        "error"
      );
    }
  };

  return (
    <div className="container mx-auto">
    <h2 className="text-center my-4 text-xl font-bold">Job Applications</h2>
    <div className="grid ">
      {pdfs?.map((pdf, index) => (
        <div key={index} className="flex items-center justify-between p-4 border-b">
          <div>
            <p className="font-semibold">{pdf?.name}</p>
            <p className="text-sm text-gray-600">{pdf?.email}</p>
            <p className="text-sm text-gray-600">{pdf?.phone}</p>
          </div>
          <div className="flex gap-2">
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => showPdf(pdf)}
            >
              View
            </button>
            <button
              className="btn btn-error btn-sm"
              onClick={() => handleDeletePdf(pdf._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Applications;
