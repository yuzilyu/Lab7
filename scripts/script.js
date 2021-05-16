// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
const setting = document.querySelector("img");
const header = document.querySelector("h1");
const settingUrl = '#settings';
const entryUrl = '#entry';
const indexState = {'name': 'index', 'pageNum': 0, 'url': ''};
const settingState = {'name': 'setting', 'pageNum': -1, 'url': settingUrl};
const entryState = {'name': 'Entry', 'entryNum': 0, 'url': entryUrl}; 

// Make sure you register your service worker here too

setting.addEventListener('click', () => {
  setState(settingState);
});

header.addEventListener('click', () => {
  header.innerHTML = 'Journal Entries';
  setState(indexState);
  
});

window.addEventListener('popstate', (event) => {
  console.log(event.state);
  if(event.state == null){
    location = location.origin;
  }else{
    setState(event.state, event.state.entry, true);
  }
  
    // console.log(window.location);
    // if(event.state == null || event.state.name == 'index'){
    //   location = location.origin;
    // }else if(event.state.name == 'setting'){
    //   location = location.origin + 'settings';
    //   location.reload;
    // }else{
    //   console.log('popping ' + event.state.name);
    //   setState(event.state.name);     // the num of the entry
    // }
 })
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.addEventListener('click', () => {
          router.setState(entryState, newPost);
        });
        document.querySelector('main').appendChild(newPost);
      });
    });
});
