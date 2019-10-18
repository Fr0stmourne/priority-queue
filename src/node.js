class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		[this.parent, this.left, this.right] = [null, null, null];

	}

	appendChild(node) {
		if (node) {

			if (this.left && this.right) return;
			if (this.left) {
				node.parent = this;
				this.right = node;
				return;
			}
			node.parent = this;
			this.left = node;
		}
	}

	removeChild(node) {
		if (node !== null) {
			if (this.left && this.left.data === node.data && this.left.priority === node.priority) {
				this.left.parent = null;
				this.left = null;
				return;
			};
			if (this.right && this.right.data === node.data && this.right.priority === node.priority) {
				this.right.parent = null;
				this.right = null;
				return;
			};
			throw new Error();
		}
	}

	remove() {
		if (this.parent) this.parent.removeChild(this);
	}

	swapWithParent() {
		if (this.parent) {
			let grandparent = this.parent.parent;
			let parent = this.parent;
			this.parent.remove();
			this.remove()
			let secondChild;
			let isLeft = false;
			if (parent.left) {
				isLeft = true;
				secondChild = parent.left;
			} else {
				secondChild = parent.right;
			}
			if (secondChild) secondChild.remove();
			for (let child of [this.left, this.right]) {
				if (child) child.remove();
				parent.appendChild(child);
			}
			if (isLeft) {
				this.appendChild(secondChild);
				this.appendChild(parent);
			} else {
				this.appendChild(parent);
				this.appendChild(secondChild);
			}
			if (grandparent) grandparent.appendChild(this);
		}
	}
}

module.exports = Node;