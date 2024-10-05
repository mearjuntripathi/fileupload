import { useFirebase } from '../context/Firebase';

const Upload = () => {
    const { putData, uploadFile } = useFirebase();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value; 
        const file = e.target.file.files[0]; 

        // Validate file type
        if (file && file.type !== 'application/pdf') {
            alert("Please upload a PDF file.");
            return;
        }

        try {
            // Wait for the file to be uploaded and get the URL
            let url = await uploadFile(file); 

            // Store the file URL in the database with the user's name and the upload time
            putData(`users/${name}`, { resume: url, uploadTime: new Date().toISOString() });

            alert("File uploaded successfully!");
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file. Please try again.");
        }
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