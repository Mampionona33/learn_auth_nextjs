import Link from 'next/link'

const Card =()=>{

    return(
        <div className="shadow containe-fluid  p-3 rounded w-min">
            <Link className='text-decoration-none' href={"/users"}>
            <div className="card-body d-flex flex-col">
                <h5 className="card-title">Users</h5>
                <p className="card-text">Nombre:50</p>
            </div>
            </Link>
        </div>
    )
}

export default Card;
