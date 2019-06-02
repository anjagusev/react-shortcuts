# Shortcuts

[See Live Demo Here](https://shortcuts.anjagusev.com)

**Description:** A simple react application that takes in a JSON file consisting of operating systems, their applications and each application's associated keyboard shortcuts and outputs them in a nice view, with functionality to filter shortcuts per application and operating system.

I made this small project to practice my CSS Grid, Sass, Sketch, and React skills while making something useful for myself. I am constantly switching between Windows and macOS environments so I sometimes forget keyboard shortcuts.

It takes in a JSON file in the following format:

```
 {
    "os":"MacOS",
    "title": "Apple",
    "commands": [
      { "action": "Switch Windows", "keys": ["⌘", "Tab"] },
      { "action": "Maximize Window", "keys": ["⌘", "Option", "="] },
      { "action": "Unminimize Window", "keys": ["⌘", "Tab", "Option"] },
      { "action": "Switch App Window", "keys": ["⌘", "`"] }
    ]
  },
  {
    "os":"Windows",
    "title": "Finder",
    "commands": [
      {
        "action": "Rename",
        "keys": ["⏎"]
      }
    ]
  },
```

Preview:
![](Shortcuts/C1EC83F2-9795-49A3-ADEC-928E6DAB57EC.png)

**Tabs**: The tabs are dynamically added based on the distinct “os” values in the JSON file.

**Routing**: You can navigate to each operating system’s shortcuts by clicking on the tab or navigating to the `/[OSNAME]` . For example `/MacOS` will display all the Mac shortcuts.

**Known Issues**:

Each table’s size depends on the number of shortcuts associated with each application.

To handle this, I programmatically added CSS classes which specify how many rows each table should span, based on the number of shortcuts they contain. The class naming convention is `.v3`. V for vertical and 3 for the number of rows to span.

For example, the Finder table in the above screenshot has a CSS class of `.v3` because it only contains 1 keyboard shortcut. This means that the table needs to span at least 3 grid items, so there is enough room for the application title, the table headers and the shortcut itself.

However, I found that for classes `.v6` and above, they needed to span 1 less. So `.v6` is actually `.v6 { grid-row: span 5;}`. If you span 6, there is a lot of extra whitespace.

Any suggestions on how to improve this code are more than welcome!
