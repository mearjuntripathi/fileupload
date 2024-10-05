import { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';

const Show = () => {
    const { fetchData } = useFirebase();
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchData('users');
            if (data) {
                setDocuments(Object.entries(data)); 
            }
        };
        getData();
    }, [fetchData]);

    return (
        <div className="show-continer">
            <h1>Uploaded Document List</h1>
            <div className="cards">
                {documents.map(([name, { resume, uploadTime }]) => (
                    <div className="card" key={name}>
                        <p className="name">{name}</p>
                        <p>{new Date(uploadTime).toLocaleString()}</p>
                        <button onClick={() => window.open(resume)}>View Resume</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Show;