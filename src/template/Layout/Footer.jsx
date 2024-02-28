import {Link} from "react-router-dom";
import logo from "../../assets/logo.svg";

function Footer() {
  return (
      <>
          <footer className="w-full pt-14 pb-16 bg-neutral-50 bg-white">
              <div className="container mx-auto flex justify-between">
                  <div className="flex-col justify-start items-start gap-4 inline-flex">
                      <div className=" relative">
                          <Link
                              to={'/'}
                          >
                              <img
                                  alt="Authentication"
                                  loading="lazy"
                                  decoding="async"
                                  data-nimg={1}
                                  className="w-80"
                                  src={logo}
                              />
                          </Link>
                      </div>
                      <div className="text-neutral-800 text-sm font-normal leading-tight">
                          The only
                          NFT marketplace dedicated to books & wisdom.
                      </div>
                  </div>
                  <div className="justify-start items-start gap-8 flex">
                      <div className="flex-col justify-start items-start gap-4 inline-flex">
                          <div
                              className="self-stretch px-4 py-2 rounded-lg justify-start items-center gap-2 inline-flex">
                              <div
                                  className="text-neutral-800 text-lg font-normal leading-relaxed">Marketplace
                              </div>
                          </div>
                          <div
                              className="self-stretch px-4 py-2 rounded-lg justify-start items-center gap-2 inline-flex">
                              <div
                                  className="text-neutral-800 text-lg font-normal leading-relaxed">My
                                  Books
                              </div>
                          </div>
                          <div
                              className="self-stretch px-4 py-2 rounded-lg justify-start items-center gap-2 inline-flex">
                              <div
                                  className="text-neutral-800 text-lg font-normal leading-relaxed">Minting
                              </div>
                          </div>
                      </div>
                      <div className="flex-col justify-start items-start gap-4 inline-flex">
                          <div
                              className="self-stretch px-4 py-2 rounded-lg justify-start items-center gap-2 inline-flex">
                              <div
                                  className="text-neutral-800 text-lg font-normal leading-relaxed">Goverance
                              </div>
                              <div className=" relative"/>
                          </div>
                          <div
                              className="self-stretch px-4 py-2 rounded-lg justify-start items-center gap-2 inline-flex">
                              <div
                                  className="text-neutral-800 text-lg font-normal leading-relaxed">Discord
                              </div>
                              <div className=" relative"/>
                          </div>
                          <div
                              className="self-stretch px-4 py-2 rounded-lg justify-start items-center gap-2 inline-flex">
                              <div
                                  className="text-neutral-800 text-lg font-normal leading-relaxed">Twitter
                              </div>
                              <div className=" relative"/>
                          </div>
                      </div>
                  </div>
              </div>
          </footer>
      </>
  );
}

export default Footer;