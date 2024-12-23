const fs = require("fs");
const path = require("path");

/**
 * Deletes an existing file from the server if it exists.
 * @param {string} fileUrl - The URL of the file to be deleted.
 */
const deleteFile = (fileUrl) => {
  if (!fileUrl) return;

  // Extract file path from URL
  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    path.basename(fileUrl)
  );

  // Check if the file exists and delete it
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully:", filePath);
      }
    });
  }
};

module.exports = {
  deleteFile,
};
