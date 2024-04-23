export type {};
declare global {
  interface Array<T> {
    /**  Returns the first element of the array. */
    first(): T | undefined;
    /**  Returns the last element of the array. */
    last(): T | undefined;
    /**  Appends the elements of the given array to the end of this array. The given array is emptied. */
    append(items: T[]): T[];
    /**  Removes the elements from the array and return them as a new array. */
    drain(fromIdx: number, toIdx: number): T[];
    /**  Removes all elements from the array. */
    clear(): void;
    /**  Returns true if the array is empty. */
    is_empty(): boolean;
    /**  Removes all but the first n elements from the array. */
    split_off(at: number): T[];
    /**  Resizes the array in-place so that len is the new length. */
    resize_with(len: number, f?: () => T): void;
    /**  Resizes the array in-place so that len is the new length. */
    resize(len: number, value?: T): void;
    /**  Removes consecutive repeated elements in the array. */
    dedup(): void;
    /**  Removes and returns the element at position index within the array. */
    remove(index: number): T;
    /**  Retains only the elements specified by the predicate. */
    retain(f: (item: T) => boolean): void;
  }
}

function defineProp<K extends keyof any[]>(
  key: K,
  value: (...args: Parameters<any[][K]>) => ReturnType<any[][K]>,
): void {
  if (!Array.prototype[key]) {
    Object.defineProperty(Array.prototype, key, {
      enumerable: false,
      writable: false,
      configurable: false,
      value,
    });
  }
}

defineProp("first", function () {
  return this.length > 0 ? this[0] : undefined;
});

defineProp("last", function () {
  return this.length > 0 ? this[this.length - 1] : undefined;
});

defineProp("append", function (items) {
  while (items.length > 0) {
    this.push(items.shift());
  }

  return this;
});

defineProp("drain", function (fromIdx, toIdx) {
  return this.splice(fromIdx, toIdx - fromIdx + 1);
});

defineProp("clear", function () {
  this.length = 0;
});

defineProp("is_empty", function () {
  return this.length === 0;
});

defineProp("split_off", function (idx) {
  return this.splice(idx, this.length - idx);
});

defineProp("resize_with", function (length, f) {
  if (length < this.length) {
    this.splice(length, this.length - length);
  } else {
    while (this.length < length) {
      this.push(f?.() ?? null);
    }
  }
});

defineProp("resize", function (length, value) {
  if (length < this.length) {
    this.splice(length, this.length - length);
  } else {
    while (this.length < length) {
      this.push(value ?? null);
    }
  }
});

defineProp("dedup", function () {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === this[i - 1]) {
      this.splice(i, 1);
      i--;
    }
  }

  return this;
});

defineProp("remove", function (index) {
  return this.splice(index, 1)[0];
});

defineProp("retain", function (f) {
  for (let i = 0; i < this.length; i++) {
    if (!f(this[i])) {
      this.splice(i, 1);
      i--;
    }
  }
});
