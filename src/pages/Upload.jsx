import { useFirebase } from '../context/Firebase';

const Upload = () => {
    const { putData, uploadFile } = useFirebase(); // Use uploadFile from context

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value; 
        const file = e.target.file.files[0]; 

        try {
            // Upload the file and get the URL
            const fileUrl = await uploadFile(file);
            putData(`users/${name}`, { resume: fileUrl, uploadTime: new Date().toISOString() });
            alert('Upload successful!');
        } catch (error) {
            console.error("Error uploading file: ", error);
            alert('Upload failed, please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="upload-continer">
            <h1>Hello, give me your introduction</h1>
            <input type="text" name="name" placeholder="Enter Your Name" required />
            <input type="file" name="file" required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Upload;