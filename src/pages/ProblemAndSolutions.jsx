import usePrbAndSolPosts from "../hooks/usePrbAndSolPosts";
import parse from "html-react-parser";
import htmlTruncate from "html-truncate";
import { Link } from "react-router-dom";
const ProblemAndSolutions = () => {
  const [posts] = usePrbAndSolPosts();
//   console.log(posts);
  return (
    <div className="container mx-auto p-2">
      <h2 className="text-2xl font-bold text-center my-10 ">
      সমস্যা ও সমাধান
      </h2>
      <div className="gap-4 grid grid-cols-1 lg:grid-cols-3 ">
        {posts?.map((post) => (
          <div key={post?._id} className="shadow-xl">
            <Link to={`/problem-and-solution-details/${post?._id}`}>
              <div className="card-body">
                <h2 className="card-title">{post?.title}</h2>
                <div>
                  {parse(
                    htmlTruncate(post?.postContent || "", 150, {
                      ellipsis: "...",
                    })
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemAndSolutions;
