// router.js

export const router = {};
const settingUrl = '#settings';
const entryUrl = '#entry';
var entryPageElement = document.querySelector('entry-page');
const blankEntry = entryPageElement.entry;
const setting = document.querySelector("img");
const header = document.querySelector("h1");
const indexState = {'name': 'index', 'pageNum': 0, 'url': ''};
const settingState = {'name': 'setting', 'pageNum': -1, 'url': settingUrl};
const entryState = {'name': 'Entry', 'entryNum': 0, 'url': entryUrl, 'entry': blankEntry}; //include the entry number in this state
const origin = location.pathname;
//console.log(location.origin);
//console.log(origin);
/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function(state, newPost, replace) {
  if(replace){
    if(state.name == 'setting'){
      header.innerHTML = 'Settings';
      document.body.classList.add('settings');
      document.body.classList.remove('single-entry');
      history.replaceState(settingState, 'settings', settingUrl);
    }else if(state.name == 'index'){
      document.body.classList.remove('settings');
      document.body.classList.remove('single-entry');
      history.replaceState(indexState, 'index', location.origin + origin);
      location.reload();
      let entryImg = entryPageElement.shadowRoot.querySelector('img');
      let entryAudio = entryPageElement.shadowRoot.querySelector('audio');
      if(entryImg){
        entryImg.parentElement.removeChild(entryImg);
      }
      if(entryAudio){
        entryAudio.parentElement.removeChild(entryAudio);
      }
    }else{
      header.innerHTML = 'Entry ' + state.entryNum;
      if(!document.querySelector('entry-page').shadowRoot.querySelector('img')){
        document.querySelector('entry-page').entry = newPost;
      }
      // let entryAudio = entryPageElement.shadowRoot.querySelector('audio');
      // if(entryImg){
      //   entryImg.parentElement.appendChild(entryImg);
      // }
      // if(entryAudio){
      //   entryAudio.parentElement.removeChild(entryAudio);
      // }
      document.body.classList.remove('settings');
      document.body.classList.add('single-entry');
      history.replaceState(entryState, 'entry', entryUrl + state.entryNum);
    }
  }else{
    if(state.name == 'setting'){
      header.innerHTML = 'Settings';
      document.body.classList.add('settings');
      document.body.classList.remove('single-entry');
      history.pushState(settingState, 'settings', settingUrl);
      //location = location.origin + settingUrl;
    }else if(state.name == 'index'){
      document.body.classList.remove('settings');
      document.body.classList.remove('single-entry');
      history.pushState(indexState, 'index', location.origin + origin);

      let entryImg = entryPageElement.shadowRoot.querySelector('img');
      let entryAudio = entryPageElement.shadowRoot.querySelector('audio');
      if(entryImg){
        entryImg.parentElement.removeChild(entryImg);
      }
      if(entryAudio){
        entryAudio.parentElement.removeChild(entryAudio);
      }
    }else{
      entryPageElement.entry = newPost.entry;
      let i = 0;
      for(i; i < document.querySelector('main').childElementCount; i ++){
        if(document.querySelector('main').children[i] == newPost){
          i ++;
          break;
        }
      }
      header.innerHTML = 'Entry ' + i;
      document.body.classList.add('single-entry');
      entryState.entryNum = i;
      entryState.entry = newPost.entry;
      history.pushState(entryState, 'entry', entryUrl + i);
    }
  }
 
  /**
   * - There are three states that your SPA app will have
   *    1. The home page
   *    2. The entry page (showing one individual entry)
   *    3. The settings page (currently blank, no actual settings here, just a placeholder where a real settings page would go)
   * 
   * - If you look at the CSS, we have 2 classes you can add to the body element to help change states, "settings" and "single-entry"
   * - Changing states will require more than just changing these classes, for example the settings page requires you to change the title to "Settings"
   * - And each individual entry the title changes to "Entry #" based on it's number in the entry order
   *
   * - When changing states, make sure the back and forward buttons work. You can use hash URLs (e.g. https://someurl.com/#settings) when changing states
   *   to make things easier.
   * - Similarly, when viewing an individual entry, a hashed URL might look like https://someurl.com/#entry3
   * 
   * - Some tips:
   *    1. Push a new state object to the history object using history.pushState() 
   *    2. look up the documentation for how to use pushState() when you try it
   *    3. look up the documentation for the "popstate" event listener (fires only on back button), useful in your script.js file
   *    4. For each <journal-entry> element, you can grab the JSON version of its info with .entry (e.g. someJournalEntryElement.entry)
   *       a. This is useful when viewing a single entry. You may notice an <entry-page> element in the HTML, this is the element that is displayed when the
   *          .single-entry class is applied to the body. You can populate this element by using .entry similarly. So if I wanted to grab a specific <journal-entry>
   *          and populate it's info into the <entry-page>, I would simply use an assignment of entryPageElement.entry = journalEntryElement.entry
   *       b. Clearing the <entry-page> element of its previous data can be a bit tricky, it might be useful to just delete it and insert a new blank one 
   *          in the same spot each time. Just a thought.
   *
   * - Answers to some questions you may have:
   *    1. You may add as many helper functions in this file as you like
   *    2. You may modify the parameters of setState() as much as you like
   */

}
