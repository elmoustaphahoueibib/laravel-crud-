import { useState,useEffect } from "react";
import http from "../http"
import { Link } from "react-router-dom";
export default function Home() {
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        fetchAllUsers();
    },[]);

    const fetchAllUsers = () => {
        http.get('/users').then(res=>{
            setUsers(res.data);
        })
    }


    const deleteUser = (id) => {
        http.delete('/users/'+id).then(res=>{
            fetchAllUsers();
        })
    }



    return (
        <div className="container-fluid py-4">
            <div className="row">
                <table className="table align-items-center mb-0">
                    <thead>
                    <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Sno.</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Nom</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Phone</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user,index)=>(
                        <tr key={user.id}>
                            <td>
                                <div className="d-flex px-2 py-1">
                                    <td>{++index}</td>
                                    <td>{user.name}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <Link className="btn btn-info" to={{ pathname: "/edit/" + user.id }}>Modifier</Link>&nbsp;
                                    </td>
                                    <td>
                                        <Link className="btn btn-primary" to={{ pathname: "/view/" + user.id }}>Voir</Link>&nbsp;

                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-danger"
                                                onClick={()=>{deleteUser(user.id)}}
                                        >Supprimer
                                        </button>
                                    </td>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}