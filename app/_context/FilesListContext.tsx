import { createContext } from 'react';

export interface FileListing {
  _creationTime: number;
  _id: string;
  archive: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
}

export interface FilesListContextType {
  fileListings: FileListing[];
  setFileListings: (fileListings: FileListing[]) => void;
}

export const FilesListContext = createContext<FilesListContextType | undefined>(
  undefined
);
