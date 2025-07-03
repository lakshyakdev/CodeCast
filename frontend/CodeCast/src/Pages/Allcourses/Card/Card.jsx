import { Link } from "react-router-dom";
import "./Card.css"
export default function Card({thumbnail , des, title ,courseid}){
    let id = `/course/${courseid}`;
return(
    <div className="card bg-base-100 shadow-sm">
    <figure>
    <img
      src={thumbnail}
      alt="thumbnail"
      className=" h-48 object-cover pt-4 rounded-lg"
    />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p className="text-sm">{des}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary btn-sm"><Link to={id}>See Details</Link></button>
    </div>
  </div>
</div>

    )
}