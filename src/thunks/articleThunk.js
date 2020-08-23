import APIHelper from './index';

export default class ArticleApi extends APIHelper {
  static async fetch(id) {
    try {
      //const res = await axios.get(URL);
      const res = APIHelper(`/articles/${id}`).get();

      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
