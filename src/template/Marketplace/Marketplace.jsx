import TopNav from "../Layout/TopNav.jsx";
import Header from "../Layout/Header.jsx";
import Footer from "../Layout/Footer.jsx";
import {
  useCollections,
  useReservoirClient,
  BuyModal,
} from "@reservoir0x/reservoir-kit-ui";

function Marketplace() {
  const client = useReservoirClient();
  console.log("client", client?.apibase);
  const { data: collection } = useCollections({
    id: "0x931204fb8cea7f7068995dce924f0d76d571df99",
  });
  console.log("collection", collection);
  return (
    <>
      <div className="text-black bg-white w-full">
        <div className="flex-col">
          <div>
            <TopNav />
          </div>
          <div className="">
            {collection.map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}
            <BuyModal
                trigger={<button>Buy Token</button>}
                chainId={137}
               walletClient={client} 
              token="0x931204fb8cea7f7068995dce924f0d76d571df99:1"
              onPurchaseComplete={(data) => console.log("Purchase Complete")}
              onPurchaseError={(error, data) =>
                console.log("Transaction Error", error, data)
              }
              onClose={(data, stepData, currentStep) =>
                console.log("Modal Closed")
              }
            />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Marketplace;
