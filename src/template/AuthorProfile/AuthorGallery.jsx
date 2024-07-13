import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function AuthorGallery({ author, iscurrentuser }) {
  const [activeTab, setActiveTab] = useState(0);
  console.log(author);
  return (
    <div>
      {author.metadata.tasks.map((task) => (
        <div
          key={task.id}
          className="block w-full p-6 bg-neutral-50 mb-20 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {task.title}
            </h5>
            <p className="mb-10 font-normal text-gray-700 dark:text-gray-400">
              {task.description}
            </p>
          </a>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" key={task.id}>
            {task.items.map((item) => (
              <div
                key={item.id}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#">
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
                </a>
                <div className="px-5 pb-5">
                  <Link to={"/book/"+author.userId+"/"+task.id+"/"+item.id}>
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
                    <Link to={"/book/"+author.userId+"/"+task.id+"/"+item.id}
                      className="text-white bg-dao-primary hover:bg-dao-primary:50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AuthorGallery;
