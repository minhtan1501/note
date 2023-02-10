import fakeData from "../fakeData/index.js";
import { AuthorModel, FolderModel } from "../models/index.js";

const resolvers = {
  Query: {
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      });
      return folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      const folder = await FolderModel.findById(folderId);
      return folder;
      //   return fakeData.folders.find((f) => f.id === folderId);
    },
    note: (parent, args) => {
      const noteId = args.noteId;
      return fakeData.notes.find((note) => note.id === noteId);
    },
  },
  Folder: {
    author: (parent, args) => {
      return fakeData.authors.find((a) => parent.authorId === a.id);
    },
    notes: (parent, args) => {
      return fakeData.notes.filter((n) => n.folderId === parent.id);
    },
  },
  Mutation: {
    addFolder: async (parent, args) => {
      const newFolder = new FolderModel({ ...args, authorId: "123" });
      newFolder.save();
      return newFolder;
    },
    register: async (parent, args) => {
      const foundUser = await AuthorModel.findOne({ uid: args.uid });
      if (!foundUser) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }
      return foundUser;
    },
  },
};

export default resolvers;
