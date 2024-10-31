// Define the courses array with some courses marked as completed
const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: ['Python'],
    completed: true // Marked as completed
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development.',
    technology: ['HTML', 'CSS'],
    completed: true // Marked as completed
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Students become more organized, efficient, and powerful programmers by learning functions.',
    technology: ['Python'],
    completed: true // Marked as completed
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces classes and objects, encapsulation, inheritance, and polymorphism.',
    technology: ['C#'],
    completed: true // Marked as completed
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Students will learn to create dynamic websites using JavaScript.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true // Marked as completed
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course focuses on user experience, accessibility, performance optimization, and API usage.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];

// Function to display courses dynamically based on filter
function displayCourses(filter = "all") {
  const courseContainer = document.getElementById('courseCards');
  courseContainer.innerHTML = ''; // Clear previous content

  let totalCredits = 0;

  // Filter the courses based on the selected filter (all/CSE/WDD)
  const filteredCourses = courses.filter(course => {
      return filter === "all" || course.subject === filter;
  });

  // Iterate through filtered courses and create HTML for each course card
  filteredCourses.forEach(course => {
      const courseCard = document.createElement('div');
      courseCard.classList.add('course-card');
      if (course.completed) {
          courseCard.classList.add('completed'); // Add different class for completed courses
      }

      // Create the inner HTML for each card
      courseCard.innerHTML = `
          <h3>${course.subject} ${course.number}</h3>
      `;

      // Append the card to the container
      courseContainer.appendChild(courseCard);

      totalCredits += course.credits; // Sum up the total credits
  });

  // Display total credits dynamically
      const courseList = document.getElementById('courseList');
      courseList.innerHTML = ''; // Clear previous content

      // Create a list item for each course
      filteredCourses.forEach(course => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `${course.subject} ${course.number} - ${course.title} - <span class="credits">${course.credits} credits</span>`;
          courseList.appendChild(listItem);
      });

      // Append total credits
      const totalListItem = document.createElement('li');
      totalListItem.innerHTML = `Total Credits: <span>${totalCredits} credits</span>`;
      courseList.appendChild(totalListItem);
}

// Event listeners for filter buttons
document.getElementById('allCourses').addEventListener('click', () => displayCourses("all"));
document.getElementById('cseCourses').addEventListener('click', () => displayCourses("CSE"));
document.getElementById('wddCourses').addEventListener('click', () => displayCourses("WDD"));

// Initial load of all courses
displayCourses();


    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    }));
