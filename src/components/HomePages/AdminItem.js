import React from "react";
import { Link } from "gatsby";

/* Reference 4 - taken from https://github.com/briancodex/react-website-v1/blob/master/src/components/CardItem.js*/

function AdminItem(props) {
  return (
    <>
      <li className="btns_item">
        <Link className="btns_link" to={props.path}>
          <figure className="btns_pic-wrap" data-category={props.label}>
            <img
              className="btns_img"
              alt="Admin Options Graphic"
              src={props.src}
            />
          </figure>
          <div className="btns_info">
            <h5 className="btns_text">{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default AdminItem;

/* End of Reference 4 */
