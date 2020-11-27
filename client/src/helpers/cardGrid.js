import '../style/cardGrid.css';

// it takes an array of cards as argument and returns an array in which
// the cards are grouped in rows of three cards
const makeCardGrid = courses => {
  const gridCourses = [];
  const len = courses.length;
  for (let i = 0; i < len; i += 3) {
    let row = [];
    for (let j = i; j < (i + 3); j++) {
      if (courses[j] === undefined) {
        row.push(
        <div id="grid" style={{opacity: '0'}} key={len + 1} className="card col m-2">
          An invisible card to complete a row that has fewer than three cards.
        </div>
        );
        break;
      }
      row.push(courses[j]);
    }
    gridCourses.push(
      <div key={i} className="row">
        {row}
      </div>
    );
  }

  return gridCourses;
};


export default makeCardGrid;