import { useFirebase } from '../context/Firebase';

const Upload = () => {
    const { putData } = useFirebase();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value; 
        const file = e.target.file.files[0]; 

        // Validate file type
        if (file && file.type !== 'application/pdf') {
            alert("Please upload a PDF file.");
            return;
        }

        // Assuming you will replace the URL_TO_UPLOADED_FILE with the actual file URL
        putData(`users/${name}`, { resume: 'URL_TO_UPLOADED_FILE', uploadTime: new Date().toISOString() });
    };

    return (
        <form onSubmit={handleSubmit} className="upload-continer">
            <h1>Hello, give me your introduction</h1>
            <input type="text" name="name" placeholder="Enter Your Name" required />
            <input 
                type="file" 
                name="file" 
                accept=".pdf" // Restricts the file input to PDF files
                required 
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Upload;
