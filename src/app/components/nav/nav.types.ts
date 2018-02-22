enum NavMode {
  Full = 'Full',
  Compact = 'Compact',
  Hidden = 'Hidden',
}

class LinkItem {
  constructor(public path: string, public text?: string, public icon?: string) {
    if(!icon) {
      this.text = text || path;
    }
  }
}

const linkData = [
  new LinkItem('/projects', 'Projects', 'far fa-file-code'),
  new LinkItem('/albums', 'Seattle life', 'fas fa-film'),
  new LinkItem('/about', 'About', 'far fa-address-card'),
];

export {
  linkData,
  LinkItem,
  NavMode,
};
