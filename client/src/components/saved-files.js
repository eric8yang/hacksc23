import React from 'react';
import { getAuth } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import fileImg from './file.png'

const SavedFiles = () => {
    const [files, setFiles] = React.useState([]);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [fullFiles, setFullFiles] = React.useState('');

    const auth = getAuth();
    const user = auth.currentUser;
    const DisplayFiles = (itemRef) => {
        console.log(itemRef);
        setFiles(...files => [itemRef, files]);
    }

    const ListFiles = () => {
        if (user) {
            const storage = getStorage();
            const storageRef = ref(storage, String(user.uid) + '/summarizedTexts/');

            // Get a list of all items (files and directories) in the directory
            listAll(storageRef).then(function(res) {
            const files = res.items.map(function(itemRef) {
                console.log(itemRef.fullPath);
                return itemRef.name;
            });
            setFiles(files);
            }).catch(function(error) {
            console.error("Error listing items in directory:", error);
            });
        }
    };

    return (
        <div>
            {user ?  <button className='button' onClick={ListFiles}>Saved Files</button> : null}
          {files.map((file, index) => (
            <div key={index}>
                <img src={fileImg}/>
                <p onClick={() => window.location.href= user.uid + '/summarizedTexts/' + file}>{file}</p>
            </div>
            ))}
        </div>
    );
};

export { SavedFiles };