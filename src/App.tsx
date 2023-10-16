import { useState } from "react";
import "./App.css";
import { FcFolder, FcOpenedFolder, FcPlus } from "react-icons/fc";
import { FolderDataSet } from "./components/helper";
import FolderNode from "./components/FolderNode";
// import AccordionFolder from "./components/AccordionFolder";

export interface TreeNode {
  name: string;
  isOpen: boolean;
  child?: TreeNode[];
}

function App() {
  const [folderData, setFolderData] = useState<TreeNode>({ ...FolderDataSet });
  const folderOpenIconHandler = (index: number) => {
    // setFolderData(
    //   (prev: TreeNode): TreeNode => ({ ...prev, isOpen: !prev.isOpen })
    // );
  };
  console.log({folderData})
  return (
    <>
      <div>
        <div className="container">
          {/* <div className="parentRoot" onClick={() => folderOpenIconHandler(0)}>
            <div className="innrerContainer">
              <p>{folderData?.isOpen ? <FcOpenedFolder /> : <FcFolder />}</p>
              <h4>{folderData?.name}</h4>
            </div>
            <div>
              <FcPlus />
            </div>
          </div> */}
          {folderData?.isOpen && <FolderNode folderData={folderData} />}
        </div>
      </div>
    </>
  );
}

export default App;
