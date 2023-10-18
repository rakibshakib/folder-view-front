import { useState } from "react";
import "./App.css";
import {
  AddFolder,
  FolderDataSet,
  deleteFolder,
  toggleFolder,
} from "./components/helper";
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
  const [folderName, setFolderName] = useState<string>("");
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
  const handleAddFolder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    AddFolder(
      (currentFolder as TreeNode).id,
      folderName,
      folderData,
      setFolderData,
      () => {
        setCurrentFolder({});
        setFolderName("");
        setIsCreateOpenModal(!isCreateModalOpen);
      }
    );
  };
  return (
    <>
      <div className="main">
        <p>Folder structure</p>
        <div className="container">
          <FolderNode
            folderData={folderData}
            folderOpenIconHandler={folderOpenIconHandler}
            folderCreateCloseHandler={folderCreateCloseHandler}
          />
        </div>
        <div className="modal">
          {isCreateModalOpen && (
            <ViewModal
              OnOk={() => {
                AddFolder(
                  (currentFolder as TreeNode).id,
                  folderName,
                  folderData,
                  setFolderData,
                  () => {
                    setCurrentFolder({});
                    setFolderName("");
                    setIsCreateOpenModal(!isCreateModalOpen);
                  }
                );
              }}
              onCancel={() => {
                setCurrentFolder({});
                setFolderName("");
                setIsCreateOpenModal(!isCreateModalOpen);
              }}
              onclose={() => setIsCreateOpenModal(!isCreateModalOpen)}
              okText="Create"
              cancelText="Cancel"
              isOpen={isCreateModalOpen}
            >
              <div className="create-folder-container">
                <p>
                  Create New Folder in <b>{(currentFolder as TreeNode).name}</b>{" "}
                </p>
                <form onSubmit={handleAddFolder}>
                  <input
                    type="text"
                    value={folderName}
                    className="inputField"
                    onChange={(e) => setFolderName(e.target.value)}
                  />
                </form>
              </div>
            </ViewModal>
          )}
        </div>
        <div className="modal">
          {isCloseModalOpen && (
            <ViewModal
              OnOk={() => {
                deleteFolder(
                  (currentFolder as TreeNode).id,
                  folderData,
                  setFolderData,
                  () => {
                    setCurrentFolder({});
                    setIsCloseOpenModal(!isCloseModalOpen);
                  }
                );
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
