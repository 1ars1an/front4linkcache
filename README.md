- ## introduction

- ## scope

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
  - **activity dashboard + profile page**
    - what options are selected here.
  - **import/export ai links**
    - import list from json or csv format

- ## to-do's

  - **design**

    - [] color theme
    - [] overarching design
    - [] redesign auth forms

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

  - [] **logout**

    - [x] logout api call
    - [] logout action ui

  - [] **public, private link cache**

    - [x] authenticated routes
    - [] select public / private

  - [] **library ui**

    - [x] grids + shelves
    - [x] query to retrieve user folders data
    - [x] popup for mini-folder data

    - **toolbar ui**
      - [x] figure out why CSRF tokens aren't included in the request
      - [x] create new folder
        - [x] interaction component
        - [x] handling component
        - [x] handling code
          - [x] useQuery hook
          - [x] api request
        - [x] design? keeping shadcn base for now
      - [] create new link
      - [x] pagination

  - [] **folder ui**

    - [x] query to retrieve folder data
    - [] filter cards
      - [] sorting options?
      - [] tags
    - [] add composable styles

    - [] **link container ui**

      - [x] base style
      - [] container style
      - [] composable styles applied

    - [] **link ui**
      - [] composable styles applied
      - [x] clipboard functionality
      - [x] base ui

  - [] **profile page, activity dashboard**
    - []

- ## workspace

  - 10.05

    - refactor error handling, auth validity check
    - retrieve user folder data
    - library grid v1
    - library grid design v1

  - 11.05

    - popup for folder containing top 5 links: design + ui
    - bunch of stuff, i need to categorize this better lol

  - 14.05

    - working on the ui for displaying links, link container, link block and link card v1

  - 15.05
    - toolbar ui

- ## augments

  - out of scope:
    - spotify/youtube embedded components for relevant links

- ## decision space
