var readingJson = [];
  
function loadReadingJSON(filename) {
    fetch('./json/reading/' + filename + '.json')
        .then(response => response.json())
        .then(data => {
            readingJson = data;
            showReading();
        })
        .catch(error => console.error(error));
}

function showReading() {
    console.log(readingJson);
}