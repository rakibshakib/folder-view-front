import { TreeNode } from "../App";

export const FolderDataSet: TreeNode = {
  name: "Root",
  isOpen: false,
  id: 1,
  child: [
    {
      name: "Folder 1",
      isOpen: false,
      id: 2,
      child: [
        {
          name: "Folder 1.1",
          isOpen: false,
          id: 4,
          child: [],
        },
      ],
    },
    {
      name: "Folder 2",
      isOpen: false,
      id: 3,
      child: [
        {
          name: "Folder 2.1",
          isOpen: false,
          id: 5,
          child: [],
        },
        {
          name: "Folder 2.2",
          isOpen: false,
          id: 6,
          child: [
            {
              name: "Folder 2.2.1",
              isOpen: false,
              id: 7,
              child: [
                {
                  name: "Folder 2.2.1.1",
                  isOpen: false,
                  id: 8,
                  child: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const toggleFolder = (
  id: number,
  folderData: TreeNode,
  setFolderData: (node: TreeNode) => void
) => {
  // ** Recursive function to search for the node
  const updateNodeToggle = (child: TreeNode) => {
    if (child.id === id) {
      // ** close all child node if parent node is toggle for close
      if (child.isOpen && child.child.length > 0) {
        closeNextAllChildNode(child);
      } else {
        child.isOpen = !child.isOpen;
      }
    } else if (child.child) {
      child.child.forEach(updateNodeToggle);
    }
  };
  const updatedData = { ...folderData };
  updateNodeToggle(updatedData);
  setFolderData(updatedData);
};

const closeNextAllChildNode = (child: TreeNode): void => {
  child.isOpen = false;
  if (child.child.length > 0) {
    child.child.forEach(closeNextAllChildNode);
  }
};
