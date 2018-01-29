export class Crumb {
  public id: string;
  public path: string;
  public title: string;

  constructor(id: string, path: string, title?: string) {
    this.id = id;
    this.path = path;
    this.title = title || this.makeTitle(path);
  }

  makeTitle(title: string) {
    return (title[0].toUpperCase() + title.substring(1));
  }
}
