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
    <div class="flex flex-row">
      {items &&
        items.map((item) => (
          <Link
            to={`/book/${item.userid}/${item.projectid}/${item.id}`}
            key={`${item.userid}-${item.projectid}-${item.id}`}
          >
            <Card
              className="flex-basis-20 "
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc={item.image}
            >
              <h5 className="font-bold tracking-tight text-gray-900 dark:text-white">
                {item.name}
              </h5>
            </Card>
          </Link>
        ))}
    </div>
  );
};

export default ItemGallery;
