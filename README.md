# FilterWidget

FilterWidget is a lightweight, customizable JavaScript component that provides an interactive filtering interface for web applications. It allows users to apply multiple filters and search criteria to refine data sets.

## Features

- Search functionality
- Category-based filtering
- Dynamic filter summary
- Responsive design


## Usage

1) Create a container element in your HTML:
htmlCopy<div id="filterWidget"></div>

2) Initialize the FilterWidget in your JavaScript:
```
javascriptCopyconst filterOptions = [
  { field: 'category', label: 'Category', values: ['Option1', 'Option2', 'Option3'] },
  { field: 'status', label: 'Status', values: ['Active', 'Inactive', 'Pending'] }
];

const myFilterWidget = new FilterWidget('filterWidget', filterOptions, (filters) => {
  console.log('Filters updated:', filters);
  // Handle filter updates here
});
```

## API
### Constructor:
```
new FilterWidget(containerId, options, callback)
```

containerId: ID of the container element
options: Array of filter options
callback: Function to be called when filters change


### Methods
render() - 
bindEvents() - binds all events with addEventListener to other callback functions
handleClick(e) - handles all the click events.
handleKeypress(e) - Handle the searchfilter changes
handleCategoryChange(e) - Handles the Catergory changes. 
handleValueChange(e) - It disables the 'Add' button if the selected and enables it otherwise
addSearchFilter() - Add search filter to list of filters.
addFilter() - Adds a category filter when the user selects a category and value. 
removeFilter(index) - Remove specific filters or all filters
clearAllFilters() - remove all filters
updateFilterSummary() - updates the summary of filters
triggerCallback() - trigger the call back function. 
get() & set() - Allow external access to get or set the current filters
destroy() - Cleans up the widget by removing event listeners and resetting the UI.