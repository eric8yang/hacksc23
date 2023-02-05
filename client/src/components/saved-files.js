import { React, useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import fileImg from './file.png'
import './saved-files.css';
import { storage } from '../server/server';

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
                <div onClick={() => {
                    const storage = getStorage();
                    console.log(file);
                    const fileRef = ref(storage, String(user.uid) + "/summarizedTexts/" + file);
                    getDownloadURL(fileRef)
                        .then((url) => {
                            const xhr = new XMLHttpRequest();
                            xhr.responseType = 'blob';
                            xhr.onload = (event) => {
                              const blob = xhr.response;
                              const a = document.createElement('a');
                                a.style.display = 'none';
                                a.href = URL.createObjectURL(blob);
                                a.download = file;
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                            };
                            xhr.open('GET', url);
                            xhr.send();
                        })


                        .catch(error => {
                            console.error(error);
                        });
                }} key={index} className="file-tile">
                    <img src={fileImg} />
                    <p>{file}</p>
                </div>
            ))}
        </div>
    );
};

export { SavedFiles };