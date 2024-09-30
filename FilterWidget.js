class FilterWidget {
  constructor(containerId, options, callback) {
      this.container = document.getElementById(containerId);
      this.options = options;
      this.callback = callback;
      this.filters = [];
      this.render();
      this.bindEvents();
  }

  render() {
        const filterCategory = this.container.querySelector('#filterCategory');
        const optionsHtml = this.options.map(option => `<option value="${option.field}">${option.label}</option>`).join('');
        filterCategory.innerHTML += optionsHtml;

        // Initialize filter summary
        this.updateFilterSummary();
  }

  bindEvents() {
      this.handleClick = this.handleClick.bind(this);
      this.handleKeypress = this.handleKeypress.bind(this);
      this.handleCategoryChange = this.handleCategoryChange.bind(this);
      this.handleValueChange = this.handleValueChange.bind(this);

      this.container.addEventListener('click', this.handleClick);
      this.container.querySelector('#searchInput').addEventListener('keypress', this.handleKeypress);
      this.container.querySelector('#filterCategory').addEventListener('change', this.handleCategoryChange);
      this.container.querySelector('#filterValue').addEventListener('change', this.handleValueChange);
  }

  handleClick(e) {
    if (e.target.id === 'searchButton') this.addSearchFilter();
    if (e.target.id === 'addFilterButton') this.addFilter();
    if (e.target.id === 'clearAllButton') this.clearAllFilters();
    if (e.target.classList.contains('remove-filter')) this.removeFilter(parseInt(e.target.dataset.index));
  }

  handleKeypress(e) {
    if (e.key === 'Enter') this.addSearchFilter();
  }

  handleCategoryChange(e) {
    const filterValue = this.container.querySelector('#filterValue');
    const addFilterButton = this.container.querySelector('#addFilterButton');
    
    if (e.target.value === 'Add Filter') {
        filterValue.disabled = true;
        filterValue.innerHTML = '<option selected>Select value</option>';
        addFilterButton.disabled = true;
    } else {
        const selectedOption = this.options.find(option => option.field === e.target.value);
        const valueOptions = selectedOption.values.map(value => `<option value="${value}">${value}</option>`).join('');
        filterValue.disabled = false;
        filterValue.innerHTML = `<option selected>Select value</option>${valueOptions}`;
    }
  }

  handleValueChange(e) {
    this.container.querySelector('#addFilterButton').disabled = e.target.value === 'Select value';
  }

  addSearchFilter() {
      const searchInput = this.container.querySelector('#searchInput');
      const searchValue = searchInput.value.trim();
      if (searchValue) {
          this.filters.push({ type: 'search', value: searchValue });
          this.updateFilterSummary();
          this.triggerCallback();
          searchInput.value = '';
      }
  }

  addFilter() {
      const category = this.container.querySelector('#filterCategory').value;
      const value = this.container.querySelector('#filterValue').value;
      if (category !== 'Add Filter' && value !== 'Select value') {
          this.filters.push({ type: 'category', field: category, value: value });
          this.updateFilterSummary();
          this.triggerCallback();
          this.container.querySelector('#filterCategory').value = 'Add Filter';
          this.container.querySelector('#filterCategory').dispatchEvent(new Event('change'));
      }
  }

  removeFilter(index) {
      this.filters.splice(index, 1);
      this.updateFilterSummary();
      this.triggerCallback();
  }

  clearAllFilters() {
      this.filters = [];
      this.updateFilterSummary();
      this.triggerCallback();
  }

  updateFilterSummary() {
      const summary = this.filters.map((filter, index) => {
          const label = filter.type === 'search' ? 'Search' : this.options.find(option => option.field === filter.field).label;
          return `<span class="filter-item">${label}: ${filter.value} <span class="remove-filter" data-index="${index}">&times;</span></span>`;
      }).join('');
      this.container.querySelector('.filter-summary').innerHTML = summary;
  }

  triggerCallback() {
      this.callback(this.filters);
  }

  get() {
      return this.filters;
  }

  set(newFilters) {
      this.filters = newFilters;
      this.updateFilterSummary();
      this.triggerCallback();
  }

  destroy() {
    // Remove event listeners
    this.container.removeEventListener('click', this.handleClick);
    this.container.querySelector('#searchInput').removeEventListener('keypress', this.handleKeypress);
    this.container.querySelector('#filterCategory').removeEventListener('change', this.handleCategoryChange);
    this.container.querySelector('#filterValue').removeEventListener('change', this.handleValueChange);

    // Clear the filter summary
    this.container.querySelector('.filter-summary').innerHTML = '';

    // Reset select elements
    this.container.querySelector('#filterCategory').innerHTML = '<option selected>Add Filter</option>';
    this.container.querySelector('#filterValue').innerHTML = '<option selected>Select value</option>';

    // Clear filters
    this.filters = [];
  }
}