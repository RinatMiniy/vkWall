export interface Post {
  owner_id: string,
  id: string,
  text: string,
  date: number,
  views: {
    count: number,
  },
  likes: {
    count: number,
  },
  reposts: {
    count: number,
  }
}