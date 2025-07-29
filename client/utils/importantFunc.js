// Formats a date into a readable string: "HH:MM AM/PM Mon DD YYYY"
export const formatDate = (date) => {
  const formatedDate = new Date(date);

  return (
    formatedDate.toLocaleTimeString().slice(0, 5).trim() + // Extracts time like "08:30"
    " " +
    formatedDate.toLocaleTimeString().slice(8) + // Extracts "AM"/"PM"
    " " +
    formatedDate.toDateString().slice(4) // Extracts date like "Jul 24 2025"
  );
};

// Capitalizes the first letter of a title string
export const formatedTitle = (title) => {
  return title.slice(0, 1).toUpperCase() + title.slice(1);
};

// Extracts chat title from a string like 'Title: "Something"'
export const extractChatTitle = (response) => {
  return response?.split(":")[1]?.trim();
};
