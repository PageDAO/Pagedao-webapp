// AuthorInfo.jsx
import { useSocialAccounts, useIsLoggedIn, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { SocialIcon } from "@dynamic-labs/iconic";
import { StarIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const Avatar = ({ avatarUrl }) => {
  return (
    <div className="avatar flex">
      <img src={avatarUrl} alt="avatar" />
    </div>
  );
};

const Icon = ({ provider }) => {
  return (
    <div
      data-tooltip-target={"social-" + provider}
      className="icon-container flex cursor-pointer"
    >
      <SocialIcon name={provider} className="flex max-w-5" />
    </div>
  );
};

const UserProfileSocialAccount = ({ provider, iscurrentuser }) => {
  const {
    linkSocialAccount,
    unlinkSocialAccount,
    isProcessing,
    isLinked,
    getLinkedAccountInformation,
  } = useSocialAccounts();

  const isProviderLinked = isLinked(provider);
  const connectedAccountInfo = getLinkedAccountInformation(provider);
  if (!iscurrentuser) {
    return (
      isProviderLinked && (
        <div className="flex flex-col justify-content">
          <div className="icon">
            <Icon provider={provider} />
          </div>
        </div>
      )
    );
  }

  return (
    <div className="flex flex-col justify-content">
      <div className="icon">
        {isProviderLinked ? (
          <Avatar avatarUrl={connectedAccountInfo?.avatar} />
        ) : (
          <Icon provider={provider} />
        )}
      </div>
      {isProviderLinked ? (
        <button
          onClick={() => unlinkSocialAccount(provider)}
          loading={isProcessing}
        >
          Disconnect
        </button>
      ) : (
        <button
          onClick={() => linkSocialAccount(provider)}
          loading={isProcessing}
        >
          Connect
        </button>
      )}
    </div>
  );
};

const providers = [
  "discord",
  "farcaster",
  // "facebook",
  // "github",
  "google",
  // "instagram",
  // "twitch",
  "twitter",
];

function AuthorInfo({ author, isCurrentUser }) {
  const { isLoggedIn } = useIsLoggedIn();
  const { user } = useDynamicContext();
  return (
    <div>
      <Link className="mb-5 text-medium" to="/marketplace">Back</Link>
      <div className="flex justify-between">
        <div className="flex flex-col mr-4">
          <div className="mb-4">
            <h2 className="text-neutral-800 text-6xl font-bold font-['Arvo']">
              {author.alias}
            </h2>
          </div>
          <div
            className="font-['DM Sans'] leading-tight text-medium"
            style={{
              maxWidth: "500px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {author.jobTitle}
          </div>
          <div className="mt-10 pb-10 flex justify-start items-center">
            <div>
              <StarIcon className="w-10 h-10 text-blue-400" />
            </div>
            <div className="text-medium font-['DM Sans'] leading-tight ml-3 mt-5">
              PageDAO User since{" "}
              {new Date(author.firstVisit).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col mr-20">
          <div className="mb-4 mt-4">
            <div className="flex flex-col items-stretch">
              {providers.map((provider) => (
                <UserProfileSocialAccount
                  key={provider}
                  provider={provider}
                  iscurrentuser={isCurrentUser && isLoggedIn && (user.id == author.id)}
                />
              ))}
            </div>
            {isCurrentUser && isLoggedIn && (user.id == author.id) && (
              <button
                className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-3 mt-12 rounded text-medium"
                style={{ whiteSpace: "nowrap" }}
              >
                Edit profile
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <p>author.bioauthor.bio</p> */}

      {/* Add AuthorAvatar, AuthorAddresses, AuthorWebpage, and AuthorSocial here */}
    </div>
  );
}

export default AuthorInfo;
