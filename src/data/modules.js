const moduleInfo = [
  ['Software Testing Fundamentals', 'Build a clear mental model of quality, testing, and the people involved.', '◈', 'blue', ['What is Software Testing?', 'Why is Testing Important?', 'Verification vs Validation', 'Error, Bug, Defect and Failure', 'QA vs QC', 'Tester vs Developer']],
  ['SDLC & STLC', 'Follow how software moves from an idea through development and testing to release.', '⌁', 'violet', ['SDLC', 'Waterfall Model', 'Agile Model', 'V-Model', 'Software Testing Life Cycle', 'SDLC vs STLC']],
  ['Types of Testing', 'Learn the different ways testers examine behavior, code, and quality.', '◉', 'cyan', ['Manual Testing', 'Automation Testing', 'Functional Testing', 'Non-functional Testing', 'Black-box Testing', 'White-box Testing', 'Gray-box Testing']],
  ['Levels of Testing', 'See how checks fit together, from one small unit to user acceptance.', '▤', 'orange', ['Unit Testing', 'Integration Testing', 'System Testing', 'Acceptance Testing', 'UAT', 'Alpha Testing', 'Beta Testing']],
  ['Important Testing Types', 'Choose the right check for a change, release, or uncertain behavior.', '✳', 'pink', ['Smoke Testing', 'Sanity Testing', 'Regression Testing', 'Retesting', 'Exploratory Testing', 'Ad-hoc Testing', 'End-to-End Testing', 'Compatibility Testing']],
  ['Test Design Techniques', 'Turn requirements into a small, effective set of test inputs.', '⌗', 'green', ['Equivalence Partitioning', 'Boundary Value Analysis', 'Decision Table Testing', 'State Transition Testing', 'Use Case Testing']],
  ['Non-Functional Testing', 'Evaluate speed, safety, ease of use, and resilience.', '◌', 'yellow', ['Performance Testing', 'Load Testing', 'Stress Testing', 'Security Testing', 'Usability Testing', 'Reliability Testing', 'Scalability Testing']],
  ['Test Cases & Test Scenarios', 'Write clear checks that another person can repeat and verify.', '☷', 'blue', ['Test Scenario', 'Test Case', 'Test Case Structure', 'Preconditions', 'Test Steps', 'Test Data', 'Expected Result', 'Actual Result', 'Positive Testing', 'Negative Testing']],
  ['Bug & Defect Management', 'Record, reproduce, prioritize, and follow defects to resolution.', '⚑', 'red', ['What is a Bug?', 'Bug Life Cycle', 'Severity vs Priority', 'Bug Report', 'Reproducing Bugs', 'Defect Statuses']],
  ['Agile Testing', 'Work with a team to deliver small, tested increments of value.', '⟳', 'violet', ['Agile', 'Scrum', 'Sprint', 'Product Backlog', 'User Story', 'Acceptance Criteria', 'Daily Stand-up', 'Sprint Planning', 'Sprint Review', 'Retrospective', 'Tester Role in Agile']],
  ['API Testing', 'Check how services exchange data, handle requests, and report outcomes.', '⇄', 'cyan', ['What is an API?', 'REST API', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HTTP Status Codes', 'Headers', 'Request Body', 'Response Body', 'JSON', 'API Authentication', 'Postman Basics']],
  ['Database Testing', 'Check stored data, queries, relationships, and changes safely.', '▦', 'green', ['Database Basics', 'SQL Basics', 'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'WHERE', 'JOIN', 'Primary Key', 'Foreign Key', 'CRUD Testing', 'Data Validation']],
  ['Automation Testing', 'Learn what to automate and the building blocks of browser checks.', '⚙', 'orange', ['What is Automation Testing?', 'Manual vs Automation Testing', 'Advantages and Disadvantages', 'Automation Framework', 'Selenium Basics', 'Locators', 'Web Elements', 'Assertions', 'Waits', 'Page Object Model']],
  ['Python Testing', 'Use Python tools and patterns to write maintainable automated checks.', '⌘', 'yellow', ['unittest', 'pytest', 'Assertions', 'Test Functions', 'Test Classes', 'Fixtures', 'Parameterization', 'Mocking', 'Test Coverage', 'Unit Testing', 'Integration Testing']],
  ['Django Testing', 'Test Django models, views, forms, APIs, and database behavior.', '◇', 'pink', ['Django TestCase', 'Testing Models', 'Testing Views', 'Testing URLs', 'Testing Forms', 'Testing APIs', 'Authentication Testing', 'Database Testing', 'pytest-django']],
];

export const modules = moduleInfo.map(([title, description, icon, color, topics], index) => ({
  id: `module-${index + 1}`,
  number: index + 1,
  title,
  description,
  icon,
  color,
  topics: topics.map((topic, topicIndex) => ({
    id: `m${index + 1}-t${topicIndex + 1}`,
    title: topic,
    moduleId: `module-${index + 1}`,
    moduleTitle: title,
    moduleNumber: index + 1,
    index: topicIndex,
  })),
}));

export const topics = modules.flatMap((module) => module.topics);
export const getModule = (id) => modules.find((module) => module.id === id);
export const getTopic = (id) => topics.find((topic) => topic.id === id);
export const getAdjacentTopics = (id) => {
  const index = topics.findIndex((topic) => topic.id === id);
  return { previous: topics[index - 1] ?? null, next: topics[index + 1] ?? null, index };
};
