const q = (question, options, answer, explanation) => ({ question, options, answer, explanation });

export const quizzes = {
  'module-1': [
    q('What is the main purpose of software testing?', ['To prove software has no defects', 'To gather information about quality and find problems', 'To replace software requirements', 'To make every release slower'], 1, 'Testing provides evidence about quality and can reveal defects, but it cannot prove that no defects exist.'),
    q('Which statement best describes validation?', ['Checking whether the product meets a user need', 'Checking source code formatting only', 'Writing a project schedule', 'Counting defects after release'], 0, 'Validation asks whether the team built the right product for users.'),
    q('A developer makes a mistake that puts a flaw in code. What is the flaw commonly called?', ['A failure', 'A defect or bug', 'A test case', 'A requirement'], 1, 'The human mistake is an error; the flaw in the work product is a defect or bug.'),
    q('Which activity is most clearly quality assurance?', ['Improving the team’s code review process', 'Checking one finished screen', 'Retesting a fixed issue', 'Measuring one response time'], 0, 'QA focuses on improving the process to prevent defects.'),
  ],
  'module-2': [
    q('What does SDLC describe?', ['Only the final test execution', 'The stages used to build and maintain software', 'A database query format', 'A bug priority scale'], 1, 'SDLC covers work such as planning, building, testing, release, and maintenance.'),
    q('Which model typically completes major phases in sequence?', ['Waterfall', 'Exploratory', 'Scrum', 'Boundary analysis'], 0, 'Waterfall is a sequential approach and can be harder to adapt to late changes.'),
    q('What is a core Agile idea?', ['Avoid user feedback until release', 'Deliver in increments and adapt from feedback', 'Finish all testing before development', 'Never change a plan'], 1, 'Agile teams work iteratively and use feedback to adapt.'),
    q('What does STLC focus on?', ['Activities for planning, designing, executing, and closing testing', 'How a browser stores cookies', 'Only the software release date', 'The organization’s sales forecast'], 0, 'STLC describes the testing team’s workflow through a testing effort.'),
  ],
  'module-3': [
    q('Which testing approach runs scripted checks using code or tools?', ['Manual testing', 'Automation testing', 'Acceptance testing', 'Ad-hoc testing'], 1, 'Automation uses scripts or tools to repeat checks and compare results.'),
    q('Functional testing primarily checks…', ['What the system does against requirements', 'Only the visual color palette', 'How the team is organized', 'How much code was written'], 0, 'Functional testing evaluates features and business rules.'),
    q('A tester checks input and output without inspecting internal code. Which approach is this?', ['White-box', 'Black-box', 'Gray-box', 'Load testing'], 1, 'Black-box testing evaluates externally visible behavior.'),
    q('Which statement about automation is most accurate?', ['It removes the need for test design', 'It is useful for repeatable checks but needs maintenance', 'It is always better than manual testing', 'It can test only APIs'], 1, 'Automation helps repeat checks, while scripts still need thoughtful design and upkeep.'),
  ],
  'module-4': [
    q('Which level focuses on one small function or class?', ['System', 'Acceptance', 'Unit', 'Integration'], 2, 'Unit tests check a small isolated piece of software.'),
    q('A check verifies that an order service correctly uses a payment service. What level is this?', ['Unit', 'Integration', 'Acceptance', 'Alpha'], 1, 'Integration testing focuses on how components or services work together.'),
    q('Who commonly performs UAT?', ['Intended users or business representatives', 'Only the compiler', 'Only the database administrator', 'A browser cache'], 0, 'UAT uses representative users or business stakeholders to check realistic tasks.'),
    q('What is system testing focused on?', ['A single statement in source code', 'A complete integrated system against requirements', 'A development team’s sprint plan', 'Only mock data'], 1, 'System testing evaluates the integrated product as a whole.'),
  ],
  'module-5': [
    q('A new build arrives. Which quick check decides whether deeper testing can begin?', ['Smoke testing', 'Retesting', 'Stress testing', 'UAT'], 0, 'Smoke testing checks key paths to see whether the build is stable enough for more testing.'),
    q('After a developer fixes a reported defect, what confirms that specific fix?', ['Regression testing', 'Retesting', 'Load testing', 'Compatibility testing'], 1, 'Retesting repeats the failed conditions to confirm the reported defect is fixed.'),
    q('What does regression testing look for?', ['Whether recent changes broke existing behavior', 'Whether a story has a title', 'Whether a user likes a color', 'Whether one fix compiles'], 0, 'Regression checks revisit existing behavior after a change.'),
    q('Which activity is guided by learning and observation while testing?', ['Exploratory testing', 'Unit testing', 'Sanity testing', 'Database normalization'], 0, 'Exploratory testing combines learning, test design, and execution.'),
  ],
  'module-6': [
    q('Which technique groups inputs expected to behave similarly?', ['State transition testing', 'Equivalence partitioning', 'Load testing', 'Retesting'], 1, 'Equivalence partitioning reduces test volume by selecting representatives from input groups.'),
    q('For a field accepting 1–10, which set best targets boundaries?', ['3, 4, 5', '0, 1, 2, 9, 10, 11', 'Only 5', 'Only 1 and 10'], 1, 'Boundary analysis checks the edge values and values just inside and outside them.'),
    q('Which technique is useful when multiple conditions combine to determine an outcome?', ['Decision table testing', 'Compatibility testing', 'Smoke testing', 'Code review'], 0, 'Decision tables list condition combinations and their expected actions.'),
    q('A locked account changes state after repeated failed logins. Which technique fits?', ['State transition testing', 'Load testing', 'Equivalence partitioning only', 'Retesting'], 0, 'State transition testing checks states, events, and allowed or disallowed transitions.'),
  ],
  'module-7': [
    q('Which test checks behavior under expected traffic?', ['Load testing', 'Stress testing', 'UAT', 'Ad-hoc testing'], 0, 'Load testing evaluates the system under a specified or expected workload.'),
    q('What is the focus of stress testing?', ['Exceeding expected capacity and observing failure and recovery', 'Checking spelling', 'Testing one function in isolation', 'Confirming a business user’s workflow'], 0, 'Stress testing pushes beyond normal conditions to find limits and recovery behavior.'),
    q('Which activity checks whether unauthorized users can access private data?', ['Security testing', 'Compatibility testing', 'Usability testing', 'Regression testing'], 0, 'Security testing evaluates identity, access, and protection of data.'),
    q('Usability testing is best described as…', ['Measuring source lines', 'Observing intended users complete realistic tasks', 'Sending maximum traffic', 'Checking database keys only'], 1, 'Usability testing looks at how easily intended users can complete tasks.'),
  ],
  'module-8': [
    q('What is a test scenario?', ['A high-level behavior or user journey to check', 'The actual result of one run', 'A list of database indexes', 'A source-code branch'], 0, 'A scenario is a broad test goal that can lead to detailed test cases.'),
    q('Which item should make a test case repeatable?', ['Clear preconditions and specific steps', 'A vague title only', 'A hidden expected result', 'A real customer password'], 0, 'Clear setup, data, steps, and expected results let another person repeat a case.'),
    q('What does a negative test check?', ['A normal valid workflow only', 'Handling of invalid or disallowed input', 'The product roadmap', 'Only test coverage'], 1, 'Negative testing checks safe handling of invalid, unexpected, or disallowed inputs.'),
    q('What should an expected result be?', ['Observable and specific', 'A guess after the test', 'The same as the test title', 'Optional for every case'], 0, 'Specific expected results make pass and fail decisions clear.'),
  ],
  'module-9': [
    q('What does severity describe?', ['The impact of a defect', 'The order of a sprint backlog', 'How many testers are assigned', 'The number of test steps'], 0, 'Severity describes how much harm or disruption the defect causes.'),
    q('What should a useful bug report include?', ['Reproduction steps and expected versus actual behavior', 'Only “it does not work”', 'A customer’s production password', 'A proposed team reorganization'], 0, 'Clear evidence and steps help another person confirm and investigate the issue.'),
    q('A fixed issue still fails during retesting. What may happen to its status?', ['It may be reopened', 'It must be deleted', 'It becomes a user story', 'It is automatically accepted'], 0, 'A failed retest commonly moves a defect back to an active or reopened state.'),
    q('Priority most directly answers…', ['How soon should the team address this?', 'Which line caused the bug?', 'How many rows are in a table?', 'What is the test input?'], 0, 'Priority describes urgency or order of work and depends on business context.'),
  ],
  'module-10': [
    q('What is a sprint?', ['A fixed-length period focused on a useful increment', 'A production database table', 'An API response code', 'A type of locator'], 0, 'A sprint is a time-boxed period in Scrum with a goal and working increment.'),
    q('What do acceptance criteria provide?', ['Observable conditions a feature must satisfy', 'A list of browser brands', 'A server password', 'Only a meeting schedule'], 0, 'Acceptance criteria make expected behavior clearer and testable.'),
    q('What is the focus of a retrospective?', ['Improving how the team works', 'Approving a customer payment', 'Testing only production data', 'Writing all requirements after release'], 0, 'Retrospectives help teams reflect and choose practical process improvements.'),
    q('When should testing happen in Agile?', ['Throughout planning and delivery', 'Only after the sprint ends', 'Only before requirements exist', 'Only during sprint review'], 0, 'Agile testing is continuous and collaborative, not deferred until the end.'),
  ],
  'module-11': [
    q('What is an API?', ['A defined way for software components to communicate', 'A type of database key', 'A manual test script', 'A browser window'], 0, 'An API defines how a client requests data or actions from a service.'),
    q('Which HTTP method is commonly used to retrieve data?', ['POST', 'GET', 'DELETE', 'PATCH'], 1, 'GET is used to read a resource and should not change server state.'),
    q('Which status-code range generally indicates a client/request issue?', ['2xx', '3xx', '4xx', '5xx'], 2, '4xx codes indicate a problem with the request or client context, such as 404.'),
    q('What does an API test typically inspect?', ['Request, response, status code, and data', 'Only the homepage font', 'Only the team’s sprint length', 'Only the number of source files'], 0, 'The request and response must be considered together to validate the API contract.'),
  ],
  'module-12': [
    q('What does CRUD stand for?', ['Create, Read, Update, Delete', 'Check, Run, Undo, Deploy', 'Code, Review, Use, Debug', 'Create, Restore, Upload, Download'], 0, 'CRUD describes the four common data operations.'),
    q('Which SQL command reads data?', ['DELETE', 'UPDATE', 'SELECT', 'INSERT'], 2, 'SELECT retrieves rows and columns from a database.'),
    q('What does a primary key do?', ['Uniquely identifies a row', 'Stores a browser cookie', 'Joins every table automatically', 'Deletes duplicate data'], 0, 'A primary key uniquely identifies each record in its table.'),
    q('Why is WHERE important in UPDATE and DELETE?', ['It can restrict the change to intended rows', 'It speeds up the browser rendering', 'It changes a primary key to JSON', 'It creates a new table'], 0, 'Without an appropriate filter, an update or deletion may affect every row.'),
  ],
  'module-13': [
    q('Which checks are generally the best first automation candidates?', ['Stable, repeated, valuable checks', 'Every one-time visual exploration', 'Only checks with no expected result', 'Features that change every hour'], 0, 'Stable repeated checks can benefit from automation’s repeatability.'),
    q('What does a locator do?', ['Identifies a page element for a test', 'Changes the database schema', 'Measures sprint velocity', 'Writes the expected result automatically'], 0, 'A locator points automation to a button, field, or other web element.'),
    q('Why use a condition-based wait?', ['It synchronizes with the page becoming ready', 'It guarantees the feature is correct', 'It removes all test maintenance', 'It bypasses assertions'], 0, 'Condition-based waits respond when the needed element or state is ready.'),
    q('What is the purpose of an assertion?', ['Compare observed behavior with an expected condition', 'Launch a server', 'Create test data without limits', 'Choose a browser theme'], 0, 'Assertions define what the test considers a pass or failure.'),
  ],
  'module-14': [
    q('Which is Python’s built-in test framework?', ['pytest', 'unittest', 'Selenium', 'Postman'], 1, 'unittest is included with Python’s standard library.'),
    q('What does a pytest fixture commonly provide?', ['Reusable setup or a resource for tests', 'A production deployment', 'A browser locator only', 'A bug priority'], 0, 'Fixtures make setup reusable and can manage cleanup.'),
    q('What is parameterization useful for?', ['Running one test structure with several input cases', 'Avoiding expected results', 'Disabling test discovery', 'Replacing every unit test with a manual test'], 0, 'Parameterization exercises multiple inputs without duplicating the test logic.'),
    q('What is a mock useful for?', ['Replacing a dependency with controlled behavior', 'Measuring usability with a user', 'Testing all services in production', 'Storing permanent user data'], 0, 'Mocks let a test control or observe a dependency without calling the real service.'),
  ],
  'module-15': [
    q('What can Django’s test client help a test do?', ['Send requests to a view without a live browser server', 'Install Django on a customer device', 'Replace every database check', 'Generate production API keys'], 0, 'The test client exercises Django request and response behavior in tests.'),
    q('What is a useful model test?', ['Check model rules or custom behavior', 'Measure sprint length', 'Verify a browser bookmark', 'Inspect only a CSS color'], 0, 'Model tests can cover constraints, relationships, and custom methods.'),
    q('A signed-out visitor should not open a private account page. What should a view test check?', ['Access behavior or redirect', 'Only the source file name', 'A product’s SQL join', 'The test runner color'], 0, 'View tests should check permission behavior as well as successful responses.'),
    q('What does pytest-django add?', ['Django-aware pytest helpers and fixtures', 'A new production database', 'A browser automation engine', 'An HTTP server for deployment'], 0, 'pytest-django connects pytest to Django settings, database support, and test helpers.'),
  ],
};
