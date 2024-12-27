// Main.js is

const tokensFile = '../../output/tokens.json';
const tokenKey = 'color';
const tokens = [];


  // Function to read a JSON file and search for a specific key
  function readJSONFile(filePath, targetKey) {
    console.log('file path:', filePath);
    console.log('Key:', targetKey);
  
    // Fetch the JSON file
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Search for the target key
        const results = findKeyInObject(data, targetKey);
        console.log(`Children of the key "${targetKey}":`, results);
      })
      .catch(error => console.error("Error reading JSON file:", error));
  };
  
  // Recursive function to find the target key in an object
  function findKeyInObject(obj, targetKey) {

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (key === targetKey && typeof obj[key] === "object") {
                results.push(obj[key]);
            } else if (typeof obj[key] === "object") {
                results = results.concat(findKeyInObject(obj[key], targetKey));
            }
        }
    }

    return (
      console.log('Results:', results),
      results
    );
  };

// readJSONFile(tokensFile, tokenKey);

document.querySelector('#approot').innerHTML = `
  <div>
    <h2>JS stuff</h2>
  </div>
`