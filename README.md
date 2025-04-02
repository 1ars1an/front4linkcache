##### introduction

##### scope

- **library-style link bookmarks**
  - build grid (position of elements define the style)
  - fetch grid data
  - **each link is either classic media player style - expanding or a flipbook**
    - build link card
    - populate the ui with data
    - crud file, folder and grid operations
    - drag-drop functionality
  - **interactive animations such as pulling out folder**
- **tag system for both folders and files**
  - add, edit and remove tags
- **public, private link cache**
  - authentication system
    - login, register pages
    - api calls + functionality
- **ai summarization cards for weekly links**
  - how do we leverage llms to action this?
- activity dashboard
  - what options are selected here.
- **import/export ai links**
  - import list from json or csv format

##### to-do's

<!--- 02.04.25 -->

- [] **login, register pages**

  - [] login form
    - [x] form setup
    - [] handle form errors from backend
    - [x] redirect to index
  - [] register form
    - [x] form setup
    - [] handle form errors from backend
    - [] redirect to index with created session? look into how this works
  - [x] auth context + provider

    - [x] login, register calls

- [] **logout action ui**

  - [] logout api call

- [] **public, private link cache**

  - [x] authenticated routes
  - [] select public / private

- out of scope:
  - spotify/youtube embedded components for relevant links

##### workspace
