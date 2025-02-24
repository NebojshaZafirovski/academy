
fetch("https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json")
  .then(response => response.json())
  .then(students => {
    console.log("Original Students Data:", students);

    //Students full names.
    const fullNames = students.map(s => `${s.firstName} ${s.lastName}`);
    console.log("Student Full Names:", fullNames);

    // All students sorted by the averageGrade.
    const sortedByAverageGrade = [...students].sort((a, b) => a.averageGrade - b.averageGrade);
    console.log("Students Sorted by Average Grade (ascending):", sortedByAverageGrade);

    //students with an average grade higher than 3.
    const aboveThree = students.filter(s => s.averageGrade > 3);
    console.log("Students with Average Grade > 3:", aboveThree);

    //Female student names with an average grade of 5.
    const femaleGradeFiveNames = students
      .filter(s => s.gender === "Female" && s.averageGrade === 5)
      .map(s => s.firstName);
    console.log("Female Student Names with Average Grade = 5:", femaleGradeFiveNames);

    //Male student full names who live in Skopje and are over 18 years old.
    const maleSkopjeOver18 = students
      .filter(s => s.gender === "Male" && s.city === "Skopje" && s.age > 18)
      .map(s => `${s.firstName} ${s.lastName}`);
    console.log("Male Students in Skopje Over 18:", maleSkopjeOver18);

    // The average grades of all female students over the age of 24.
    const femaleOver24Grades = students
      .filter(s => s.gender === "Female" && s.age > 24)
      .map(s => s.averageGrade);
    console.log("Average Grades of Female Students Over 24:", femaleOver24Grades);

    // Male students with a name starting with B and average grade over 2.
    const maleWithB = students
      .filter(s => s.gender === "Male" && s.firstName.startsWith("B") && s.averageGrade > 2);
    console.log("Male Students with Name Starting with 'B' and Average Grade > 2:", maleWithB);
  })
  .catch(err => console.error("Error fetching student data:", err));