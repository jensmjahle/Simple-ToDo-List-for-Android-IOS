import RNFS from 'react-native-fs';

class FileManager {
  // Write the task list to a JSON file
  async writeTaskList(filename, taskList) {
    try {
      const path = RNFS.DocumentDirectoryPath + `/${filename}`;
      const json = JSON.stringify(taskList); // Convert task list to JSON

      // Write the JSON to the file
      await RNFS.writeFile(path, json, 'utf8');
      console.log('Task list saved successfully!');
    } catch (error) {
      console.error('Error saving task list:', error);
    }
  }

  // Read the task list from a JSON file
  async readTaskList(filename) {
    try {
      const path = RNFS.DocumentDirectoryPath + `/${filename}`;

      // Check if file exists
      const exists = await RNFS.exists(path);
      if (!exists) {
        return []; // Return an empty list if no file found
      }

      // Read the file
      const json = await RNFS.readFile(path, 'utf8');
      const taskList = JSON.parse(json); // Parse JSON to task list

      return taskList;
    } catch (error) {
      console.error('Error reading task list:', error);
      return []; // Return an empty list on error
    }
  }
}

export default FileManager;
