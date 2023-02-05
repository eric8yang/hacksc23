import { React, useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { getStorage, ref, listAll } from 'firebase/storage';
import fileImg from './file.png'
import './saved-files.css';

const SavedFiles = () => {
    const [files, setFiles] = useState([]);

    const auth = getAuth();
    const user = auth.currentUser;

    const ListFiles = () => {
        if (user) {
            const storage = getStorage();
            const storageRef = ref(storage, String(user.uid) + '/summarizedTexts/');

            // Get a list of all items (files and directories) in the directory
            listAll(storageRef).then(function (res) {
                const files = res.items.map(function (itemRef) {
                    console.log(itemRef.fullPath);
                    return itemRef.name;
                });
                setFiles(files);
            }).catch(function (error) {
                console.error("Error listing items in directory:", error);
            });
        }
    };

    useEffect(() => ListFiles(), [user])

    return (
        <div className="file-grid">
            {files.map((file, index) => (
                <div onClick={() => window.location.href = user.uid + '/summarizedTexts/' + file}
                    key={index}
                    className="file-tile">
                    <img src={fileImg} />
                    <p>{file}</p>
                </div>
            ))}
        </div>
    );
};

export { SavedFiles };