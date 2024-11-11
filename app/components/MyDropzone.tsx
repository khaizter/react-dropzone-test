'use client';

import React, { useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

function MyDropzone() {
  const [files, setFiles] = useState<File[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);

  console.log({ files });

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    // Do something with the files
    setFiles((prevState) => [...prevState, ...acceptedFiles]);
    setRejectedFiles((prevState) => [...prevState, ...fileRejections]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDrop, accept: { 'image/*': [] } });

  const removeHandler = (index: number) => {
    setFiles((prevState) => {
      const copyFiles = [...prevState];
      copyFiles.splice(index, 1);
      return copyFiles;
    });
  };

  return (
    <>
      <div
        {...getRootProps({
          className: 'border border-orange-400 p-4',
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here ...</p> : <p>Drag n drop some files here, or click to select files</p>}
      </div>
      <ul>
        {files.map((file, index) => {
          return (
            <li className="p-4 border flex justify-between" key={index}>
              <div>{file.name}</div>
              <button onClick={() => removeHandler(index)}>remove</button>
            </li>
          );
        })}
      </ul>
      <ul>
        {rejectedFiles.map((rejectedFile, index) => {
          return <li className='text-red-500' key={index}>{rejectedFile.file.name}</li>;
        })}
      </ul>
    </>
  );
}

export default MyDropzone;
