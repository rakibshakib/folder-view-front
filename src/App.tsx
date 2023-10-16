import { useState } from "react";
import "./App.css";
import { FolderDataSet, toggleFolder } from "./components/helper";
import FolderNode from "./components/FolderNode";

export interface TreeNode {
  name: string;
  isOpen: boolean;
  id: number;
  child: TreeNode[] | [];
}

function App() {
  const [folderData, setFolderData] = useState<TreeNode>({ ...FolderDataSet });

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
      <div>
        <div className="container">
          <FolderNode
            folderData={folderData}
            folderOpenIconHandler={folderOpenIconHandler}
            folderCreateCloseHandler={folderCreateCloseHandler}
          />
        </div>
      </div>
    </>
  );
}

export default App;
