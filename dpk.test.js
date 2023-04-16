const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();

    expect(trivialKey).toBe("0");
  });

  it("shouldn't throw an error even event it can't be stringified (BigInt or circular reference inside)", () => {
    const circularReference = { x: 2n };
    // circularReference.myself = circularReference;
    const partitionKey = deterministicPartitionKey(circularReference);

    expect(partitionKey).toBe("0");
  });

  describe('if event.partitionKey is defined', () =>{
    it("Returns stringified json if event.partitionKey is not a string", () => {
      const event = {
        partitionKey: {
          foo: "bar"
        }
      };
      const partitionKey = deterministicPartitionKey(event);
      expect(partitionKey).toBe("{\"foo\":\"bar\"}");
    });

    it("Returns event.partitionKey if it is a string", () => {
      const event = {
        partitionKey: "foo"
      };
      const partitionKey = deterministicPartitionKey(event);
      expect(partitionKey).toBe("foo");
    });

    it("Returns hashed string if partitionKey is longer than 256 characters", () => {
      const event = {
        partitionKey: "VERY LONG STRING".repeat(16) + "!" // 257 characters
      };
      const partitionKey = deterministicPartitionKey(event);

      expect(partitionKey).toBe("af3496b4325b808e0b2fb89954aaae78a5035d54223526782753bd8811f4514eb6c2d004b065331797bea651049fe8c0279b4137292d82f0ef32356090111121");
    });

    it("Returns hashed string if partitionKey is object which stringified size longer than 256 characters", () => {
      const event = {
        partitionKey: {
          field: "VERY LONG STRING".repeat(15) + "12345" // 257 characters
        }
      };
      const partitionKey = deterministicPartitionKey(event);

      expect(partitionKey).toBe("e19cc0bd698834f70a6ee20daab220eb228bfe14b96dbda8f55cc3a3f6a741b91ce0caf6f3d3e020c2cd4a016f47b967ac129bb23f605229618b85ad149e8b64");
    });
  });

  describe('if event.partitionKey is not defined', function () {
    it("Returns stringified and hashed event object if no partionKey field presented", () => {
        const event = {
            foo: "bar"
        };
        const partitionKey = deterministicPartitionKey(event);
        expect(partitionKey).toBe("a419a15de4a65c3dba49c38b4485cd4dce1dde4d18f5b965d90f0649bef54252ec4e76dbcaa603708e8e8ebbe848ba484e81e23b7823808b5b8e5f4222d122e8");
    });
  });
});
