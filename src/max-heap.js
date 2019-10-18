const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this._size = 0;
	}

	push(data, priority) {
		let newNode = new Node(data, priority);
		this.insertNode(newNode);
		this.shiftNodeUp(newNode);
	}

	pop() {
		this._size--;
	}

	detachRoot() {
		this.root = null;
		return this.parentNodes.shift();

	}

	restoreRootFromLastInsertedNode(detached) {

	}

	size() {
		return this._size;
	}

	isEmpty() {
		return !this.size();
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this._size = 0;
	}

	insertNode(node) {
		if (!this.root) {
			this.root = node;
			this.parentNodes.push(node);
			this._size++;
			return;
		}
		this.parentNodes[0].appendChild(node);
		if (this.parentNodes[0].left && this.parentNodes[0].right) this.parentNodes.shift();
		this.parentNodes.push(node);
		this._size++;
	}

	shiftNodeUp(node) {
		if (node.parent && node.parent.priority < node.priority) {
			if (this.parentNodes.find(el => el.priority === node.parent.priority && el.data === node.parent.data)) {
				let parentIndex = this.parentNodes.findIndex(el => el.priority === node.parent.priority && el.data === node.parent.data);
				let childIndex = this.parentNodes.findIndex(el => el.priority === node.priority && el.data === node.data);
				[this.parentNodes[parentIndex], this.parentNodes[childIndex]] = [this.parentNodes[childIndex], this.parentNodes[parentIndex]]
			} else {
				let nodeIndex = this.parentNodes.findIndex(el => el.priority === node.priority && el.data === node.data)
				if (nodeIndex !== -1) {
					this.parentNodes.splice(nodeIndex, 1, node.parent)
				}

			}
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
		this.root = node;
	}

	shiftNodeDown(node) {
		let maxChild = [node.left, node.right].sort((a, b) => a.priority - b.priority)[0];
		if (node.right && node.left && node.priority < maxChild.priority) {
			this.parentNodes.find(el => el.priority === maxChild.priority && el.data === maxChild.data)
		}


	}
}

module.exports = MaxHeap;