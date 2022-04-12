import React, {useState, useEffect} from 'react'
const BACKEND = process.env.REACT_APP_BACKEND;

export const Users = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const[users, setUsers] = useState([])
    const[edit, setEdit] = useState(false)
    const[id, setId] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        /*Investigate fetch
            Modulo/API adentro de React
            Recibe la direccion de donde queremos enviarlo, que queremos enviar y a traves de que metodo
            Para decir que es un metodo asincrono usar await/async
            await nos va dar una respuesta
        */
        if(!edit){
            const res = await fetch(`${BACKEND}/users`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            await res.json();
        }else{
           const res = await fetch(`${BACKEND}/users/${id}`, {
               method: 'PUT',
               headers:{
                   'Content-Type': 'application/json' 
               },
               body: JSON.stringify({
                   name,
                   email, 
                   password
               })
           });
           const data = await res.json();
           console.log(data)
           setEdit(false);
           setId("");
        }

        await getUsers();

        setName('');
        setEmail('');
        setPassword('');
        

    }

    const getUsers = async () =>{
        const res = await fetch(`${BACKEND}/users`)
        const data = await res.json();
        setUsers(data)
    }

    useEffect(() => {
        getUsers();
    }, [])

    const editUser = async (id) => {
        const res = await fetch(`${BACKEND}/users/${id}`)
        const data = await res.json();
        setEdit(true);
        setId(id);
        setName(data.name)
        setEmail(data.email)
        setPassword(data.password)

    }

    const deleteUser = async (id) => {
        const confirm = window.confirm('Seguro de eliminarlo?')
        if(confirm){
            const res = await fetch(`${BACKEND}/users/${id}`, {
                method: 'DELETE'
            });
            await res.json();
            await getUsers();
        }
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
                        {edit ? 'Edit' : 'Create'}
                    </button>
                </form>
            </div>
            <div className="col-md-6">
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user=>(
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>
                                        <button 
                                            className='btn btn-secondary btn-sm btn-block'
                                            onClick={(e)=> editUser(user._id)}
                                            >
                                            Edit
                                        </button>
                                        <button 
                                            className='btn btn-danger btn-sm btn-block'
                                            onClick={(e) => deleteUser(user._id)}
                                            >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
