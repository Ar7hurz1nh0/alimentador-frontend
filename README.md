## Atention!!
This is a simple preact app with a simple python api backend. It's not meant to be used in production, but it can be used as a starting point for a production app. With that said, here's the rest of the documentation

# What is this?
This is a framework that searches being as lightweight as possible, improving the user experience by maintaining the state between pages, while being easy to the developer to maintain and develop new pages

# How does routes work
It uses system file routing, inside the templates folder.
- The folder `pages` is for the frontend or `.jsx` files.
- The folder `api` is for the backend/api or `.py` files.

# Currently known bugs
- The react in the `.jsx` isn't very... reactive. This means that preact doens't re-render the page when something changes. Pretty static for something called after reaction
- This is it for now I think. But if you found one, you can [create a new issue](https://github.com/Ar7hurz1nh0/fract/issues/new)
