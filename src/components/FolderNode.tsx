import { FcFolder, FcOpenedFolder, FcPlus } from "react-icons/fc";
import { TreeNode } from "../App";

const FolderNode = ({
  folderData,
  folderOpenIconHandler,
}: {
  folderData: TreeNode;
  folderOpenIconHandler: (node: TreeNode) => void;
}) => {
  console.log({ folderData });
  return (
    <>
      <div
        className="childRoots"
        onClick={() => folderOpenIconHandler(folderData)}
      >
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
            <FolderNode
              key={index}
              folderData={childNode}
              folderOpenIconHandler={folderOpenIconHandler}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default FolderNode;
