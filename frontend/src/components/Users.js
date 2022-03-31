import React, {useState} from 'react'

export const Users = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        console.log(e);
        e.preventDefault();
        
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
