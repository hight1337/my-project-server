const PostService = require("../service/post");

class PostController {
  async createPost(req, res, next) {
    try {
      const userId = req.user.id;
      const { title, shortDescription, content } = req.body;
      const postData = await PostService.createPost({
        title,
        shortDescription,
        content,
        author: userId,
      });
      return res.json(postData);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const { limit = 100, page = 0 } = req.query;

      const posts = await PostService.getPosts(limit, page);
      return res.json(posts);
    } catch (error) {
      next(error);
    }
  }

  async getUsersPosts(req, res, next) {
    const { limit = 50, page = 0 } = req.query;
    const userId = req.user.id;
    try {
      const posts = await PostService.getUsersPosts(userId, limit, page);
      return res.json(posts);
    } catch (error) {
      next(error);
    }
  }

  async getPostById(req, res, next) {
    const { id } = req.params;
    try {
      const post = await PostService.getPostById(id);
      return res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async updatePost(req, res, next) {
    const { id } = req.params;
    const { title, shortDescription, content } = req.body;
    try {
      const postData = await PostService.updatePost(id, {
        title,
        shortDescription,
        content,
      });
      return res.json(postData);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
    const { id } = req.params;
    try {
      const postData = await PostService.deletePost(id);
      return res.json(postData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
