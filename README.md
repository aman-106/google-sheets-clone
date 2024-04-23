This is a Spreadsheet Application using Next.js [Next.js](https://nextjs.org/) project

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

### High-Level Design Summary: Spreadsheet Application

#### Overview

The Spreadsheet Application is designed to provide users with a user-friendly interface for organizing and manipulating data in a tabular format, commonly referred to as a spreadsheet. The application allows users to perform various operations such as entering data, applying formulas, and performing calculations.

#### Key Components

1. **User Interface (UI):**
   - The UI presents a grid-based layout resembling a traditional spreadsheet.
   - Users can interact with cells to input data, apply formulas, and navigate through the grid.
   - Features include selection of cells, editing of cell contents, and formula bar for entering formulas.

2. **Data Management:**
   - The application manages data in a two-dimensional array structure representing the spreadsheet grid.
   - Each cell in the grid is represented by an object containing metadata such as value, formula, and dependencies.

3. **Formula Parsing and Calculation:**
   - The application supports basic spreadsheet formulas using a formula parser.
   - Formulas are parsed to identify cell references and dependencies.
   - Formula calculations are performed dynamically based on cell dependencies and updates.

4. **Event Handling and State Management:**
   - Event handling mechanisms capture user interactions such as cell selection, input changes, and formula execution.
   - State management ensures that changes to the grid data trigger appropriate updates and recalculations.

5. **Grid Manager:**
   - The Grid Manager module encapsulates grid-related operations and manages cell updates.
   - It provides functions for adding, updating, and querying cell data within the grid.

#### Architecture Overview

- **Frontend (Client-Side):**
  - The frontend is implemented using a modern JavaScript framework (e.g., React) for building interactive UI components.
  - Components are structured to handle user inputs, display grid data, and facilitate data flow between UI and backend services.


#### Interaction Flow

1. **User Interaction:**
   - Users interact with the application by selecting cells, entering data, and applying formulas via the UI.
   - Input events trigger data updates and formula evaluations.

2. **Data Processing:**
   - Input data undergoes validation and parsing to determine if it is a value or a formula.
   - Formulas are evaluated by the formula parser to compute cell values based on dependencies.

3. **State Management:**
   - Changes in the grid state are managed using state management techniques (e.g., React state or Redux).
   - State updates trigger re-renders of relevant UI components to reflect changes in the spreadsheet.

### Main Components Overview

#### 1. **UserInputContext**

- **Purpose:** 
  - The `UserInputContext` component manages user input related to the spreadsheet application.
  - It encapsulates state and functions for handling user interactions such as input changes, formula validation, and saving cell values.

- **Key Responsibilities:**
  - **State Management:** Maintains state variables for user input (`userInput`) and formula status (`isFormula`).
  - **Event Handling:** Provides functions (`handleInputChange`, `handleSaveValue`, `handleOnBlur`) to manage user input events.
  - **Context API:** Exposes a context provider to share state and functions with child components.

- **Usage:**
  - Used within the application to track and process user input within the spreadsheet UI.
  - Enables seamless integration of user interactions with data manipulation and formula execution.

#### 2. **GridManager**

- **Purpose:**
  - The `GridManager` module is responsible for managing operations and state related to the spreadsheet grid.

- **Key Responsibilities:**
  - **Data Management:** Handles operations to add, update, and retrieve data within the spreadsheet grid.
  - **Cell Management:** Manages individual cell data, including values, formulas, and dependencies.
  - **Cell Change Handling:** Implements logic for handling cell updates, triggering re-evaluation of dependent cells when values change.

- **Functionality:**
  - Provides utility functions (`getCellNode`, `handleCellChangeManager`) for grid operations and cell management.
  - Supports validation, parsing, and execution of formulas within the grid context.

- **Integration:**
  - Integrated with other components to facilitate data flow and update propagation within the spreadsheet application.
  - Enables efficient grid manipulation and formula computation based on user interactions and data changes.

---

These main components (`UserInputContext` and `GridManager`) play essential roles in enabling user interaction and managing data within the spreadsheet application. They encapsulate specific functionalities and facilitate the seamless operation of the overall system, ensuring a responsive and intuitive user experience. Integration of these components supports the core operations required for spreadsheet manipulation, including input handling, formula execution, and grid management.  

#### Conclusion

The Spreadsheet Application employs a modular and scalable architecture to enable efficient data management, formula processing, and user interaction. By leveraging frontend and backend technologies, the application delivers a robust and intuitive user experience for spreadsheet manipulation.

---

This high-level design summary provides an overview of the application's structure, components, and interactions, highlighting key aspects of the system's architecture and functionality. Specific implementation details and technologies may vary based on the requirements and scope of the actual application.