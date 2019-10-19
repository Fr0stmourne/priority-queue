const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.heap.size() === this.maxSize) throw new Error();
		this.heap.push(data, priority);

	}

	shift() {
		if (!this.heap.size()) throw new Error();
		let returnValue = this.heap.pop();
		return returnValue;
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;