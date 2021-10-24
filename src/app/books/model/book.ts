export interface Book {
  id: number;
  seqNo: number;
  url: string;
  iconUrl: string;
  bookListIcon: string;
  description: string;
  longDescription?: string;
}

export function compareBooks(c1: Book, c2: Book) {
  const compare = c1.seqNo - c2.seqNo;

  if (compare > 0) {
    return 1;
  } else if (compare < 0) {
    return -1;
  } else return 0;
}
