## In the app directory, nested folders are normally mapped to URL paths. However, you can mark a folder as a Route Group to prevent the folder from being included in the route's URL path.

## This allows you to organize your route segments and project files into logical groups without affecting the URL path structure.

### A route group can be created by wrapping a folder's name in parenthesis: (folderName)

### Difference between template and layout is template render every time, the layout going to render when the application only load

## Creating a page

A page is UI that is rendered on a specific route. To create a page, add a page file inside the app directory and default export a React component.

## Creating a layout

A layout is UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not rerender.

You can define a layout by default exporting a React component from a layout file. The component should accept a children prop which can be a page or another layout.
