## components

component structure

- /NamedComponent
  
  - index.js
  - Named.jsx
  - namedStyles.less

reusable components should be reflected via index.js

styles are optional and must be reflected via index.less for inclusion.

please do not import less files into your components, they are processed at build-time and translated to css.  (see 'scripts' in package.json for more detail)
