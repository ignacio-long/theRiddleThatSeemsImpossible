/* 
   Performs multiple test of the "Loop Strategy" and returns the average of times prisoners got freed.
   Each test consists on randomly hiding 100 numbered cards in the 100 jail cells,
   then having each of the prisoners open a maximum of 50 doors using the "Loop Strategy",
   and if all of them finds its own number, then they are freed.
   The function takes a number for the amounts of tests to be done, and returns the average of times they were freed.
   
   For more info, watch Veritasium's video at 
   https://www.youtube.com/watch?v=iSNsgj1OCLA  
*/

function theRiddleThatSeemsImpossibleTESTER(num) {
    if(!num) return null;

    const jailConstr = () => {  // Returns a jail with 100 numbered jail cells, 
        let jail = {};
        for (let i = 1; i <= 100; i++) {
            jail[i] = { card: null };
        }
        return jail;
    }

    const hideCardRandom = (jail) => {  // Hides a card on each room on a given jail
        let cards = [];
        for (let i = 1; i <= 100; i++) {  // prepare all cards
            cards.push(i);
        }
        for (let i = 1, el = 0; i <= 100; i++) {     // drop a random card at each jail door
            el = Math.floor(Math.random() * cards.length);
            jail[i].card = cards[el];
            cards = cards.slice(0, el).concat(cards.slice(el + 1));    
        }    
    }

    // Sends a single prisoner into the jail with the 'loop' plan, and returns true if the card was found within 50 door opening chances
    const lifeIsBeautiful = (prisoner, jail) => {
        let group = [],
            door = prisoner;

        do {
            group.push(jail[door].card);
            door = jail[door].card;
        } while (door !== prisoner && group.length <= 50);

        return door === prisoner;
    }

    // Sends each prisoner to perform the loop routine, and counts how many left the current configuration of hidden cards alive
    const howMany = jail => {
        let count = 0;
        for (let i = 1; i <= 100; i++) {
            if (lifeIsBeautiful(i, jail)) count++ ;
        }
        return count;
    }


    // - - - - - - Main Core  - - - - - - //

    let jail = jailConstr(),
        passedCount = 0;

    for (let i = 0; i < num; i++) {
        hideCardRandom(jail);
        if (howMany(jail) == 100) passedCount++;
    }
    return passedCount / num * 100;

}
