import TopNav from "../TopNav";
import { useEffect, useState } from "react";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

function Profile() {

    const {
        user,
        handleLogOut,
        setShowAuthFlow,
        showAuthFlow,
        primaryWallet
      } = useDynamicContext();
      

    return (
        <>
            <div className="text-black bg-white w-full">
                <div className="flex-col">
                    <div>
                        <TopNav/>
                    </div>
                    <div>
                        {primaryWallet && primaryWallet.address}
                    </div>
                    <div className="">
                    </div>
                </div>
            </div>
            <div>
            <table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Avatar</td>

          <td>
            {user?.ens?.avatar && (
              <img
                src={user.ens.avatar}
                style={{ width: '2rem', height: '2rem' }}
              />
            )}
          </td>
        </tr>

        <tr>
          <td>Email</td>
          <td>{user?.email}</td>
        </tr>

        <tr>
          <td>First name</td>
          <td>{user?.firstName}</td>
        </tr>

        <tr>
          <td>Last name</td>
          <td>{user?.lastName}</td>
        </tr>

        <tr>
          <td>Alias</td>
          <td>{user?.alias}</td>
        </tr>

        <tr>
          <td>Job title</td>
          <td>{user?.jobTitle}</td>
        </tr>

        <tr>
          <td>Country</td>
          <td>{user?.country}</td>
        </tr>
      </tbody>
    </table>
            </div>
        </>
    );
}

export default Profile;