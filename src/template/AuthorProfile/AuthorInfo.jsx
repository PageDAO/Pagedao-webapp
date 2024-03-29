// AuthorInfo.jsx
import React from 'react';

import PropTypes from 'prop-types';

function AuthorInfo({ author, iscurrentuser }) {
    AuthorInfo.propTypes = {
        author: PropTypes.object.isRequired,
        iscurrentuser: PropTypes.bool.isRequired,
    };
    return (
        <div>
            <h2>{author.name}</h2>
            <p>{author.bio}</p>
            {/* Add AuthorAvatar, AuthorAddresses, AuthorWebpage, and AuthorSocial here */}
        </div>
    );
}

export default AuthorInfo;