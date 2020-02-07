Title: PokeAssist<br/>
Description: PokeAssist is a Pokemon index where you can get basic information of your favorite pokemon. It includes a turn-based battling system where two pokemon battles until one wins. This is fun little game where you get a randomize pokemon to battle, and the best part is that all the moves are randomized!!! But you could pick your own pokemon!

MVP:<br/>

1. used axolis to grab data from the PokeAPI/<br/>
2. PokeAPI to grab the Pokemon and the moveset for each Pokemon.<br/>
3. Created user and Opponent Pokemon API calls while nesting another API call to get the moveset for that Pokemon<br/>
4. Relationally compared the moveset API data with the Pokemon API data to get move specific to that Pokemon<br/>
5. Created a search bar inorder to search for the Pokemon, they could be search by name or index number<br/>
6. Created HTML code to neatly layout all the data for that Pokemon<br/>
7. Stylize with CSS with grid.<br/>

Post-MVP<br/>

1. With the data grabbed from the API, I created two Pokemon object: Opponent and User<br/>
2. Each Pokemon Object contained an Object stats, and an array of moves<br/>
3. The Opponents move is set on a random number generate from 0-3(index of the array), that will determine the <br/>attack and damage dealt to the user
4. Created Buttons to allow the users to choose the move, information will be sent to a function caled Battle()<br/>
5. Everytime a move is press, Battle() will be called and that specfic attack will be used to calculate the user damage<br/>
6. The damage calculution is done with the officical pokemon calculation, but without the damage type multipliers<br/>
7. The user will attack first, then the opponent. The speed attribute will have no effect, however the attack and <br/>defense attribute was calculted.<br/>
8. The button will appear and disappear with logic order, for user experience<br/>
9. Condition was set to when a pokemon reach 0 or low Hp, a winner is chosen<br/>
10. The battle was framed with HTML and styled with CSS<br/>

API: The API used is the PokeAPI, it was called individual for Pokemon and moveset<br/>
The App is built with Javascript, CSS and HTML using axios to extract data from PokeAPI, for the Data organization, I used Grid. This app work with all mediaqueries, however, it is optimal with computers. This will be hosted on surge.
