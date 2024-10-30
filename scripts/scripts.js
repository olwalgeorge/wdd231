// Dynamically set the current year in the footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Dynamically set the last modified date in the footer
document.getElementById('lastModified').textContent = `Last Update: ${document.lastModified}`;

// Course List Array
const courses = [
  { code: 'CSE 110', name: 'Intro to Programming', credits: 3, completed: true },
  { code: 'WDD 130', name: 'Web Design I', credits: 3, completed: true },
  { code: 'CSE 111', name: 'Programming with Functions', credits: 3, completed: false },
  { code: 'CSE 210', name: 'Data Structures', credits: 3, completed: false },
  { code: 'WDD 131', name: 'Web Design II', credits: 3, completed: true },
  { code: 'WDD 231', name: 'Advanced CSS', credits: 3, completed: false }
];

// Function to display courses dynamically
function displayCourses(filter = 'all') {
  const courseCards = document.getElementById('courseCards');
  courseCards.innerHTML = ''; // Clear previous content

  let totalCredits = 0;

  courses.forEach(course => {
      if (filter === 'all' || course.code.startsWith(filter)) {
          const courseCard = document.createElement('div');
          courseCard.classList.add('course-card');
          if (course.completed) courseCard.classList.add('completed');

          courseCard.innerHTML = `
              <h3>${course.code}</h3>
              <p>${course.name}</p>
              <p>Credits: ${course.credits}</p>`;
          
          totalCredits += course.credits;

          courseCards.appendChild(courseCard);
      }
  });

  document.getElementById('totalCredits').textContent = totalCredits;
}

// Event Listeners for filter buttons
document.getElementById('allCourses').addEventListener('click', () => displayCourses('all'));
document.getElementById('cseCourses').addEventListener('click', () => displayCourses('CSE'));
document.getElementById('wddCourses').addEventListener('click', () => displayCourses('WDD'));

// Initial load of all courses
displayCourses();