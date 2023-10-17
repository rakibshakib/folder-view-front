import { useState } from "react";
import "./App.css";
import { FolderDataSet, deleteFolder, toggleFolder } from "./components/helper";
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
  const [isCreateModalOpen, setIsCreateOpenModal] = useState<boolean>(false);
  const [isCloseModalOpen, setIsCloseOpenModal] = useState<boolean>(false);
  const [currentFolder, setCurrentFolder] = useState<TreeNode | object>();
  const folderOpenIconHandler = (FolderNode: TreeNode): void => {
    toggleFolder(FolderNode?.id, folderData, setFolderData);
  };
  const folderCreateCloseHandler = (
    FolderNode: TreeNode,
    type: string
  ): void => {
    setCurrentFolder(FolderNode);
    if (type === "add") {
      setIsCreateOpenModal(!isCreateModalOpen);
    } else {
      setIsCloseOpenModal(!isCloseModalOpen);
    }
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
        {/* <button onClick={() => setIsCreateOpenModal(!isCreateModalOpen)}>
          Open Modal
        </button> */}

        <div className="modal">
          {isCreateModalOpen && (
            <ViewModal
              OnOk={() => {
                console.log(currentFolder);
              }}
              onCancel={() => {
                setCurrentFolder({});
                setIsCreateOpenModal(!isCreateModalOpen);
              }}
              onclose={() => setIsCreateOpenModal(!isCreateModalOpen)}
              okText="Create"
              cancelText="Cancel"
              isOpen={isCreateModalOpen}
            >
              <p>
                Create New Folder in <b>{(currentFolder as TreeNode).name}</b>{" "}
              </p>
            </ViewModal>
          )}
        </div>
        <div className="modal">
          {isCloseModalOpen && (
            <ViewModal
              OnOk={() => {
                console.log(currentFolder);
                deleteFolder((currentFolder as TreeNode).id, folderData, setFolderData);
              }}
              onCancel={() => {
                setCurrentFolder({});
                setIsCloseOpenModal(!isCloseModalOpen);
              }}
              onclose={() => setIsCloseOpenModal(!isCloseModalOpen)}
              okText="Yes"
              cancelText="No"
              isOpen={isCloseModalOpen}
            >
              <p>
                Are You Sure Want to delete{" "}
                <b>{(currentFolder as TreeNode).name}</b> folder ?{" "}
              </p>
            </ViewModal>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
