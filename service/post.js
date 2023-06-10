const PostModel = require("../models/post");
const ApiError = require("../exceptions/api-error");

class PostService {
  async getPosts(limit, page) {
    const posts = await PostModel.find()
      .limit(limit)
      .skip(limit * page)
      .populate("author");
    return posts;
  }

  async getUsersPosts(userId, limit, page) {
    const posts = await PostModel.find({ author: userId })
      .limit(limit)
      .skip(limit * page)
      .populate("author");
    if (posts.length === 0) {
      throw ApiError.NotFound(`User with ${userId} did not create any posts`);
    }
    return posts;
  }

  async getPostById(id) {
    const post = await PostModel.findById(id).populate("author");
    if (!post) {
      throw ApiError.NotFound(`Post with id ${id} not found`);
    }
    return post;
  }

  async createPost(postData) {
    const post = await PostModel.create(postData);
    return post;
  }

  async updatePost(id, postData) {
    const post = await PostModel.findOneAndUpdate({ _id: id }, postData, {
      new: true,
    }).populate("author");
    if (!post) {
      throw ApiError.NotFound(`Post with id ${id} not found`);
    }
    return post;
  }

  async deletePost(id) {
    const post = await PostModel.findOneAndDelete({ _id: id });
    if (!post) {
      throw ApiError.NotFound(`Post with id ${id} not found`);
    }
    return post;
  }
}

module.exports = new PostService();
