/* eslint-disable no-undef */
/* eslint-disable new-cap */

db.categories.drop();
db.components.drop();

const categories = {
  home: {
    _id: ObjectId(),
    title: 'Home',
    order: 0,
    sections: [
      {
        _id: ObjectId(),
        title: 'Home',
        template: 'basicpage',
        order: 0
      }
    ]
  },
  cat1: {
    _id: ObjectId(),
    title: 'Category 1',
    order: 1,
    sections: [
      {
        _id: ObjectId(),
        title: 'Section 1a',
        template: 'basicpage',
        order: 0
      },
      {
        _id: ObjectId(),
        title: 'Section 1b',
        template: 'basicpage',
        order: 1
      }
    ]
  },
  cat2: {
    _id: ObjectId(),
    title: 'Category 2',
    order: 2,
    sections: [
      {
        _id: ObjectId(),
        title: 'Section 2',
        template: 'basicpage',
        order: 0
      }
    ]
  },
  cat3: {
    _id: ObjectId(),
    title: 'Category 3',
    order: 3,
    sections: [
      {
        _id: ObjectId(),
        title: 'Section 3',
        template: 'basicpage',
        order: 0
      }
    ]
  },
  cat4: {
    _id: ObjectId(),
    title: 'Category 4',
    order: 4,
    sections: []
  },
};

Object.keys(categories).forEach((category) =>
  db.categories.save(categories[category]));

const components = {
  home: {
    _id: ObjectId(),
    componentType: 'TextComponent',
    data: `<p>Welcome to the Beta v0.1 of TAB's Resource Centre. We created this site to better store and share useful information across the company.</p>
<p>For this version, you'll find two sections. The first section is for new starters: click New to Tab? to go to a set of useful induction information. The second section is useful for everyone, and contains our brand guidelines and assets - like our logo.</p>
<p>It's a first release so do let us know any feedback or suggestions you have by dropping an <a href="mailto:emily@theappbusiness.com">email</a> to Emily.</p>`,
    searchText: 'This is some basic search test which will be indexed, it also contains references to sections and Categories',
    order: 0,
    sectionid: categories.home.sections[0]._id,
    categoryid: categories.home._id
  },
  home2: {
    _id: ObjectId(),
    componentType: 'ListComponent',
    data: {
      links: [{
        title: '2016.06 - Perm NewStarter_Induction KK - Final .pdf',
        type: 'link',
        url: '',
        order: 0
      }]
    },
    searchText: 'This is some basic search test which will be indexed, it also contains references to sections and Categories',
    order: 1,
    sectionid: categories.home.sections[0]._id,
    categoryid: categories.home._id
  }
};

Object.keys(components).forEach((component) =>
  db.components.save(components[component]));

// var data = [{
//  title: 'IT Guide',
//  'extension': 'PDF',
//  'url': 'http://google.com',
//  'size': 2077912,
//  'updated_at': '2014-12-10T13:48:35.808Z',
//  'type' : 'file',
//  order: 0
// },
// {
//  title: 'Slack',
//  'extension': 'PDF',
//  'url': 'http://yahoo.com',
//  'size': 207912,
//  'updated_at': '2014-12-10T13:48:35.808Z',
//  'type' : 'file',
//  order: 1
// },
// {
//  title: 'Slack Tips',
//  'extension': 'PDF',
//  'url': 'http://asd.com',
//  'size': 20377912,
//  'updated_at': '2014-12-10T13:48:35.808Z',
//  'type' : 'file',
//  order: 2
// },
// {
//  title: 'Url 1',
//  'extensions': 'PDF',
//  'url': 'http://asd1.com',
//  'size': 20377912,
//  'updated_at': '2014-12-10T13:48:35.808Z',
//  'type' : 'url',
//  order: 3
// },
// {
//  title: 'Url 2',
//  'extension': 'PDF',
//  'url': 'http://asd2.com',
//  'size': 20377912,
//  'updated_at': '2014-12-10T13:48:35.808Z',
//  'type' : 'url',
//  order: 4
// },
// {
//  title: 'Url 3',
//  'extension': 'PDF',
//  'url': 'http://asd3.com',
//  'size': 20377912,
//  'updated_at': '2014-12-10T13:48:35.808Z',
//  'type' : 'url',
//  order: 5
// }];

