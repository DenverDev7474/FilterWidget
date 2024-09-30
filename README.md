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

- **containerId**: The ID of the HTML container element where the FilterWidget will be rendered.

- **options**: An array of filter options, with each option defining:
  - `field`: The name of the filter field (e.g., "category", "status").
  - `label`: A user-friendly label for the filter.
  - `values`: An array of possible values for the filter.

- **callback**: A function to be called whenever filters are updated. The current filter state is passed as an argument to this function.

### Methods

- **render()**: Renders the list of filters in the widget interface.

- **bindEvents()**: Binds all events using `addEventListener`, connecting them to the corresponding callback functions.

- **handleClick(e)**: Handles all click events related to the filter interactions.

- **handleKeypress(e)**: Handles changes in the search filter when users type into the search input.

- **handleCategoryChange(e)**: Manages changes in the category selection when a user chooses a different category.

- **handleValueChange(e)**: Enables or disables the 'Add' button based on the validity of the selected value.

- **addSearchFilter()**: Adds the current search filter to the list of active filters.

- **addFilter()**: Adds a category filter when a user selects both a category and a corresponding value.

- **removeFilter(index)**: Removes a specific filter by its index, or clears all filters if no index is specified.

- **clearAllFilters()**: Removes all active filters.

- **updateFilterSummary()**: Updates the summary display to reflect the currently active filters.

- **triggerCallback()**: Triggers the callback function and passes the updated filters to the parent application.

- **get() & set()**: Provides external access to retrieve or set the current filters.

- **destroy()**: Cleans up the widget by removing all event listeners and resetting the UI to its original state.
