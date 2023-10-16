import { FcFolder, FcOpenedFolder, FcPlus } from "react-icons/fc";
import { TreeNode } from "../App";

const FolderNode = ({ folderData }: { folderData: TreeNode }) => {
  const folderOpenIconHandler = (): void => {
    console.log(folderData);
    folderData.isOpen = !folderData.isOpen;
  };
  console.log({ folderData });
  return (
    <>
      <div className="childRoots" onClick={() => folderOpenIconHandler()}>
        <div className="innrerContainer">
          <p>{folderData?.isOpen ? <FcOpenedFolder /> : <FcFolder />}</p>
          <h4>{folderData?.name}</h4>
        </div>
        <div>
          <FcPlus />
        </div>
      </div>

      {folderData.isOpen && folderData?.child.length > 0 && (
        <div style={{ marginLeft: "20px" }}>
          {folderData?.child.map((childNode, index) => (
            <FolderNode key={index} folderData={childNode} />
          ))}
        </div>
      )}
    </>
  );
};

export default FolderNode;
