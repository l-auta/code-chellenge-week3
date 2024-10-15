// Your code here
//1
document.addEventListener('DOMContentLoaded', ()=>{  //ensure the function is called when the page is reloaded
    const backend1 = 'http://localhost:3000/films/1'//gets the data from the api...specifically for the first film

    fetch(backend1)  //returns a promise object
      .then(result=>{
        if(!result.ok){  //is a boolean that returns false
            throw new Error('error in the network result')  //only when the request fails
        }
        else{  // if the request passes
            return result.json() //the .json parses the data obtained from the request into a format than can be used here
        }  //the parsing also returns a promise object
      })
      .then(data=>{ //this is where you can work on the data object
        // console.log(data)
        const{title, runtime, capacity, showtime, tickets_sold, description, poster} = data
        const ticketsAvailable = capacity - tickets_sold

        document.getElementById('poster').src = poster;
        document.getElementById('title').innerText = title;
        document.getElementById('runtime').innerText = `Runtime: ${runtime} minutes`;
        document.getElementById('film-info').innerText = description
        document.getElementById('showtime').innerText = `Showtime: ${showtime}`;
        document.getElementById('ticket-num').innerText = ticketsAvailable;

      })
      .catch(error=>{  //the catch is used for when the promise is not successful n thus bringing an erroe
        console.error('your fetch aint working', error)
      })
})

//2 and 4
document.addEventListener('DOMContentLoaded', ()=>{  //call function when page is reloaded
    const backend2 = 'http://localhost:3000/films'
    const filmList = document.getElementById('films') //the element in the html file where the films r supposed to be under


    fetch(backend2)
      .then(result=>{
        if(!result.ok){
            throw new Error('error in the network result')
        }
        else{
            return result.json()
        }
      })
      .then(data=>{
        data.forEach(film => {  //loops thru the object till the last bit of it to get what we want
            const li = document.createElement('li'); //created a new list tag
                li.classList.add('film-item'); // Added a class to it
                li.setAttribute('the-title', film.title)  //use it later in the delete funct
                li.innerText = film.title; //gets the title for each film and places it in the inner text of the newly created list element
                filmList.appendChild(li);  //moves the list element to the dom
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'delete-btn';
                li.appendChild(deleteButton)

              deleteButton.addEventListener('click', function(){
                  deleteFilm(li)
                })
        });
      })
      .catch(error=>{
        console.error('your fetch aint working', error)
      })
})

function deleteFilm(li) {  //creating a function that deletes a movie title in the list
  const filmtitle = li.getAttribute('the-title'); // gets the film title

  fetch(`http://localhost:3000/films/${filmtitle}`, { //get the title precisely
      method: 'DELETE'
  })
  .then(response => {
      if (response.ok) {
          // Remove the film from the list in the dom
          li.remove();
      } else {
          console.error('Failed to delete the film');
      }
  })
  .catch(error => {
      console.error('your fetch aint working:', error);
  });
}

//3 and 5
document.getElementById('buy-ticket').addEventListener('click', ()=>{  //when the button to buy a ticket is pressed......patch
  const newTicketsSold = 20;  //will go to the tickets_sold

fetch('http://localhost:3000/films/1', {  //using the patch method to update data from the backend
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tickets_sold: newTicketsSold })  //in the backend what do you want to change and how do you want it to be after change
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log('Tickets updated:', data);
    if (newTicketsSold === 30) {
      const buyTicketButton = document.getElementById('buy-ticket');
      buyTicketButton.textContent = 'Sold Out';
      buyTicketButton.disabled = true; //to disable the button if sold out
  }
})
.catch(error => {
    console.error('your fetch aint working:', error);
});
})

document.getElementById('buy-ticket').addEventListener('click', ()=>{  //post
  const newTicketsSold = 20;

  fetch('http://localhost:3000/films/1', {  //send the data to the server when the ticket_sold value is changed using post method
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        tickets_sold: newTicketsSold
    })
  })
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Tickets updated:', data);
  })
  .catch(error => {
    console.error('your fetch aint working:', error);
  });
})
