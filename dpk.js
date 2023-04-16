const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    try {
      if (event.partitionKey) {
        candidate = event.partitionKey;
        if (typeof candidate !== "string") {
          candidate = JSON.stringify(candidate);
        }

        if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
          candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
        }
      } else {
        const data = JSON.stringify(event);
        candidate = crypto.createHash("sha3-512").update(data).digest("hex");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return candidate;
};

/*
* 1. Added a try/catch block to the original code to handle the error thrown by JSON.stringify
*    when it encounters a BigInt or a circular reference.
* 2. Added implicit default value to return variable `candidate`.
* 3. Moved candidate.length checking to exact place where it is actually needed.
*    Since createHash function currently producing string which length is 128.
* 4. Moved stringify of event.partitionKey object to the place where it is actually needed.
*
*    All these steps are made to make code more readable and easier to understand.
*    You can count the number of lines of code in the original code and in the refactored code.
*    And you will see that the refactored code is shorter (not counting try/catch block).
*/
