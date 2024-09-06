import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card } from "flowbite-react";

const ItemGallery = () => {
  const [items, setItems] = useState();

  useMemo(() => {
    console.log("fetching authors");
    fetch(import.meta.env.VITE_APP_BACKEND_API_URL + "/logitems").then(
      (response) => {
        response.json().then((data) => {
          console.log(data);
          setItems(data);
        });
      }
    );
  }, []);

  return (
    <div className="flex flex-row">
      {items &&
        items.map((item) => (
          <Link
            to={`/book/${item.userid}/${item.projectid}/${item.id}`}
            key={`${item.userid}-${item.projectid}-${item.id}`}
          >
            <Card
              className="flex-basis-20 h-full mr-4"
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc={item.image}
            >
              <span className="text-sm tracking-tight text-gray-900 dark:text-white">
                {item.name}
              </span>
            </Card>
          </Link>
        ))}
    </div>
  );
};

export default ItemGallery;
