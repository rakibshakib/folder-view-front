import { useState } from "react";
import "./App.css";
import { FolderDataSet, toggleFolder } from "./components/helper";
import FolderNode from "./components/FolderNode";
import ViewModal from "./components/Modal";

export interface TreeNode {
  name: string;
  isOpen: boolean;
  id: number;
  child: TreeNode[] | [];
}

function App() {
  const [folderData, setFolderData] = useState<TreeNode>({ ...FolderDataSet });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const folderOpenIconHandler = (FolderNode: TreeNode): void => {
    toggleFolder(FolderNode?.id, folderData, setFolderData);
  };
  const folderCreateCloseHandler = (
    FolderNode: TreeNode,
    type: string
  ): void => {
    console.log(type);
    // toggleFolder(FolderNode?.id, folderData, setFolderData);
  };
  return (
    <>
      <div className="main">
        <div className="container">
          <FolderNode
            folderData={folderData}
            folderOpenIconHandler={folderOpenIconHandler}
            folderCreateCloseHandler={folderCreateCloseHandler}
          />
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>Open Modal</button>

        <div className="modal">
          {isOpen && (
            <ViewModal
              OnOk={() => console.log("ok")}
              onCancel={() =>{
                setIsOpen(!isOpen)
              }}
              onclose={() => setIsOpen(!isOpen)}
              okText="Yes"
              cancelText="No"
              isOpen={isOpen}
            >
              <h1>Modal</h1>
            </ViewModal>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
