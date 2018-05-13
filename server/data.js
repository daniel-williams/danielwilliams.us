module.exports = {
  albums: [
    {
      id: 1,
      title: 'Changing Skyline',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit asperiores, neque saepe quisquam impedit quae consequatur, harum tempora temporibus quo. Iusto, quasi ratione corporis corrupti deserunt officiis nisi aspernatur!',
    }, {
      id: 2,
      title: 'Microsoft Life',
      description: 'Ex unde sunt id facere, enim quia numquam tempore cupiditate reiciendis nisi voluptatibus aliquid vitae, atque hic quas. Consectetur dolorem vero possimus sint modi minus placeat, laudantium eveniet error debitis.',
    }, {
      id: 3,
      title: 'Seattle',
      description: 'Assumenda, repellat aliquid. Nihil, quo eveniet sit corporis iusto atque maxime cumque quisquam dolorum veritatis perspiciatis voluptas. Distinctio accusamus animi dolore ullam sunt exercitationem et, quo enim veritatis, amet quisquam?',
    },
  ],
  items: [
    { id: 1, albumIds: [1, 2], title: 'someImage', description: 'someImageDescription', type: 'image', file: 'image.png' },
    { id: 2, albumIds: [1, 2, 3], title: 'someVideo', description: 'someVideoDescription', type: 'video', file: 'video.mp4' },
  ],
};
