/**
 * Retrieves some content asynchronously.
 */
async function getContent() {
  return new Promise(function (resolve, reject) {
    // throw new Error('ErrorMessage');
    resolve('RETRIEVED_CONTENT');
  });
}

/**
 * Commits the given content and resolves with a message telling what was committed.
 * @param {string} content The content to commit.
 */
async function commit(content) {
  return new Promise(function (resolve, reject) {
    resolve('committed: ' + content);
  });
}

(async function () {
  var content;
  try {
    content = await getContent();
  } catch (e) {
    content = e.message;
  }
  
  var result = await commit(content);
  console.log(result);  
})();
