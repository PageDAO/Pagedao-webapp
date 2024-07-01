// AuthorGallery.jsx
import React from "react";
import { useState } from "react";
function AuthorGallery({author, iscurrentuser }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      {/*books.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          {Add more book details here}
        /*</div>
      ))*/}
      <div key={"" /*book.id*/}>
        {/* <h3>book.titlebook.title</h3>
          Add more book details here */}

        <div></div>
        <div className="container">
          <div className="bloc-tabs">
            <div className="flex items-center mt-10">
              <button className={`text-neutral-800 text-large font-Arvo leading-normal ${activeTab === 0 ? "tabs active-tabs" : "tabs"}`} onClick={() => setActiveTab(0)}>Creation (3)</button>
              <button className={`ml-20 text-neutral-800 text-large font-Arvo leading-normal ${activeTab === 1 ? "tabs active-tabs" : "tabs"}`} onClick={() => setActiveTab(1)}>Collected (5)</button>
            </div>
          </div>
          <div className="content-tabs">
            <div className="tabcontent" style={{ display: activeTab === 0 ? 'block' : 'none' }}>
              <div className="flex justify-between container mx-auto ml-0 mx-30 mt-10">
                author.<div className="p-5">
                  <img
                    width={300}
                    height={500}
                    src="http://avc.com/wp-content/uploads/2017/12/un-super-vised.jpeg"
                  />
                  <p className="font-normal font-['DM Sans'] leading-tight mt-10">
                    name 1
                  </p>
                </div>
                <div className="p-5">
                  <img
                    width={300}
                    height={400}
                    src="http://avc.com/wp-content/uploads/2017/12/un-super-vised.jpeg"
                  />
                  <p className="font-normal font-['DM Sans'] leading-tight mt-10">
                    name 2
                  </p>
                </div>
                <div className="p-5">
                  <img
                    width={300}
                    height={400}
                    src="http://avc.com/wp-content/uploads/2017/12/un-super-vised.jpeg"
                  />
                  <p className="font-normal font-['DM Sans'] leading-tight mt-10">
                    name 3
                  </p>
                </div>
              </div>
            </div>
            <div className="tabcontent" style={{ display: activeTab === 1 ? 'block' : 'none' }}>
              <div className="flex justify-between container mx-auto ml-0 mx-30 mt-10">
                <div className="p-5">
                  <img
                    width={300}
                    height={500}
                    src="http://avc.com/wp-content/uploads/2017/12/un-super-vised.jpeg"
                  />
                  <p className="font-normal font-['DM Sans'] leading-tight mt-10">
                    collected 1
                  </p>
                </div>
                <div className="p-5">
                  <img
                    width={300}
                    height={400}
                    src="http://avc.com/wp-content/uploads/2017/12/un-super-vised.jpeg"
                  />
                  <p className="font-normal font-['DM Sans'] leading-tight mt-10">
                    collected 2
                  </p>
                </div>
                <div className="p-5">
                  <img
                    width={300}
                    height={400}
                    src="http://avc.com/wp-content/uploads/2017/12/un-super-vised.jpeg"
                  />
                  <p className="font-normal font-['DM Sans'] leading-tight mt-10">
                    collected 3
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorGallery;
