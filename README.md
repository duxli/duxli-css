# Duxli CSS

Duxli CSS provides a quick, yet customizable starting point for CSS libraries.
It is intended to be fast, minimal, and flexible.

## Features

Below are the features planned for this project.

- [ ] Zero JavaScript
- [ ] CSS variables for all design tokens
- [ ] Light/dark mode based on user preference (using media queries)
- [ ] Automatic styling applied to native elements

## Concepts

Duxli CSS is built around several core concepts.

### Themes should be fully customizable.

Theme customization is a requirement for any styling library.
Each project has different styling requirements, so libraries need to support this.

However, color customization is not enough.
A good library uses [design tokens][] for spacing, typography, animations, etc.

The developer should have full control over the look and feel of their app.

### Libraries must be easy to use

When a developer uses a library, they're using it to reduce the work they need to do themselves.
The more work that a library requires a developer to do, the less valuable that library is.

Setting up Sass (or any pre-processor) shouldn't be a requirement for using a CSS library.
For styling libraries, the developer may just want to quickly add styles to a project with vanilla HTML.

Built and minified CSS should be provided so that they can use the library immediately.
The developer should be free to customize design tokens through CSS variables so that a pre-processor is not needed.

### CSS libraries shouldn't require JavaScript

JavaScript is often necessary for component libraries.
However, styling libraries should focus on styles.
Let component libraries focus on components.

Duxli CSS is a CSS-only library.
In the future, a separate web component library will likely be added.

### Styles are for the end user

Why do we style websites?
We style websites so that the user enjoys using the website and comes back.

Styling is primarily for the user.
We use it to communicate the brand and to improve the website's usability.

A good styling library has the end user in mind.
Mobile first is a good start.
[Most users access websites from their phone.][mobile_stats]

#### Example: Computer Vision Syndrome

Anyone who has experienced computer vision syndrome knows that dark theme is an essential feature.
Light-theme websites can be physically painful to use.

A styling library that uses the `prefers-color-scheme` media query
allows the user to decide how they want to view content.

[design tokens]: https://uxdesign.cc/design-tokens-for-dummies-8acebf010d71
[mobile_stats]: https://www.statista.com/statistics/277125/share-of-website-traffic-coming-from-mobile-devices/
