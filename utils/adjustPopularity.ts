export default function name(popularity: number) {
  switch (true) {
    case popularity >= 0 && popularity < 20:
      return 1;
    case popularity >= 20 && popularity < 40:
      return 2;
    case popularity >= 40 && popularity < 60:
      return 3;
    case popularity >= 60 && popularity < 80:
      return 4;
    case popularity >= 80 && popularity < 100:
      return 5;

    default:
      break;
  }
}
