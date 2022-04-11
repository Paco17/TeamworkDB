import res from 'express/lib/response';
import React, {useState} from 'react'
const BACKEND = process.env.REACT_APP_API;

export const Users = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        /*Investigate fetch
            Modulo/API adentro de React
            Recibe la direccion de donde queremos enviarlo, que queremos enviar y a traves de que metodo
            Para decir que es un metodo asincrono usar await/async
            await nos va dar una respuesta
        */
        const req = await fetch(`${BACKEND}/users`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });
        
        const data = await res.json(); 
        console.log(data);

    }

    return(
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group p-2">
                        <input 
                            type="text" 
                            onChange={e=> setName(e.target.value)} 
                            value={name} 
                            className="form-control"
                            placeholder="Name" 
                            autoFocus
                        />
                    </div>
                    <div className="form-group p-2">
                        <input type="email" 
                            onChange={ e=> setEmail(e.target.value)} 
                            value={email} 
                            className="form-control"
                            placeholder="Email" 
                       />
                    </div>
                    <div className="form-group p-2">
                        <input type="text" 
                        onChange={e=> setPassword(e.target.value)} 
                        value={password} 
                        className="form-control"
                        placeholder="Password" 
                        />
                    </div>
                    <button className='btn btn-primary btn-block m-3'>
                        Create
                    </button>
                </form>
            </div>
            <div className="col-md-8">

            </div>
        </div>
    )
}
