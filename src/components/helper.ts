import { TreeNode } from "../App";

export const FolderDataSet: TreeNode = {
    name: 'Root',
    isOpen: true,
    child: [
      {
        name: 'Child 1',
        isOpen: false,
        child: [
          {
            name: 'Child 1.1',
            isOpen: false,
            child: [],
          },
        ],
      },
      {
        name: 'Child 2',
        isOpen: false,
        child: [
          {
            name: 'Child 2.1',
            isOpen: false,
            child: [],
          },
        ],
      },
    ],
  };