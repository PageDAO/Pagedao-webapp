import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProjectItems from "./ProjectItems";

function AuthorGallery({ author, iscurrentuser }) {
  const [activeTab, setActiveTab] = useState(0);
  console.log(author);
  return (
    <div>
      {author.metadata.tasks && author.metadata.tasks.map((task) => (
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
          <ProjectItems author={author} project={task} key={task.id} />
        </div>
      ))}
    </div>
  );
}

export default AuthorGallery;
