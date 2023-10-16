import React, { useState } from "react";
import "./AccordionFolder.css"; // Import your CSS file

const AccordionFolder = () => {
  const [folders, setFolders] = useState([
    { name: "Folder 1", open: false, files: ["File 1", "File 2", "File 3"] },
    { name: "Folder 2", open: false, files: ["File 4", "File 5"] },
    { name: "Folder 3", open: false, files: ["File 6", "File 7", "File 8"] },
  ]);

  const toggleFolder = (index: number) => {
    const newFolders = [...folders];
    newFolders[index].open = !newFolders[index].open;
    setFolders(newFolders);
  };

  return (
    <div>
      {folders.map((folder, index) => (
        <div key={index} className={`folder ${folder.open ? "open" : ""}`}>
          <div onClick={() => toggleFolder(index)}>{folder.name}</div>
          {folder.open && (
            <div className="folder-content">
              {folder.files.map((file, fileIndex) => (
                <p key={fileIndex}>{file}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccordionFolder;
