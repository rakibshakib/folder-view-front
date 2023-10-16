import { FcFolder, FcOpenedFolder, FcPlus } from "react-icons/fc";
import { TreeNode } from "../App";

const FolderNode = ({ folderData }: { folderData: TreeNode }) => {
  const folderOpenIconHandler = (): void => {
    console.log(folderData)
    folderData.isOpen = !folderData.isOpen;
  };
  console.log({folderData})
  return (
    <>
      {folderData?.isOpen && (
        <div className="childRoots" onClick={() => folderOpenIconHandler()}>
          <div className="innrerContainer">
            <p>{folderData?.isOpen ? <FcOpenedFolder /> : <FcFolder />}</p>
            <h4>{folderData?.name}</h4>
          </div>
          <div>
            <FcPlus />
          </div>
          {folderData?.child?.map((child, index) => {
            return <FolderNode key={index} folderData={child} />;
          })}
        </div>
      )}
    </>
  );
};

export default FolderNode;
