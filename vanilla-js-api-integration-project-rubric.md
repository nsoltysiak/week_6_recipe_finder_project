# Major Project #2

# Vanilla JS API Integration Project - Assessment Rubric

## Project Overview

This rubric evaluates the Vanilla JS API Integration Project based on API consumption, asynchronous JavaScript patterns, error handling, data processing, and user interface implementation covered in modules 039-045.

Note: Consider using this as a starting point for the API(s) you use https://github.com/public-apis/public-apis

### Project Options

**Option A: Stock Market Lookup App**  
Build an application that fetches stock data via an API, displays with search functionality, allows for favorites tracking (using localStorage), and provides a way to list and filter multiple stocks if there are multiple matches during search.

**Option B: Recipe Finder App**  
Create a user-friendly recipe finder app that allows users to discover recipes using an external API. It includes features for searching, saving favorite recipes in local storage, and displaying detailed recipe information.

---

## **Project-Specific Requirements**

### **Option A - Stock Market Lookup App Must Include:**

- [ ] **Stock Search Functionality** - Users can search for stocks by symbol or company name
- [ ] **Real-Time Price Display** - Shows current stock prices, daily change, and percentage change
- [ ] Users can enter how many shares of a stock they own and this is stored in local storage and track performance (shows total value of stocks owned)
- [ ] **Portfolio Tracking** - Allow users to add stocks to watchlist
- [ ] **Optional - Picker Modal** - User can pick from multiple items when there is a partial match
- [ ] **Optional - More Stock Data** - Volume, High, Low, Open, or other data available

### **Option B - Recipe Finder App Must Include:**

- [ ] **Recipe Search** - Users can search recipes by different types (i.e. ingredients, cuisine type, or dietary restrictions)
- [ ] **Detailed Recipe View** - Shows ingredients list, cooking instructions, prep/cook time, and servings
- [ ] **Favorites System** - Save favorite recipes to localStorage for quick access
- [ ] **Nutritional Information** - Display calorie count and basic nutritional data when provided by API
- [ ] **Optional - Images** - Adds images to recipes
- [ ] **Optional - Ingredient Substitution** - Suggest alternatives for common ingredients when available

---

## **Must Have (Required for Passing):**

## Files

- [ ] Separate HTML, CSS, and JS created

## Security

- [ ] Any API tokens needed are not commited or included in code base

### **API Integration and HTTP Fundamentals**

- [ ] **API Connection** - Successfully connects to 1-3 different public APIs using Fetch API
- [ ] **HTTP Method Usage** - Uses appropriate HTTP methods (GET, POST, PUT, DELETE) for different operations
- [ ] **API Endpoint Structure** - Demonstrates understanding of URL structures and endpoints
- [ ] **Request Configuration** - Configures fetch requests with custom headers and parameters when needed
- [ ] **Query Parameters** - Properly handles and passes query parameters to API endpoints when needed

### **Asynchronous JavaScript Implementation**

- [ ] **Async/Await Syntax or .then()** - Uses async/await or .then() pattern consistently for all API calls
- [ ] **Sequential Operations** - Implements sequential async operations where one result depends on another when needed
- [ ] **Error Handling** - Implements try-catch blocks for async functions with meaningful error messages

### **JSON Data Processing**

- [ ] **JSON Parsing** - Successfully parses JSON responses into JavaScript objects when needed
- [ ] **Array Processing** - Handles arrays within API responses and processes multiple data items when needed
- [ ] **Data Transformation** - Transforms and formats API data for display purposes

### **Error Handling and Resilience**

- [ ] **HTTP Status Validation** - Checks response status codes before processing data
- [ ] **Network Error Management** - Handles network connectivity failures and timeout errors
- [ ] **User-Friendly Messaging** - Displays appropriate error messages to users

### **User Interface and Experience**

- [ ] **Dynamic Content Display** - Creates dynamic HTML elements to display API data
- [ ] **User Input Handling** - Processes user input and validates data before API calls
- [ ] **Responsive Design** - Interface works properly on different screen sizes
- [ ] **Interactive Elements** - User interactions trigger appropriate API calls
- [ ] **Search and Filtering** - Provides search functionality for API data as required by both project options

### **Data Persistence and Authentication**

- [ ] **Local Storage Integration** - Uses localStorage for favorites tracking and user preferences as required by both project options

---

### **Could Have (Bonus Points):**

### **Advanced API Integration**

- [ ] **Multiple HTTP Methods** - Uses POST, PUT, DELETE methods beyond basic GET requests
- [ ] **API Documentation Usage** - Demonstrates effective use of API documentation for implementation

### **Enhanced Data Processing**

- [ ] **Concurrent Operations** - Uses Promise.all() for independent simultaneous API calls
- [ ] **Complex Data Transformation** - Creates aggregate views and computed data from multiple sources

### **Professional Features**

- [ ] **Loading States** - Implements loading indicators during API operations
- [ ] **Advanced Filtering** - Provides complex filtering, sorting, and categorization beyond basic search

### **Project Quality and Deployment**

- [ ] **Code Organization** - Well-structured, reusable functions with clear separation of concerns
- [ ] **Documentation** - Comprehensive README with setup instructions and API usage

---

## Submission Requirements

**Due Date:** September 28, 2025 (start of major project #3)
**Submission Method:** Github Repo link on #projects channel
