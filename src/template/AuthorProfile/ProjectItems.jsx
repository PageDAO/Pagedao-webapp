import { Link } from "react-router-dom";

function ProjectItems({ author, project }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {project &&
        project.items
          .filter(
            (item) =>
              item.contracts &&
              item.contracts[0] &&
              item.contracts[0].contractAddress != ""
          )
          .map((item) => (
            <div
              key={item.id}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <Link to={"/book/" + author.id + "/" + project.id + "/" + item.id}>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={
                    item.image.startsWith("https://")
                      ? item.image
                      : import.meta.env.VITE_APP_IPFS_GATEWAY_URL +
                        "/" +
                        item.image
                  }
                  alt="cover image"
                />
              </Link>
              <div className="px-5 pb-5">
                <Link
                  to={
                    "/book/" + author.id + "/" + project.id + "/" + item.id
                  }
                >
                  <h4 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                    {item.name}
                  </h4>
                  <h5 className="text-xs font-semibold tracking-tight text-gray-900 dark:text-white">
                    {item.description.length > 55
                      ? item.description.substring(0, 105) + "..."
                      : item.description}
                  </h5>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${item.contracts && item.contracts[0].price}
                  </span>
                  <Link
                    to={
                      "/book/" +
                      author.id +
                      "/" +
                      project.id +
                      "/" +
                      item.id
                    }
                    className="text-white bg-dao-primary hover:bg-dao-primary:50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}

export default ProjectItems;
