module.exports = {
  albums: [
    {
      id: 1,
      title: 'Microsoft Life',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit asperiores, neque saepe quisquam impedit quae consequatur, harum tempora temporibus quo. Iusto, quasi ratione corporis corrupti deserunt officiis nisi aspernatur!',
      poster: 'album-poster-1.jpg',
    }, {
      id: 2,
      title: 'Changing Skyline',
      description: 'Ex unde sunt id facere, enim quia numquam tempore cupiditate reiciendis nisi voluptatibus aliquid vitae, atque hic quas. Consectetur dolorem vero possimus sint modi minus placeat, laudantium eveniet error debitis.',
      poster: 'album-poster-2.jpg',
    }, {
      id: 3,
      title: 'Seattle',
      description: 'Assumenda, repellat aliquid. Nihil, quo eveniet sit corporis iusto atque maxime cumque quisquam dolorum veritatis perspiciatis voluptas. Distinctio accusamus animi dolore ullam sunt exercitationem et, quo enim veritatis, amet quisquam?',
      poster: 'album-poster-3.jpg',
    },
  ],
  items: [
    { id: 1, albumIds: [1, 2], title: 'someImage', description: 'someImageDescription', type: 'image', file: '20170101_002915.jpg' },
    { id: 2, albumIds: [1, 2], title: 'someImage', description: 'someImageDescription', type: 'image', file: '20170625_101431.jpg' },
    { id: 3, albumIds: [1, 2, 3], title: 'someImage', description: 'someImageDescription', type: 'image', file: '20170701_120451.jpg' },
    { id: 4, albumIds: [1, 3], title: 'someImage', description: 'someImageDescription', type: 'image', file: '20170701_120505.jpg' },
    { id: 5, albumIds: [1, 2], title: 'someImage', description: 'someImageDescription', type: 'image', file: '20170726_132727.jpg' },
    { id: 6, albumIds: [1, 2, 3], title: 'someImage', description: 'someImageDescription', type: 'image', file: '20170728_140958.jpg' },
    { id: 7, albumIds: [1, 2], title: 'someImage', description: 'someImageDescription', type: 'image', file: '20171208_173615.jpg' },
    { id: 8, albumIds: [2, 3], title: 'someImage', description: 'someImageDescription', type: 'image', file: 'image.jpg' },
    { id: 9, albumIds: [1, 2, 3], title: 'someVideo', description: 'someVideoDescription', type: 'video', file: '20170825_131932.mp4' },
    { id: 10, albumIds: [1, 2], title: 'someVideo', description: 'someVideoDescription', type: 'video', file: '20170825_132829.mp4' },
  ],
};