// var sections = [{
//  _id: ObjectId(),
//  title: 'test 2',
//  template: '<p><b>In this section, you can read and learn about our set of seven essential TAB Principles - including not only what they are, but where they\'ve come from.</b></p><p></p><p>It\'s useful to think of these TAB Principles as a set, or an ecosystem. &nbsp;Each of them was created to balance and complement the others, giving us a practical and well-rounded framework for steering every aspect of our work.</p><p>Toward the end of 2014, we created and defined these Principles together, in a series of workshops that incorporated both company-wide and focused, smaller group feedback. This process has ensured that the Principles we defined are what we believe - collectively - to be the most important to our work and culture here at TAB.</p><p><b>Please note: you can download the TAB Principles in deck form directly below.</b></p><p></p>',
//  'data' : data,
//  order: 1
// }, {
//  _id: ObjectId(),
//  title: 'test 3',
//  template: '<p><b>In this section, you can read and learn about our set of seven essential TAB Principles - including not only what they are, but where they\'ve come from.</b></p><p></p><p>It\'s useful to think of these TAB Principles as a set, or an ecosystem. &nbsp;Each of them was created to balance and complement the others, giving us a practical and well-rounded framework for steering every aspect of our work.</p><p>Toward the end of 2014, we created and defined these Principles together, in a series of workshops that incorporated both company-wide and focused, smaller group feedback. This process has ensured that the Principles we defined are what we believe - collectively - to be the most important to our work and culture here at TAB.</p><p><b>Please note: you can download the TAB Principles in deck form directly below.</b></p><p></p>',
//  order: 2,
//  'data' : []
// }, {
//  _id: ObjectId(),
//  title: 'test 4',
//  template: '<p><b>In this section, you can read and learn about our set of seven essential TAB Principles - including not only what they are, but where they\'ve come from.</b></p><p></p><p>It\'s useful to think of these TAB Principles as a set, or an ecosystem. &nbsp;Each of them was created to balance and complement the others, giving us a practical and well-rounded framework for steering every aspect of our work.</p><p>Toward the end of 2014, we created and defined these Principles together, in a series of workshops that incorporated both company-wide and focused, smaller group feedback. This process has ensured that the Principles we defined are what we believe - collectively - to be the most important to our work and culture here at TAB.</p><p><b>Please note: you can download the TAB Principles in deck form directly below.</b></p><p></p>',
//  order: 3,
//  'data' : []
// }, {
//  _id: ObjectId(),
//  title: 'test 5',
//  template: '<p><b>In this section, you can read and learn about our set of seven essential TAB Principles - including not only what they are, but where they\'ve come from.</b></p><p></p><p>It\'s useful to think of these TAB Principles as a set, or an ecosystem. &nbsp;Each of them was created to balance and complement the others, giving us a practical and well-rounded framework for steering every aspect of our work.</p><p>Toward the end of 2014, we created and defined these Principles together, in a series of workshops that incorporated both company-wide and focused, smaller group feedback. This process has ensured that the Principles we defined are what we believe - collectively - to be the most important to our work and culture here at TAB.</p><p><b>Please note: you can download the TAB Principles in deck form directly below.</b></p><p></p>',
//  order: 4,
//  'data' : []
// }];

// db.categories.save([{
//      _id: ObjectId(),
//      title: 'Home',
//      sections: [{
//        _id: ObjectId(),
//        title: 'Home',
//        template: '<p><b>In this section, you can read and learn about our set of seven essential TAB Principles - including not only what they are, but where they\'ve come from.</b></p><p></p><p>It\'s useful to think of these TAB Principles as a set, or an ecosystem. &nbsp;Each of them was created to balance and complement the others, giving us a practical and well-rounded framework for steering every aspect of our work.</p><p>Toward the end of 2014, we created and defined these Principles together, in a series of workshops that incorporated both company-wide and focused, smaller group feedback. This process has ensured that the Principles we defined are what we believe - collectively - to be the most important to our work and culture here at TAB.</p><p><b>Please note: you can download the TAB Principles in deck form directly below.</b></p><p></p>',
//        order: 0,
//        'data' : []
//    }],
//      order: 0
//    },{
//       _id: ObjectId(),
//      title: 'Category 1',
//      sections: sections,
//      order: 1
//    },{
//      _id: ObjectId(),
//      title: 'Category 2',
//      sections: sections,
//      order: 2
//    },{
//      _id: ObjectId(),
//      title: 'Category 3',
//      sections: sections,
//      order: 3
//    },{
//      _id: ObjectId(),
//      title: 'Category 4',
//      sections: sections,
//      order: 4
//    }]);
