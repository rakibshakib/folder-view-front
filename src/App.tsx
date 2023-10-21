import { useState, useEffect } from "react";
import "./App.css";
import { AddFolder, deleteFolder, toggleFolder } from "./components/helper";
import FolderNode from "./components/FolderNode";
import ViewModal from "./components/Modal";
import useCallApi from "./hooks/useCallApi";
import Axios from "axios";

export interface TreeNode {
  name: string;
  isOpen: boolean;
  id: string;
  child: TreeNode[] | [];
}
const APIUrl: string = "http://localhost:5000";
Axios.defaults.baseURL = APIUrl;

function App() {
  const [folderData, getFolderData, isLoading, setFolderData] =
    useCallApi<TreeNode>();
  const [, deleteFolderApi, isDeleting] = useCallApi<null>();
  const [, addChildFolder, isAdding] = useCallApi<null>();
  const [folderName, setFolderName] = useState<string>("");
  const [isCreateModalOpen, setIsCreateOpenModal] = useState<boolean>(false);
  const [isCloseModalOpen, setIsCloseOpenModal] = useState<boolean>(false);
  const [currentFolder, setCurrentFolder] = useState<TreeNode | object>();

  const getAllFolder = (): void => {
    getFolderData({
      url: "allFolders",
    });
  };

  useEffect(() => {
    getAllFolder();
  }, []);

  const folderOpenIconHandler = (FolderNode: TreeNode): void => {
    toggleFolder(FolderNode?.id, folderData as TreeNode, setFolderData);
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

  const addNewFolderAsChild = () => {
    AddFolder(
      (currentFolder as TreeNode).id,
      folderName,
      folderData as TreeNode,
      setFolderData,
      () => {
        addChildFolder({
          url: "updateNodeFolder",
          method: "post",
          payload: {
            id: (currentFolder as TreeNode).id,
            name: folderName,
          },
          // cb: () => getAllFolder(),
        });
        setCurrentFolder({});
        setFolderName("");
        setIsCreateOpenModal(!isCreateModalOpen);
      }
    );
  };
  const handleAddFolder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewFolderAsChild();
  };
  return (
    <>
      <div className="main">
        <p>Folder structure</p>
        <div className="container">
          <FolderNode
            folderData={folderData as TreeNode}
            folderOpenIconHandler={folderOpenIconHandler}
            folderCreateCloseHandler={folderCreateCloseHandler}
          />
        </div>
        <div className="modal">
          {isCreateModalOpen && (
            <ViewModal
              OnOk={() => {
                addNewFolderAsChild();
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
                  folderData as TreeNode,
                  setFolderData,
                  () => {
                    deleteFolderApi({
                      url: "deleteNodeById",
                      method: "post",
                      payload: {
                        id: (currentFolder as TreeNode).id,
                      },
                    });
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
