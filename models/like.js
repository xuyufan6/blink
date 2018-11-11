import Http from '../utils/http';

class LikeModel extends Http {
  like(behavior, artId, type) {
    let url = behavior === 'like' ? 'like' : 'like/cancel';

    return this.request({
      url,
      method: 'POST',
      data: {
        art_id: artId,
        type
      }
    });
  }

  getClassicLikeStatus(artId, type) {
    return this.request({
      url: `classic/${type}/${artId}/favor`
    });
  }
}

export default new LikeModel();
