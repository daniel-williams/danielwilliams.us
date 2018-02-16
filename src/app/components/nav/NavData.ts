class LinkItem {
  constructor(public path: string, public text?: string, public icon?: string) {
    if(!icon) {
      this.text = text || path;
    }
  }
}

const linkData = [
  new LinkItem('/', 'Home', 'far fa-user'),
  new LinkItem('/projects', 'Projects', 'far fa-user'),
  new LinkItem('/albums', 'Seattle life', 'far fa-user'),
  new LinkItem('/about', 'About', 'far fa-user'),
];

export {
  linkData,
  LinkItem,
};
