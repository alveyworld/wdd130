/* Add Course Specific JavaScript Below */
const baseUrl = 'http://127.0.0.1:5501/';
const localUrl = '/';
const menu = {
  resources: [
    { url: 'resources/syllabus.html', name: 'Syllabus' }
  ],
  activites: [
    { url: 'activities/week01/software-setup.html', name: 'Software Setup', week: 1 },
    { url: 'activities/week01/folder-setup.html', name: 'Folder Setup', week: 1 }
  ]
};

function getView(url) {
  url = baseUrl + url;
  fetch(url).then(response => {
    response.text().then(partial => {
      var tmp = document.implementation.createHTMLDocument();
      tmp.body.innerHTML = partial;
      const images = tmp.querySelectorAll('img');
      images.forEach(image => {
        const imgParts = image.src.split('/');
        image.src = baseUrl + 'images/' + imgParts[imgParts.length - 1];
      });
      //tmp.querySelector('main');
      // console.dir(tmp.querySelector('main'));
      const container = document.getElementById('partialContainer');
      container.innerHTML = '';
      container.append(tmp.querySelector('main'));

      Prism.highlightAll();
      document.querySelector('.navToggle').checked = false;
    });
  });
}
getView('resources/syllabus.html');

function buildMenu() {
  const actList = document.getElementById('activitiesList');
  const resList = document.getElementById('resourcesList');

  //build Activities list first
  menu.activites.forEach(link => {
    let item = document.createElement('li');
    let anchor = document.createElement('a');
    anchor.href = link.url;
    anchor.innerHTML = `${link.name} (Week: ${link.week})`;
    anchor.addEventListener('click', e => {
      e.preventDefault();
      getView(link.url);
    });
    //item.innerHTML = `<a href="${link.url}" onclick="getView('${link.url}')">${link.name} (Week: ${link.week})</a>`;
    item.appendChild(anchor);
    actList.appendChild(item);
  });
  menu.resources.forEach(link => {
    let item = document.createElement('li');
    let anchor = document.createElement('a');
    anchor.href = link.url;
    anchor.innerHTML = link.name;
    anchor.addEventListener('click', e => {
      e.preventDefault();
      getView(link.url);
    });

    //item.innerHTML = `<a href="${link.url}">${link.name}</a>`;
    item.appendChild(anchor);
    resList.appendChild(item);
  });
}
buildMenu();

// document.getElementById('one').addEventListener('click', e => {
//   document.querySelector('main').scrollBy({
//     top: 0, // could be negative value
//     left: document.body.scrollWidth,
//     behavior: 'smooth'
//   });
// });
