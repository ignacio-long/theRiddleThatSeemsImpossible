// THIS IS THE FUNCTION FOR MULTIPLE TESTS
// Runs multiple test and returns the average of people alive.  Each test will shuffle the cards and send 100 prisoners.

function theRiddleThatSeemsImpossibleTESTER(num) { // num = how many times
    if(!num) return null;
    let jail = jailConstr(),
        count = 0;

    for (let i = 0; i < num; i++) {
        hideCardRandom(jail);
        count += cuantos(jail);
    }
    return count / num;
}




// ----------------------------------------
// --- Main Core:

// Creates a jail with 100 rooms with no cards, yet
const jailConstr = () => {
  let jail = [];
  for (let i = 0; i < 100; i++) {
    jail.push({ card: null });
  }
  return jail;
}



// Hides a random card on each room of the jail
const hideCardRandom = (jail) => {
  if(!jail) return null;

  let cards = [];

  for (let i = 0; i < 100; i++) {       // adds each number on the cards array
    cards.push(i);
  }

  for (let i = 0, el = 0; i < 100; i++) {             // drop a random card at each jail door
    el = Math.floor(Math.random() * cards.length);
    jail[i].card = cards[el];
    cards = cards.slice(0, el).concat(cards.slice(el + 1));    
  }    
}



// Sends a single prisoner into the jail with the 'loop' plan, and returns 'true' if the prisoner found its number within 50 attempts
const lifeIsBeautiful = (prisoner, jail) => {
  let group = [],
      door = prisoner;

  do {
    group.push(jail[door].card);
    door = jail[door].card;
  } while (door !== prisoner);

  return group.length <= 50;
}



// Sends each prisoner to perform the loop routine, and counts how many left the current configuration of hidden cards alive
function cuantos(jail) {
  let count = 0;
 
  for (let i = 0; i < 100; i++) {
    if (lifeIsBeautiful(i, jail)) count++ ;
  }

  return count;
}
