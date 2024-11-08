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



   // Retrieve all list names (files ending in .json) in the storage directory
    async getAllLists() {
      try {
        // Get a list of all files in the document directory
        const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);

        // Filter out only files ending with .json and remove the extension
        const listNames = files
          .filter((file) => file.isFile() && file.name.endsWith('.json'))
          .map((file) => file.name.replace('.json', ''));
        return listNames; // Return the list of names
      } catch (error) {
        console.error('Error retrieving list names:', error);
        return []; // Return an empty array on error
      }
    }

     // Delete a specified list by filename
      async deleteList(filename) {
        try {
          const path = RNFS.DocumentDirectoryPath + `/${filename}`;

          // Check if file exists
          const exists = await RNFS.exists(path);
          if (exists) {
            await RNFS.unlink(path); // Delete the file if it exists
            console.log(`List ${filename} deleted successfully!`);
          } else {
            console.warn(`File ${filename} does not exist.`);
          }
        } catch (error) {
          console.error('Error deleting list:', error);
        }
      }
}

export default FileManager;
