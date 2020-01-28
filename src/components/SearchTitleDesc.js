import React from 'react'

let titleCK = true,
    descrCK = true,
    newBooks=[];

function SearchTitleDesc(props) {
    
    let currentBooks = props.books,
        campoCerca = props.campoSearch;
    const handleChange = e => {
      if (e.target.className.includes("input")) {  
        campoCerca = e.target.value.toLowerCase();
      } else {
        switch (e.target.id) {
            case "title":
                titleCK = !titleCK;
                break;
            case "description":
                descrCK = !descrCK;
                break;
            default:
        }
      }
        if (campoCerca !== "") {
          newBooks = currentBooks.filter(item => {
            const lcTitle = item.title.toLowerCase();
            const lcDescription = item.description.toLowerCase();
            return (
              (lcTitle.includes(campoCerca) && titleCK) ||
              (lcDescription.includes(campoCerca) && descrCK)
            );
          });
        } else {
          newBooks = props.books;
        }
        props.handleChange(newBooks, campoCerca); 
    }

    return (
        <div>
            <input
            type="text"
            className="input"
            onChange={handleChange}
            placeholder="Search..."
            value={props.campoSearch}
          />
           <div>
            <input
              type="checkbox"
              name="title"
              id="title"
              value="Title"
              onChange={handleChange}
              defaultChecked
            />
            <label htmlFor="title">Title</label>
            <input
              type="checkbox"
              name="description"
              id="description"
              onChange={handleChange}
              value="Description"
              defaultChecked
            />
            <label htmlFor="description">Description</label>
          </div>
        </div>
    )
}

export default SearchTitleDesc
