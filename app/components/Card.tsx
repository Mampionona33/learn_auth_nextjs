import Link from "next/link";
import React from "react"; //

interface ICard {
  title: string;
  link: string;
  body: string;
  icon?: string; //material icon, comme :
}

const Card: React.FC<ICard> = (props) => {
  return (
    <div className="shadow d-flex p-3 rounded w-max">
      <Link href={props.link} className="text-decoration-none text-dark">
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{props.title}</h5>
            <span className="material-icons-outlined">{props.icon}</span>
          </div>
          <hr />
          <p className="d-flex card-text">{props.body}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
