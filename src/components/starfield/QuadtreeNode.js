export class QuadtreeNode {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.points = [];
    this.starIDs = [];
    this.children = null;
  }

  // Insert a point into the quadtree
  insert(point, starID) {
    // If the point is outside the bounds of this node, ignore it
    if (
      point.x < this.x ||
      point.x > this.x + this.width ||
      point.y < this.y ||
      point.y > this.y + this.height
    ) {
      return;
    }

    // If the node has no children, add the point to its list
    if (!this.children) {
      this.points.push(point);
      this.starIDs.push(starID);

      // Split the node if it has reached its capacity (e.g., 4 points)
      if (this.points.length > 10) {
        this.split();
      }
    } else {
      // Insert the point into one of the child nodes
      for (let child of this.children) {
        child.insert(point, starID);
      }
    }
  }

  // Split the node into four children
  split() {
    const { x, y, width, height } = this;
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    this.children = [
      new QuadtreeNode(x, y, halfWidth, halfHeight),
      new QuadtreeNode(x + halfWidth, y, halfWidth, halfHeight),
      new QuadtreeNode(x, y + halfHeight, halfWidth, halfHeight),
      new QuadtreeNode(x + halfWidth, y + halfHeight, halfWidth, halfHeight),
    ];

    // Move existing points to children
    for (let point of this.points) {
      for (let child of this.children) {
        child.insert(point, this.starIDs[this.points.indexOf(point)]);
      }
    }

    this.points = [];
    this.starIDs = [];
  }

  //Query QuadTreeNode for given point
  queryPointsInRange(x, y, radius, returnPoints = []) {
    // If the point is outside the bounds of this node, ignore it
    if (
      x < this.x ||
      x > this.x + this.width ||
      y < this.y ||
      y > this.y + this.height
    ) {
      // console.log("out of bounds");
    } else {
      // If the node has children, recursively query them
      if (this.children) {
        // console.log("has children");
        for (let child of this.children) {
          child.queryPointsInRange(x, y, radius, returnPoints);
        }
      } else {
        // console.log("no children");
        // Otherwise, query this node
        for (let i = 0; i < this.points.length; i++) {
          const point = this.points[i];
          const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
          if (distance <= radius) {
            returnPoints.push(this.starIDs[i]);
          }
        }
      }
      return returnPoints;
    }
  }
}
