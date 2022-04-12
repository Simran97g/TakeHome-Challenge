import React from "react";

const Brewery = ({ name, brewery_type, street, phone, website_url }) => {
    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
      }

  return (
    <div className="brewery">
      <div className="item">
        <p>Name - {name}</p>
        <p>Brewery Type - {brewery_type}</p>
      </div>
      <div className="item">
        {street ? <p>Street - {street}</p> : null}
        <p>Phone - {formatPhoneNumber(phone)}</p>
      </div>

      {website_url ? <p>Website Url - {website_url}</p> : null}
    </div>
  );
};

export default Brewery;
