/**
 * Calls the next method of a generator until it is done. 
 * Passes the yielded result back in to the next next call.
 * @param {function*} generator A generator which yields Promises.
 */
function asynchronously(generator) {
  var g = generator();
  (function go (err, result) {
    var step;
    if (err) {
      step = g.throw(err);  
    } else {
      step = g.next(result);
    }
    
    if (!step.done) {
      var promise = step.value;
      promise.then(function (resolvedValue) {
        go(null, resolvedValue);
      }).catch(function (e) {
        go(e);
      })
    }
  })();
}

/**
 * Retrieves some content asynchronously.
 */
function getContent() {
  return new Promise(function (resolve, reject) {
    // throw new Error('ErrorMessage');
    resolve('RETRIEVED_CONTENT');
  });
}

/**
 * Commits the given content and resolves with a message telling what was committed.
 * @param {string} content The content to commit.
 */
function commit(content) {
  return new Promise(function (resolve, reject) {
    resolve('committed: ' + content);
  });
}

/**
 * A main method to test out asynchronous code looking like synchronous code.
 */
asynchronously(function* () {
  var content;
  try {
    content = yield getContent();
  } catch (e) {
    content = e.message;
  }
  
  var result = yield commit(content);
  console.log(result);
});
