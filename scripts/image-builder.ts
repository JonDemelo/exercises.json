import {
  readdirSync,
  Dirent,
  existsSync,
  rmdirSync,
  mkdirSync,
  copyFile,
} from "fs";
import { resolve } from "path";
import { ExerciseImageCollection } from "../types/exerciseImageCollection";

const getDirectories = (folder: string): Array<Dirent> => {
  const subFolders = readdirSync(folder, {
    withFileTypes: true,
  }).filter((dir) => dir.isDirectory());

  return subFolders;
};

const getExerciseImages = (
  directories: Array<Dirent>
): Array<ExerciseImageCollection> => {
  return directories.map((dir, i) => {
    return {
      index: i,
      img0: resolve(`./exercises/${dir.name}/images`, "0.jpg"),
      img1: resolve(`./exercises/${dir.name}/images`, "1.jpg"),
    };
  });
};

const createImageFolder = (exercises: Array<ExerciseImageCollection>) => {
  var dir = "./exerciseImages";

  if (existsSync(dir)) {
    rmdirSync(dir, { recursive: true });
  }
  mkdirSync(dir);

  exercises.forEach((e) => {
    copyFile(e.img0, `${dir}/${e.index}-0.jpg`, (err) => {
      if (err) throw err;
    });

    copyFile(e.img1, `${dir}/${e.index}-1.jpg`, (err) => {
      if (err) throw err;
    });
  });
};

const directories = getDirectories("./exercises");
const exerciseImages = getExerciseImages(directories);
createImageFolder(exerciseImages);
console.log("Created ./exerciseImages directory");
