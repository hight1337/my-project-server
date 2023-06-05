const ApiError = require("../exceptions/api-error");

class PostController {
  async createPost(req, res, next) {}

  async getAll(req, res, next) {}

  async getUsersPosts(req, res, next) {}

  async getPostById(req, res, next) {}

  async updatePost(req, res, next) {}

  async deletePost(req, res, next) {}
}

module.exports = new PostController();
