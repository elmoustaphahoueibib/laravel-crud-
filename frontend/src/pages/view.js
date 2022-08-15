import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from '../http'


export default function View(props) {
    const [inputs,setInputs] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        fetchUser()
    },[]);

    const fetchUser= () =>{
        http.get('/users/'+id+'/edit').then((res)=>{
            setInputs({
                name:res.data.name,
                phone:res.data.phone,
            });
        });
    }
    return (
        <div>
            <h2>Modifier un utilisateur</h2>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <h4>Nom</h4>
                        <p>{ inputs.name }</p>
                        <h4>Phone</h4>
                        <p>{ inputs.phone }</p>

                    </div>
                </div>
            </div>
        </div>

    )
}